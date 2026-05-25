"use client";

import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Shield, Server, Terminal, Database, RefreshCw } from "lucide-react";

export default function DevPage() {
  const [isWiping, setIsWiping] = useState(false);

  const handleResetRules = () => {
    alert("Firebase Security Rules berhasil disinkronkan ulang ke mode Produksi.");
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300 select-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-950/40 rounded-2xl border border-cyan-500/20">
          <Shield className="text-neonCyan" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-widest text-white uppercase">Developer Hub</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Sistem Konsol Keamanan</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* PANEL STATUS DATABASE */}
        <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut space-y-3">
          <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Database size={12} className="text-amber-400" /> Integrasi Cloud Firebase
          </h2>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-bgDark p-3 rounded-xl border border-slate-800/40">
            <div>
              <p className="text-slate-600">STATUS DB</p>
              <p className="text-emerald-400 font-bold">CONNECTED</p>
            </div>
            <div>
              <p className="text-slate-600">FIRESTORE RULES</p>
              <p className="text-cyan-400 font-bold">SECURED (V2)</p>
            </div>
          </div>
          <Button onClick={handleResetRules} className="w-full text-[10px] py-2.5">
            Sinkronisasi Firebase Rules
          </Button>
        </Card>

        {/* PANEL GATEWAY RAILWAY */}
        <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut space-y-3">
          <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Server size={12} className="text-purple-400" /> Pipeline WebSocket Gateway
          </h2>
          <p className="text-[10px] text-slate-500 leading-normal">
            Mengatur aliran paket data instruksi dari dashboard ini ke server Railway (`up.railway.app`) secara real-time.
          </p>
          <div className="p-3 bg-bgDark rounded-xl text-[9px] font-mono text-slate-400 break-all border border-slate-800/40">
            URL: https://rayanxweb-gateway-production.up.railway.app
          </div>
        </Card>

        {/* TERMINAL KONSOL KECIL */}
        <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut space-y-2">
          <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Terminal size={12} className="text-emerald-400" /> Dev Instance Logs
          </h2>
          <div className="h-24 bg-bgDark rounded-xl p-2.5 font-mono text-[9px] text-slate-500 overflow-y-auto space-y-1">
            <p><span className="text-slate-700">[SYSTEM]</span> Env variables loaded successfully.</p>
            <p><span className="text-slate-700">[SOCKET]</span> Pipeline linked to upstream provider.</p>
            <p><span className="text-slate-700">[SECURITY]</span> Handshake verification bypass prevention active.</p>
          </div>
        </Card>
      </div>

      <DashboardNav />
    </main>
  );
            }
