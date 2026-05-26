"use client";

import React from "react";
import { useRealtimeDashboard } from "@/websocket/hooks/useRealtimeDashboard";
import { LiveMetricsCard } from "@/components/dashboard/LiveMetricsCard";
import { Activity, ShieldCheck, Terminal } from "lucide-react";

export default function DashboardHome() {
  const { isLive, liveLogs } = useRealtimeDashboard();

  return (
    <div className="space-y-10">
      {/* Topology Header */}
      <div className="flex justify-between items-center bg-glass-panel border border-white/5 p-8 rounded-2xl shadow-neumorphism-card">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-mono">OPERATIONAL MATRIX</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-sans">Realtime active cluster telemetry node command interface.</p>
        </div>
        <div className="flex items-center space-x-3.5 bg-cyber-input/60 border border-white/10 px-5 py-3 rounded-xl shadow-inset-cyber">
          <span className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-cyber-green animate-pulse" : "bg-cyber-red"}`} />
          <span className="text-xs font-bold tracking-[0.2em] text-slate-300">
            {isLive ? "GATEWAY ATTACHED" : "LINK OFFLINE"}
          </span>
        </div>
      </div>

      {/* Grid Monitor Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <LiveMetricsCard
          label="MONITORED ENDPOINTS"
          value="2,841"
          variant="cyan"
          description="Total enterprise structural micro-agents alive."
        />
        <LiveMetricsCard
          label="COMPROMISED SYSTEMS"
          value="0"
          variant="green"
          description="Active memory exploits detected globally."
        />
        <LiveMetricsCard
          label="MATRIX LATENCY"
          value="18ms"
          variant="purple"
          description="Heartbeat connection performance with railway gateway."
        />
      </div>

      {/* Realtime Cyber Shell Logs Terminal */}
      <div className="floating-glass-card p-6">
        <div className="flex items-center space-x-3 border-b border-white/5 pb-4 mb-4">
          <Activity className="w-4 h-4 text-cyber-cyan" />
          <h2 className="text-xs font-bold tracking-widest text-slate-200 uppercase">SYS-NEXUS TELEMETRY STREAM</h2>
        </div>
        <div className="h-80 bg-cyber-input rounded-xl border border-white/5 p-5 font-mono text-[11px] leading-relaxed text-cyber-green overflow-y-auto space-y-1.5 shadow-inset-cyber">
          {liveLogs.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-slate-600 space-y-2">
              <Terminal className="w-5 h-5" />
              <span>STABLE ENVIRONMENT: NO EVENTS EMITTED FROM GATEWAY...</span>
            </div>
          ) : (
            liveLogs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap transition-opacity duration-300">
                <span className="text-cyber-purple">&gt;&gt;</span> {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
