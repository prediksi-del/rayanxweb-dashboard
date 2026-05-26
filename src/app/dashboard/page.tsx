"use client";
import BottomNav from "@/components/ui/BottomNav";
import { useAuth } from "@/context/AuthContext";

export default function BerandaPage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-white p-6 pb-24">
      <h1 className="text-xl font-bold mb-6">Halo, {user?.username || "Admin"}</h1>
      
      {/* Stat Card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-panel border border-slate-700 p-4 rounded-xl">
           <p className="text-[10px] text-slate-400 uppercase">Device Online</p>
           <h2 className="text-2xl font-bold text-accent">1</h2>
        </div>
        <div className="bg-panel border border-slate-700 p-4 rounded-xl">
           <p className="text-[10px] text-slate-400 uppercase">System Status</p>
           <h2 className="text-2xl font-bold text-green-400">OK</h2>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
