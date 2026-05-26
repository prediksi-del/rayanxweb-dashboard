"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const email = sessionStorage.getItem("user_email");
    const pin = sessionStorage.getItem("user_pin");
    if (email && pin) setUser({ email, pin });
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
