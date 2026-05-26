"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { socketManager } from "../client/socket-manager";
import { useAuthStore } from "@/store/authStore";
import { ServerToClientEvents, ClientToServerEvents } from "../events/event-types";

// Definisikan tipe generik yang ketat sesuai skema Socket.IO Client Anda
type StrongSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface SocketContextData {
  socket: StrongSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextData>({ 
  socket: null, 
  isConnected: false 
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const [isConnected, setIsConnected] = useState(false);
  const [sock, setSock] = useState<StrongSocket | null>(null);

  useEffect(() => {
    // Skenario 1: Sesi pengguna tidak aktif atau token hancur
    if (!token) {
      socketManager.disconnect();
      setIsConnected(false);
      setSock(null);
      return;
    }

    // Skenario 2: Token aktif, inisialisasi jabat tangan (handshake) gateway
    const s = socketManager.connect(token) as StrongSocket;
    setSock(s);

    // Sinkronisasi status koneksi realtime
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);

    // Jika socket sudah terhubung sebelum listener dipasang
    if (s.connected) {
      setIsConnected(true);
    }

    // Protokol Pembersihan (Cleanup) Komponen untuk Mencegah Kebocoran Memori di React 19
    return () => {
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket: sock, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom Hook dengan validasi runtime agar aman dari kegagalan SSR
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("// useSocket MUST BE EXECUTED INSIDE A VALID SOCKETPROVIDER MATRIX");
  }
  return context;
};
