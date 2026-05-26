"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Cpu, ShieldAlert, Settings, LogOut, Disc } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const clearSession = useAuthStore((state) => state.clearSession);

  const navigations = [
    { name: "SYSTEM NEXUS", path: "/dashboard", icon: Terminal },
    { name: "NODES LIST", path: "/dashboard/devices", icon: Cpu },
    { name: "SECURITY ALERTS", path: "/dashboard/security", icon: ShieldAlert },
    { name: "CORE SETTINGS", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-cyber-dark/80 border-r border-white/5 backdrop-blur-2xl flex flex-col p-6 z-50">
      <div className="mb-12 flex items-center space-x-3 border-b border-white/5 pb-6">
        <Disc className="w-6 h-6 text-cyber-cyan animate-spin" />
        <span className="font-black text-sm tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-purple">
          RAYANXWEB // CORE
        </span>
      </div>

      <nav className="flex-1 space-y-3">
        {navigations.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-4 px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 border border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          document.cookie = "rayanx_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          clearSession();
          window.location.href = "/login";
        }}
        className="flex items-center space-x-4 px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest text-cyber-red/60 hover:bg-cyber-red/10 hover:text-cyber-red border border-transparent hover:border-cyber-red/30 transition-all duration-300"
      >
        <LogOut className="w-4 h-4" />
        <span>KILL SESSION</span>
      </button>
    </aside>
  );
};
