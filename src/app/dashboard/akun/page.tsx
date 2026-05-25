"use client";

import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, ShieldAlert, LogOut, Lock } from "lucide-react";

export default function AkunPage() {
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari Konsol Dashboard?")) {
      window.location.href = "/";
    }
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300 select-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-950/40 rounded-2xl border border-purple-500/20">
          <User className="text-purple-400" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-widest text-white uppercase">Profile Admin</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Otoritas Pengendali Tertinggi</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* INFORMASI USER */}
        <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-bgDark flex items-center justify-center text-neonCyan font-mono font-black border border-slate-800 shadow-neumorphicInset">
            RXW
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide">RAYANXWEB Admin Instance</h3>
            <p className="text-[9px] font-mono text-slate-500 mt-0.5">ID Token: root_session_0192X</p>
          </div>
        </Card>

        {/* KEAMANAN PIN */}
        <Card className="p-4 bg-panelDark/60 shadow-neumorphicOut space-y-3">
          <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Lock size={12} className="text-red-400" /> Enkripsi Kunci Sistem
          </h2>
          <p className="text-[10px] text-slate-500 leading-normal">
            PIN Sinkronisasi Client saat ini diamankan menggunakan hash biner internal di server gateway.
          </p>
          <div className="p-3 bg-bgDark rounded-xl text-[10px] font-mono flex justify-between items-center border border-slate-800/40">
            <span className="text-slate-600">MASTER CLIENT PIN</span>
            <span className="text-white font-bold tracking-widest">•••••• (814069)</span>
          </div>
        </Card>

        {/* TOMBOL LOGOUT */}
        <Button 
          onClick={handleLogout} 
          className="w-full mt-4 bg-red-950/20 hover:bg-red-900/30 border border-red-500/20 text-red-400 shadow-none flex items-center justify-center gap-2 text-xs font-bold py-3"
        >
          <LogOut size={14} /> Tutup Sesi Enkripsi (Logout)
        </Button>
      </div>

      <DashboardNav />
    </main>
  );
}
