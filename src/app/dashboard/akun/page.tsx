"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/ui/BottomNav";
import { Copy, Check } from "lucide-react";

export default function Akun() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.pin) {
      navigator.clipboard.writeText(user.pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white pb-24">
      <h1 className="text-2xl font-bold mb-8">Profil Akun</h1>
      
      <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
        <p className="text-slate-400 text-sm mb-2">Email Terdaftar</p>
        <h2 className="text-lg font-medium mb-6">{user?.email}</h2>
        
        <p className="text-slate-400 text-sm mb-2">PIN Otorisasi (Permanen)</p>
        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-4xl font-mono font-bold text-cyan-400 tracking-widest">
            {user?.pin || "Loading..."}
          </span>
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            {copied ? <Check className="text-green-500" /> : <Copy className="text-slate-400" />}
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-4">
          * PIN ini unik untuk akun Anda dan digunakan untuk menghubungkan perangkat target.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
