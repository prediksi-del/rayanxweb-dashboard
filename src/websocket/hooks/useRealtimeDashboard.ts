import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { WsDevicePayload, WsAlertPayload } from "../events/event-types";

export const useRealtimeDashboard = () => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();
  const [liveLogs, setLiveLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit("room:join", "dashboard_metrics");

    socket.on("device:update", (data: WsDevicePayload) => {
      queryClient.invalidateQueries({ queryKey: ["device-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["devices-list"] });
    });

    socket.on("security:alert", (alert: WsAlertPayload) => {
      queryClient.invalidateQueries({ queryKey: ["security-alerts"] });
    });

    socket.on("logs:new", (log) => {
      setLiveLogs((prev) => [ `[${log.timestamp}] ${log.message}`, ...prev.slice(0, 49) ]);
    });

    return () => {
      socket.emit("room:leave", "dashboard_metrics");
      socket.off("device:update");
      socket.off("security:alert");
      socket.off("logs:new");
    };
  }, [socket, isConnected, queryClient]);

  return { isLive: isConnected, liveLogs };
};
