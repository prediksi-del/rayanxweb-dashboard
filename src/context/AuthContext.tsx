"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load session dari localStorage saat aplikasi dimulai
  useEffect(() => {
    const savedUser = localStorage.getItem("rayanx_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const docRef = doc(db, "users", email.toLowerCase());
      const snap = await getDoc(docRef);

      if (snap.exists() && snap.data().password === pass) {
        const userData = { email: snap.id, ...snap.data() };
        setUser(userData);
        localStorage.setItem("rayanx_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rayanx_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
