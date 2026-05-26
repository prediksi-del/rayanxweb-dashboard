"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { socketManager } from "../client/socket-manager";
import { useAuthStore } from "@/store/authStore";

interface SocketContextData {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextData>({ socket: null, isConnected: false });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const [isConnected, setIsConnected] = useState(false);
  const [sock, setSock] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) {
      socketManager.disconnect();
      setIsConnected(false);
      setSock(null);
      return;
    }

    const s = socketManager.connect(token);
    setSock(s as any);

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));

    return () => {
      s.off("connect");
      s.off("disconnect");
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket: sock, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
