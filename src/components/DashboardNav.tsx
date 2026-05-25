"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, Shield, Key, User } from "lucide-react";

export default function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Console", href: "/dashboard", icon: Smartphone },
    { label: "Developer", href: "/dashboard/dev", icon: Shield },
    { label: "Reseller", href: "/dashboard/reseller", icon: Key },
    { label: "Akun", href: "/dashboard/akun", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-panelDark/90 backdrop-blur-md border-t border-slate-800/60 px-6 py-4 flex justify-between items-center z-40 shadow-2xl rounded-t-3xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive 
                ? "text-neonCyan scale-110 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" 
                : "text-slate-500 hover:text-slate-400"
            }`}
          >
            <Icon size={18} />
            <span className="text-[8px] font-bold tracking-widest uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
