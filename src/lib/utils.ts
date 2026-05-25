import { clsx, type ClassValue } from "clsx";
import { mt, tailwindMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return tailwindMerge(clsx(inputs));
}
