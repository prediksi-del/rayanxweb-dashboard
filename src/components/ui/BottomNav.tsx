"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  
  const menus = [
    { name: "Beranda", path: "/dashboard" },
    { name: "Kontrol", path: "/dashboard/kontrol" },
    { name: "Akun", path: "/dashboard/akun" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-panel border-t border-slate-800 p-4 flex justify-around">
      {menus.map((m) => (
        <Link 
          key={m.path} 
          href={m.path}
          className={`text-[10px] uppercase font-bold tracking-widest ${pathname === m.path ? "text-accent" : "text-slate-500"}`}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
}
