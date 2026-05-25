"use client";
import React from "react";
import { 
  MapPin, Bell, Image, Contact, Phone, Camera, AppWindow, Wallpaper, 
  Flashlight, Lock, Eye, Video, FolderOpen, MessageSquare, Monitor, ShieldCheck, RefreshCw 
} from "lucide-react";

interface ControlGridProps {
  onActionTrigger: (actionId: string) => void;
}

export default function ControlGrid({ onActionTrigger }: ControlGridProps) {
  const features = [
    { id: "lacak", name: "Lacak", icon: MapPin, col: "text-emerald-400" },
    { id: "notifikasi", name: "Notifikasi", icon: Bell, col: "text-amber-400" },
    { id: "gallery", name: "Device Gallery", icon: Image, col: "text-blue-400" },
    { id: "kontak", name: "Daftar Kontak", icon: Contact, col: "text-purple-400" },
    { id: "panggilan", name: "Riwayat Panggilan", icon: Phone, col: "text-rose-400" },
    { id: "live_camera", name: "Live Camera", icon: Camera, col: "text-cyan-400" },
    { id: "app_mgmt", name: "App Management", icon: AppWindow, col: "text-indigo-400" },
    { id: "wallpaper", name: "Ganti Wallpaper", icon: Wallpaper, col: "text-teal-400" },
    { id: "senter", name: "Hidupkan Senter", icon: Flashlight, col: "text-yellow-400" },
    { id: "kunci_layar", name: "Kunci Layar", icon: Lock, col: "text-orange-400" },
    { id: "cam_monitor", name: "Camera Monitoring", icon: Eye, col: "text-pink-400" },
    { id: "putar_video", name: "Putar Video", icon: Video, col: "text-sky-400" },
    { id: "file_target", name: "File Target", icon: FolderOpen, col: "text-lime-400" },
    { id: "sms", name: "Pesan SMS", icon: MessageSquare, col: "text-violet-400" },
    { id: "live_screen", name: "Live Screen", icon: Monitor, col: "text-fuchsia-400" },
    { id: "lock_pro", name: "Device Lock PRO", icon: ShieldCheck, col: "text-red-500" },
    { id: "reset_data", name: "Reset Data", icon: RefreshCw, col: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {features.map((feat) => {
        const Icon = feat.icon;
        return (
          <button
            key={feat.id}
            onClick={() => onActionTrigger(feat.id)}
            className="bg-panelDark rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-neumorphicOut border border-slate-800/20 active:scale-95 hover:border-neonCyan/10 transition-all duration-200 group"
          >
            <div className="p-2.5 rounded-xl bg-bgDark shadow-neumorphicInset group-hover:shadow-neonGlow transition-all duration-300 mb-1">
              <Icon size={16} className={feat.col} />
            </div>
            <span className="text-[8.5px] font-bold tracking-tight text-slate-400 block truncate w-full">{feat.name}</span>
          </button>
        );
      })}
    </div>
  );
          }
