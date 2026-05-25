"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bgDark px-4 text-slate-300">
      <Card className="w-full max-w-sm p-8 text-center border border-slate-800/30">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-neonBlue to-neonCyan shadow-neonGlow">
          <Shield size={30} className="text-bgDark" />
        </div>
        <h1 className="text-xl font-black tracking-widest text-white uppercase">RAYANXWEB</h1>
        <p className="text-[9px] tracking-widest text-slate-500 uppercase mt-0.5">Secure Dashboard Login</p>

        <form onSubmit={handleSubmit} className="mt-8 text-left space-y-4">
          <div>
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Identity</label>
            <Input 
              type="text" 
              placeholder="Username..." 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Passkey</label>
            <div className="relative">
              <Input 
                type={viewPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <button 
                type="button" 
                onClick={() => setViewPassword(!viewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {viewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="glow" className="w-full mt-4">
            Authorize Gateway
          </Button>
        </form>
      </Card>
      <div className="mt-12 text-center pointer-events-none">
        <p className="text-[9px] tracking-[0.3em] text-slate-600 uppercase">RAYANXWEB NETWORK DEPLOYMENT V2.0</p>
      </div>
    </main>
  );
}
