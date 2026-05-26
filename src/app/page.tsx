"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [f, setF] = useState({ e: "", p: "" });
  const { login } = useAuth();
  const router = useRouter();

  const handle = async () => {
    if (await login(f.e, f.p)) router.push("/dashboard");
    else alert("Login Gagal");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <input type="email" onChange={(e) => setF({...f, e: e.target.value})} placeholder="Email" className="p-4 w-full bg-slate-900 rounded-xl mb-4" />
      <input type="password" onChange={(e) => setF({...f, p: e.target.value})} placeholder="PIN/Password" className="p-4 w-full bg-slate-900 rounded-xl mb-6" />
      <button onClick={handle} className="w-full bg-cyan-600 p-4 rounded-xl font-bold">LOGIN</button>
    </div>
  );
}
