"use client";
import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Shield, Copy, Check } from "lucide-react";

export default function AccountSettingsPage() {
  const [pin] = useState("814069");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300">
      <Card className="space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Shield size={14} className="text-neonCyan" /> Access Authorization Node
        </h2>

        <div className="bg-bgDark rounded-2xl p-5 text-center shadow-neumorphicInset border border-slate-950/40">
          <p className="text-[9px] font-bold tracking-widest text-neonCyan uppercase">Enrollment Security PIN</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="text-3xl font-black tracking-widest text-white font-mono">{pin}</span>
            <button 
              onClick={handleCopy} 
              className="p-2.5 rounded-xl bg-panelDark text-neonCyan shadow-neumorphicOut active:scale-95 transition-all duration-200 border border-slate-800/50"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <p className="text-[9px] text-slate-500 mt-3 tracking-wide leading-relaxed">
            Input this sequence parameter inside the remote client app system window interface to securely couple the communication pipeline.
          </p>
        </div>

        <div className="pt-2">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Node Authority Tier</label>
          <div className="w-full mt-1.5 rounded-xl bg-bgDark p-3.5 text-xs text-emerald-400 font-bold shadow-neumorphicInset border border-transparent uppercase tracking-wider">
            Enterprise Root Administrator
          </div>
        </div>
      </Card>
      <DashboardNav />
    </main>
  );
}
