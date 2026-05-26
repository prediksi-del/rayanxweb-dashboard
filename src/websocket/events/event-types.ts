export interface WsDevicePayload {
  deviceId: string;
  status: "ONLINE" | "OFFLINE" | "UPDATE";
  batteryLevel?: number;
  networkType?: string;
}

export interface WsAlertPayload {
  alertId: string;
  deviceId: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  timestamp: string;
}

export interface ServerToClientEvents {
  "device:online": (data: WsDevicePayload) => void;
  "device:offline": (data: WsDevicePayload) => void;
  "device:update": (data: WsDevicePayload) => void;
  "security:alert": (data: WsAlertPayload) => void;
  "logs:new": (data: { message: string; timestamp: string }) => void;
  "notification:new": (data: { title: string; body: string }) => void;
  "dashboard:refresh": () => void;
  "heartbeat:pong": () => void;
}

export interface ClientToServerEvents {
  "room:join": (room: string) => void;
  "room:leave": (room: string) => void;
  "heartbeat:ping": () => void;
  }
