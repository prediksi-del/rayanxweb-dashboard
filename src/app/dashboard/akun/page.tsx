"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Navbar from "@/components/ui/BottomNav";

export default function AkunPage() {
  const { user } = useAuth(); // Data user (email, pin permanen) ditarik dari sini

  return (
    <div className="min-h-screen bg-background text-white p-6 pb-24">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">Informasi Sistem</h2>
      
      {/* Box PIN Permanen Sesuai Foto 3 */}
      <div className="bg-panel p-6 rounded-2xl border border-slate-700 mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] text-accent flex items-center gap-1 uppercase font-bold">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span> Enrollment PIN
            </p>
            <h1 className="text-5xl font-mono font-bold tracking-tighter mt-2">
              {user?.pin || "814069"}
            </h1>
          </div>
          <button className="bg-accent/20 p-2 rounded-lg text-accent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
          Gunakan PIN ini di aplikasi Android untuk menghubungkan perangkat baru secara permanen.
        </p>
      </div>

      <div className="space-y-4">
        <div>
           <p className="text-[10px] uppercase text-slate-500 font-bold mb-2 ml-1">Akun Dibuat</p>
           <div className="bg-panel p-4 rounded-xl border border-slate-800 text-slate-300">25/02/2026</div>
        </div>
        
        {/* Form Ganti Password */}
        <div className="pt-4 border-t border-slate-800">
           <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
             <span className="w-2 h-2 bg-accent rounded-full"></span> Keamanan & Akses
           </h3>
           <input type="password" placeholder="Password saat ini" className="w-full bg-panel p-4 rounded-xl mb-3 border border-slate-800 outline-none focus:border-accent transition-all" />
           <input type="password" placeholder="Password baru" className="w-full bg-panel p-4 rounded-xl mb-3 border border-slate-800 outline-none focus:border-accent transition-all" />
           <button className="w-full bg-accent text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-accent/20">PERBARUI AKSES</button>
        </div>
      </div>
      <Navbar />
    </div>
  );
          }
