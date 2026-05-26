"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, ShieldAlert, Settings, LogOut, Disc } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  const navigations = [
    { name: "SYSTEM NEXUS", path: "/dashboard", icon: Terminal },
    { name: "NODES LIST", path: "/dashboard/devices", icon: Cpu },
    { name: "SECURITY ALERTS", path: "/dashboard/security", icon: ShieldAlert },
    { name: "CORE SETTINGS", path: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      // 1. Hancurkan Cookie Sesi secara eksplisit di seluruh path lingkup domain
      document.cookie = "rayanx_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure;";
      
      // 2. Bersihkan Global Zustand Store State
      clearSession();
      
      // 3. Paksa Router melakukan hard refresh untuk membersihkan Next.js client-side cache memory
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("// EMERGENCY_LOGOUT_FAILURE:", error);
      // Fallback mutlak jika router interupsi
      window.location.href = "/login";
    }
  };

  return (
    <aside 
      className="w-72 h-screen fixed left-0 top-0 bg-cyber-dark/80 border-r border-white/5 backdrop-blur-2xl flex flex-col p-6 z-50 select-none"
      aria-label="Cyber Core Enterprise Navigation"
    >
      {/* Brand Matrix Header */}
      <div className="mb-12 flex items-center space-x-3 border-b border-white/5 pb-6">
        <div className="relative flex items-center justify-center">
          <Disc className="w-6 h-6 text-cyber-cyan animate-spin [animation-duration:6s]" />
          <div className="absolute w-1.5 h-1.5 bg-cyber-purple rounded-full animate-ping" />
        </div>
        <span className="font-black text-sm tracking-[0.18em] bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-indigo-400 to-cyber-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          RAYANXWEB // CORE
        </span>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 space-y-2 relative" role="navigation">
        {navigations.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group relative flex items-center space-x-4 px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest transition-colors duration-300 ${
                active ? "text-cyber-cyan" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {/* Premium Floating Animated Background Effect */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="activeNavigationGlow"
                    className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/5 border border-cyber-cyan/30 rounded-xl shadow-glow-cyan z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon & Label Node Indicators */}
              <div className="flex items-center space-x-4 z-10 relative">
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${active ? "text-cyber-cyan" : "text-slate-400 group-hover:text-cyber-cyan"}`} />
                <span className="font-mono">{item.name}</span>
              </div>

              {/* Futuristic Cyber Dot Border Active Indicator */}
              {active && (
                <motion.span 
                  layoutId="activeIndicatorDot"
                  className="absolute right-4 w-1 h-1 bg-cyber-cyan rounded-full shadow-[0_0_8px_#00f0ff]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Kill Session Action Interface */}
      <div className="border-t border-white/5 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest text-cyber-red/60 hover:bg-cyber-red/10 hover:text-cyber-red border border-transparent hover:border-cyber-red/20 transition-all duration-300 group font-mono"
        >
          <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 text-cyber-red/60 group-hover:text-cyber-red" />
          <span>KILL SESSION</span>
        </button>
      </div>
    </aside>
  );
};
