import { io } from "socket.io-client";

export const getSocket = (email: string, pin: string) => {
  return io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    auth: { email, token: pin },
    transports: ["websocket"]
  });
};
