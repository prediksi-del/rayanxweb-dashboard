"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Terminal, Crown, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardNav() {
  const pathname = usePathname();
  const navigationElements = [
    { name: "Beranda", path: "/dashboard", icon: Home },
    { name: "DEV", path: "/dashboard/dev", icon: Terminal },
    { name: "Reseller", path: "/dashboard/reseller", icon: Crown },
    { name: "Akun", path: "/dashboard/akun", icon: User },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-panelDark/95 backdrop-blur-md rounded-full p-2.5 flex justify-around items-center shadow-neumorphicOut border border-slate-800/40">
        {navigationElements.map((nav) => {
          const Icon = nav.icon;
          const isActive = pathname === nav.path;
          return (
            <Link key={nav.path} href={nav.path} className="flex flex-col items-center min-w-[64px]">
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300",
                isActive ? 'bg-bgDark text-neonCyan shadow-neumorphicInset border border-neonCyan/10' : 'text-slate-500 hover:text-slate-300'
              )}>
                <Icon size={18} />
              </div>
              <span className={cn(
                "text-[9px] font-bold mt-1 tracking-widest uppercase transition-all",
                isActive ? 'text-neonCyan' : 'text-slate-600'
              )}>{nav.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
