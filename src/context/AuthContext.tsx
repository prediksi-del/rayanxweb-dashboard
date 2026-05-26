"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, pass: string) => {
    const docRef = doc(db, "users", email.toLowerCase());
    const snap = await getDoc(docRef);

    if (snap.exists() && snap.data().password === pass) {
      setUser(snap.data());
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
