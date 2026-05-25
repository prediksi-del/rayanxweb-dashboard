"use client";

import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { KeyRound, Plus, Users, ShoppingBag } from "lucide-react";

export default function ResellerPage() {
  const licenseKeys = [
    { key: "AJM-PREMIUM-X901", status: "Active", device: "Galaxy S23" },
    { key: "AJM-PREMIUM-B411", status: "Unused", device: "-" },
  ];

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300 select-none">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-950/40 rounded-2xl border border-amber-500/20">
            <KeyRound className="text-amber-400" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase">Reseller Hub</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Manajemen Lisensi Kunci</p>
          </div>
        </div>
        <button className="p-2.5 bg-panelDark rounded-xl shadow-neumorphicOut text-neonCyan hover:scale-105 active:scale-95 transition-all">
          <Plus size={16} />
        </button>
      </div>

      {/* STATS MINI CARD */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-panelDark rounded-2xl p-3 shadow-neumorphicOut border border-slate-800/10 text-center">
          <Users size={14} className="mx-auto text-cyan-400 mb-1" />
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Total Client</p>
          <p className="text-sm font-black text-white mt-0.5">14 Perangkat</p>
        </div>
        <div className="bg-panelDark rounded-2xl p-3 shadow-neumorphicOut border border-slate-800/10 text-center">
          <ShoppingBag size={14} className="mx-auto text-emerald-400 mb-1" />
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Token Tersedia</p>
          <p className="text-sm font-black text-white mt-0.5">8 Token</p>
        </div>
      </div>

      {/* DAFTAR LISENSI */}
      <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut">
        <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
          Registry Lisensi Premium Active
        </h2>
        <div className="space-y-2">
          {licenseKeys.map((item, index) => (
            <div key={index} className="bg-bgDark rounded-xl p-3 flex justify-between items-center border border-slate-800/30 text-[10px] font-mono">
              <div>
                <p className="text-white font-bold">{item.key}</p>
                <p className="text-slate-600 text-[9px] mt-0.5">Target: {item.device}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-md font-bold text-[8px] uppercase ${item.status === "Active" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" : "bg-slate-800 text-slate-400"}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <DashboardNav />
    </main>
  );
          }
