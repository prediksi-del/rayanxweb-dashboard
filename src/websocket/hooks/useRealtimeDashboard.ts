"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { WsDevicePayload, WsAlertPayload } from "../events/event-types";

// Definisikan tipe log yang masuk secara eksplisit sesuai arsitektur gateway
interface IncomingLogPayload {
  message: string;
  timestamp: string | number;
}

export const useRealtimeDashboard = () => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();
  const [liveLogs, setLiveLogs] = useState<string[]>([]);

  useEffect(() => {
    // Jika socket belum siap, jangan lakukan binding
    if (!socket) return;

    // Masuk ke room khusus dashboard metrics di gateway eksternal
    if (isConnected) {
      socket.emit("room:join", "dashboard_metrics");
    }

    // Handler referensi agar fungsi tetap bersih
    const handleDeviceUpdate = (data: WsDevicePayload) => {
      // Menggunakan void karena invalidateQueries bersifat asinkronus
      void queryClient.invalidateQueries({ queryKey: ["device-metrics"] });
      void queryClient.invalidateQueries({ queryKey: ["devices-list"] });
    };

    const handleSecurityAlert = (alert: WsAlertPayload) => {
      void queryClient.invalidateQueries({ queryKey: ["security-alerts"] });
    };

    const handleNewLogs = (log: IncomingLogPayload) => {
      const timeString = typeof log.timestamp === "number" 
        ? new Date(log.timestamp).toLocaleTimeString() 
        : log.timestamp;

      setLiveLogs((prev) => {
        const updatedLogs = [`[${timeString}] ${log.message}`, ...prev];
        // Batasi ukuran array maksimal 50 baris untuk mencegah kelebihan beban render DOM (crash)
        return updatedLogs.slice(0, 50);
      });
    };

    // Daftarkan event listeners ke instance socket
    socket.on("device:update", handleDeviceUpdate);
    socket.on("security:alert", handleSecurityAlert);
    socket.on("logs:new", handleNewLogs);

    // Jalankan pembersihan menyeluruh saat komponen unmount atau koneksi putus
    return () => {
      if (isConnected) {
        socket.emit("room:leave", "dashboard_metrics");
      }
      socket.off("device:update", handleDeviceUpdate);
      socket.off("security:alert", handleSecurityAlert);
      socket.off("logs:new", handleNewLogs);
    };
  }, [socket, isConnected, queryClient]);

  return { 
    isLive: isConnected && !!socket, 
    liveLogs 
  };
};
