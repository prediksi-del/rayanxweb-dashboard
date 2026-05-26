"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSocket } from "@/lib/socket";

export default function LogicContainer({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      const socket = getSocket(user.email, user.pin);
      return () => { socket.disconnect(); };
    }
  }, [user]);

  return <>{children}</>;
}
