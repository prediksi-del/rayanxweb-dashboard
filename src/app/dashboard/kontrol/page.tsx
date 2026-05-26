"use client";
import { FEATURES, CommandType } from "@/types";
import { getSocket } from "@/lib/socket";
import { useAuth } from "@/context/AuthContext";

export default function KontrolPage() {
  const { user } = useAuth();
  
  const sendCommand = (cmd: CommandType) => {
    const socket = getSocket(user.email, user.pin);
    socket.emit("admin_command", { 
      targetId: user.pin, 
      command: cmd, 
      timestamp: Date.now() 
    });
    alert(`Perintah ${cmd} terkirim!`);
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24 text-white">
      <h1 className="text-center font-bold text-slate-400 uppercase tracking-tighter mb-6 pt-4">Console Management</h1>
      <div className="grid grid-cols-2 gap-4">
        {FEATURES.map((f) => (
          <button 
            key={f.id}
            onClick={() => sendCommand(f.id)}
            className="bg-panel border border-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 active:scale-95 transition-all hover:border-accent/50 group"
          >
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-slate-900 transition-all">
               {/* Icon SVG lucide atau sejenisnya */}
               <i data-lucide={f.icon}></i>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
