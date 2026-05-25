import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { Crown } from "lucide-react";

export default function ResellerPage() {
  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300">
      <Card className="text-center p-8">
        <Crown className="mx-auto text-amber-400 mb-4 shadow-neonGlow rounded-full p-1" size={32} />
        <h2 className="text-sm font-bold tracking-widest text-white uppercase">Reseller Distribution Node</h2>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">Node management terminal operational mode set to standalone.</p>
      </Card>
      <DashboardNav />
    </main>
  );
}
