"use client";
import Link from "next/link";
import { Home, User, Settings, Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  
  const menu = [
    { name: "Console", path: "/dashboard", icon: Home },
    { name: "Dev", path: "/dashboard/dev", icon: Terminal },
    { name: "Account", path: "/dashboard/akun", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-panelDark/90 border-t border-slate-800 backdrop-blur-md p-4 flex justify-around">
      {menu.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link key={item.path} href={item.path} className={`flex flex-col items-center gap-1 ${isActive ? "text-neonCyan" : "text-slate-600"}`}>
            <Icon size={20} />
            <span className="text-[9px] font-bold uppercase">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
