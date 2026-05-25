"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import ControlGrid from "@/components/ControlGrid";
import DashboardNav from "@/components/DashboardNav";
import { Smartphone, Radio, Activity, ShieldCheck } from "lucide-react";

// Definisikan tipe data untuk perangkat target di Production
interface Device {
  id: string;
  model: string;
  osVersion: string;
  isOnline: boolean;
  lastSeen: number;
}

let socket: Socket;

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  // 1. PIPA DATA PRODUCTION: Sinkronisasi dengan Firestore (Real-time Listener)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "devices"), (snapshot) => {
      const deviceList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Device[];
      setDevices(deviceList);
      
      // Pilih perangkat pertama secara otomatis jika belum ada yang dipilih
      if (deviceList.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(deviceList[0].id);
      }
    });

    return () => unsubscribe();
  }, [selectedDeviceId]);

  // 2. PIPA PIPELINE PRODUCTION: Jalur Socket.io ke Gateway Railway
  useEffect(() => {
    socket = io("https://rayanxweb-gateway-production.up.railway.app", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  // 3. EKSEKUSI PERINTAH NYATA (Production Trigger)
  const handleActionTrigger = async (actionId: string) => {
    if (!selectedDeviceId) {
      alert("Error: Silakan pilih perangkat target terlebih dahulu!");
      return;
    }

    // Ambil detail status perangkat saat ini
    const targetDevice = devices.find(d => d.id === selectedDeviceId);
    if (!targetDevice?.isOnline && actionId !== "reset_data") {
      alert("Peringatan: Perangkat target offline. Instruksi akan tertunda!");
    }

    const payload = {
      targetId: selectedDeviceId,
      command: actionId,
      timestamp: Date.now(),
    };

    // Kirim sinyal instruksi ke WebSocket Gateway Railway
    if (socketConnected) {
      socket.emit("admin_command", payload);
    }

    // Catat log perintah terakhir ke database Firestore perangkat
    try {
      const deviceRef = doc(db, "devices", selectedDeviceId);
      await updateDoc(deviceRef, {
        lastCommand: actionId,
        commandTimestamp: payload.timestamp,
      });
    } catch (err) {
      console.error("Gagal memperbarui log Firestore:", err);
    }
  };

  return (
    <main className="min-h-screen bg-bgDark pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300 select-none">
      
      {/* BAR STATUS JARINGAN UTAMA */}
      <div className="flex items-center justify-between mb-6 bg-panelDark/40 p-3 rounded-2xl border border-slate-800/60 shadow-neumorphicInset">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-neonCyan drop-shadow-[0_0_4px_#00f0ff]" />
          <span className="text-[9px] font-mono font-black tracking-widest text-white uppercase">RAYANXWEB MAIN HUB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${socketConnected ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
          <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-500">
            {socketConnected ? "Gateway Online" : "Gateway Offline"}
          </span>
        </div>
      </div>

      {/* SELEKTOR TARGET PERANGKAT (Dinamis dari Firestore) */}
      <div className="space-y-2 mb-6">
        <label className="text-[9px] font-black tracking-widest text-slate-500 uppercase block pl-1">
          Target Node Selection ({devices.length})
        </label>
        
        {devices.length === 0 ? (
          <div className="p-4 bg-panelDark/60 rounded-2xl border border-dashed border-slate-800 text-center text-[10px] text-slate-600 uppercase font-mono tracking-wider">
            Menunggu Koneksi Aplikasi Client...
          </div>
        ) : (
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
              <Smartphone size={14} />
            </span>
            <select
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="w-full bg-panelDark text-white text-xs py-3 pl-10 pr-4 rounded-xl border border-slate-900/40 shadow-neumorphicOut outline-none appearance-none font-bold cursor-pointer"
            >
              {devices.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.model} [{dev.isOnline ? "ONLINE" : "OFFLINE"}]
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* PANEL TELEMETRI PERANGKAT AKTIF */}
      {selectedDeviceId && (
        <div className="grid grid-cols-2 gap-2 mb-6 text-[10px] font-mono">
          <div className="bg-panelDark/40 p-3 rounded-xl border border-slate-800/20 shadow-neumorphicInset">
            <span className="text-slate-600 block text-[8px] uppercase font-bold">Node ID</span>
            <span className="text-slate-400 truncate block mt-0.5">{selectedDeviceId.slice(0, 12)}...</span>
          </div>
          <div className="bg-panelDark/40 p-3 rounded-xl border border-slate-800/20 shadow-neumorphicInset">
            <span className="text-slate-600 block text-[8px] uppercase font-bold">Telemetry Status</span>
            <span className={`font-bold block mt-0.5 ${devices.find(d => d.id === selectedDeviceId)?.isOnline ? "text-emerald-400" : "text-slate-500"}`}>
              {devices.find(d => d.id === selectedDeviceId)?.isOnline ? "ACTIVE MONITOR" : "DISCONNECTED"}
            </span>
          </div>
        </div>
      )}

      {/* MATRIX KONSOL KONTROL (17 FITUR CORE) */}
      <div className="space-y-2">
        <label className="text-[9px] font-black tracking-widest text-slate-500 uppercase block pl-1">
          Command Pipeline Matrix
        </label>
        <ControlGrid onActionTrigger={handleActionTrigger} />
      </div>

      <DashboardNav />
    </main>
  );
            }
