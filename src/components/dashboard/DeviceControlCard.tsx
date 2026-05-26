"use client";

import React from "react";
import { useDeviceControl } from "@/hooks/useDevices";
import { ShieldAlert, Zap, Lock } from "lucide-react";

interface ComponentProps {
  deviceId: string;
  name: string;
  status: string;
}

export const DeviceControlCard: React.FC<ComponentProps> = ({ deviceId, name, status }) => {
  const { mutate, isPending } = useDeviceControl();

  const handleTrigger = (command: string, extra = {}) => {
    mutate({ deviceId, command, payload: extra });
  };

  return (
    <div className="floating-glass-card p-6 border border-white/5 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-100 font-mono tracking-wide">{name}</h3>
          <p className="text-[10px] text-slate-500 font-mono">ID: {deviceId}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${status === "ONLINE" ? "bg-cyber-green/20 text-cyber-green" : "bg-cyber-red/20 text-cyber-red"}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <button
          disabled={isPending}
          onClick={() => handleTrigger("TOGGLE_FLASHLIGHT")}
          className="bg-cyber-input border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all duration-200"
        >
          <Zap className="w-4 h-4 mb-1.5" />
          <span className="text-[9px] font-bold tracking-wider">FLASH</span>
        </button>

        <button
          disabled={isPending}
          onClick={() => handleTrigger("LOCK_SCREEN")}
          className="bg-cyber-input border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-slate-400 hover:text-cyber-purple hover:border-cyber-purple/40 transition-all duration-200"
        >
          <Lock className="w-4 h-4 mb-1.5" />
          <span className="text-[9px] font-bold tracking-wider">LOCK</span>
        </button>

        <button
          disabled={isPending}
          onClick={() => {
            if (confirm("// CONFIRM INITIATION OF OWNED DEVICE FACTORY RESET PROTOCOL?")) {
              handleTrigger("WIPE_DATA", { secureWipe: true });
            }
          }}
          className="bg-cyber-input border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-cyber-red/60 hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red/40 transition-all duration-200"
        >
          <ShieldAlert className="w-4 h-4 mb-1.5" />
          <span className="text-[9px] font-bold tracking-wider">WIPE</span>
        </button>
      </div>
    </div>
  );
};
