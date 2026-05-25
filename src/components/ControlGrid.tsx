"use client";

import { Card } from "@/components/ui/Card";
import { 
  MapPin, Bell, Image, Contact, PhoneCall, Camera, 
  Layers, Sliders, Flashlight, Unlock, Video, Folder, 
  MessageSquare, Monitor, KeyRound, RefreshCw, Eye
} from "lucide-react";

interface ControlGridProps {
  onActionTrigger: (actionId: string) => void;
}

export default function ControlGrid({ onActionTrigger }: ControlGridProps) {
  // Peta 17 Fitur Konsol Utama AJM / RAYANXWEB
  const features = [
    { id: "lacak", label: "Lacak GPS", icon: MapPin, color: "text-emerald-400" },
    { id: "notifikasi", label: "Push Notif", icon: Bell, color: "text-cyan-400" },
    { id: "gallery", label: "Dump Galeri", icon: Image, color: "text-indigo-400" },
    { id: "kontak", label: "Ambil Kontak", icon: Contact, color: "text-purple-400" }, // <-- Sudah diperbaiki ke 'Contact'
    { id: "panggilan", label: "Log Telpon", icon: PhoneCall, color: "text-pink-400" },
    { id: "live_camera", label: "Live Kamera", icon: Camera, color: "text-amber-400" },
    { id: "app_mgmt", label: "Daftar App", icon: Layers, color: "text-rose-400" },
    { id: "wallpaper", label: "Set Wallpaper", icon: Sliders, color: "text-teal-400" },
    { id: "senter", label: "Saklar Senter", icon: Flashlight, color: "text-yellow-400" },
    { id: "kunci_layar", label: "Kunci Perangkat", icon: Unlock, color: "text-orange-400" },
    { id: "putar_video", label: "Putar Video", icon: Video, color: "text-sky-400" },
    { id: "file_target", label: "File Explorer", icon: Folder, color: "text-blue-400" },
    { id: "sms", label: "Kirim SMS", icon: MessageSquare, color: "text-violet-400" },
    { id: "live_screen", label: "Intip Layar", icon: Monitor, color: "text-fuchsia-400" },
    { id: "lock_pro", label: "Lock Overlay", icon: KeyRound, color: "text-red-400" },
    { id: "cam_monitor", label: "Snap Foto", icon: Eye, color: "text-lime-400" },
    { id: "reset_data", label: "Wipe Device", icon: RefreshCw, color: "text-red-500 font-bold" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <button
            key={f.id}
            onClick={() => onActionTrigger(f.id)}
            className="group active:scale-95 transition-all duration-150 text-left outline-none"
          >
            <Card className="p-3 flex flex-col items-center justify-center text-center bg-panelDark/60 hover:bg-panelDark border border-slate-800/30 shadow-neumorphicOut group-hover:shadow-none transition-all h-[72px]">
              <Icon size={16} className={`${f.color} transition-transform group-hover:scale-110`} />
              <span className="text-[8px] font-black tracking-wider uppercase text-slate-400 mt-2 block truncate w-full">
                {f.label}
              </span>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
