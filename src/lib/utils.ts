import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi utilitas dinamis 'cn' (Class Name)
 * Berguna untuk menggabungkan kelas Tailwind CSS tradisional dengan conditional class
 * secara aman tanpa konflik variasi (override otomatis).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
