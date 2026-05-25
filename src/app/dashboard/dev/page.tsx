import DashboardNav from "@/components/DashboardNav";
import { Card } from "@/components/ui/Card";
import { Cpu } from "lucide-react";

export default function DevPage() {
  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300">
      <Card className="text-center p-8">
        <Cpu className="mx-auto text-neonCyan mb-4 animate-spin" style={{ animationDuration: '3s' }} size={32} />
        <h2 className="text-sm font-bold tracking-widest text-white uppercase">Developer Environment</h2>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">Sub-system parameter settings locked under development logs.</p>
      </Card>
      <DashboardNav />
    </main>
  );
}
