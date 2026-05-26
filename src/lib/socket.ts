import { io } from "socket.io-client";

export const getSocket = (email: string, pin: string) => {
  const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://rayanxweb-gateway-production.up.railway.app";
  
  return io(URL, {
    auth: { 
      email, 
      token: pin // Menggunakan PIN permanen sebagai kunci otorisasi
    },
    transports: ["websocket"],
    reconnection: true
  });
};
