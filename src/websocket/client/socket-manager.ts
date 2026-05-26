import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../events/event-types";

export class SocketManager {
  private static instance: SocketManager;
  public socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private url = "wss://rayanxweb-gateway-production-cc5e.up.railway.app";

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public connect(token: string): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (this.socket?.connected) return this.socket;

    this.socket = io(this.url, {
      auth: { token: `Bearer ${token}` },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true,
    });

    this.startHeartbeat();
    return this.socket;
  }

  private startHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    
    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit("heartbeat:ping");
      }
    }, 15000);
  }

  public disconnect() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketManager = SocketManager.getInstance();
