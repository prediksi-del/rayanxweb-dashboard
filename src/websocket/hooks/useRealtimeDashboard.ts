"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { WsDevicePayload, WsAlertPayload } from "../events/event-types";

export interface LiveLogItem {
  message: string;
  timestamp: string;
}

export const useRealtimeDashboard = () => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();
  const [liveLogs, setLiveLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Masuk ke dalam kluster internal metrik dasbor
    socket.emit("room:join", "dashboard_metrics");

    // Tangkap sinyal pembaruan gawai dari infrastruktur Railway
    const handleDeviceUpdate = (data: WsDevicePayload) => {
      queryClient.invalidateQueries({ queryKey: ["device-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["devices-list"] });
    };

    // Tangkap sinyal ancaman siber baru
    const handleSecurityAlert = (alert: WsAlertPayload) => {
      queryClient.invalidateQueries({ queryKey: ["security-alerts"] });
    };

    // Tangkap aliran teks log konsol mentah secara realtime
    const handleNewLog = (log: LiveLogItem) => {
      setLiveLogs((prev) => {
        const formattedLog = `[${log.timestamp}] ${log.message}`;
        // Batasi memori tumpukan log hanya sampai 50 baris terakhir demi performa UI
        return [formattedLog, ...prev.slice(0, 49)];
      });
    };

    // Daftarkan fungsi pendengar (Listeners) ke dalam engine Socket.IO
    socket.on("device:update", handleDeviceUpdate);
    socket.on("security:alert", handleSecurityAlert);
    socket.on("logs:new", handleNewLog);

    // Fungsi pembersihan (Cleanup) saat komponen dimatikan oleh React 19
    return () => {
      socket.emit("room:leave", "dashboard_metrics");
      socket.off("device:update", handleDeviceUpdate);
      socket.off("security:alert", handleSecurityAlert);
      socket.off("logs:new", handleNewLog);
    };
  }, [socket, isConnected, queryClient]);

  return { 
    isLive: isConnected, 
    liveLogs 
  };
};
