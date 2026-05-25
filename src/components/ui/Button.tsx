import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "glow" | "inset";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 outline-none disabled:opacity-50",
          variant === "default" && "bg-gradient-to-r from-panelDark to-bgDark text-slate-300 shadow-neumorphicOut border border-slate-800/40 hover:text-white",
          variant === "glow" && "bg-bgDark text-neonCyan shadow-neumorphicOut border border-neonCyan/20 hover:shadow-neonGlow",
          variant === "inset" && "bg-bgDark text-neonCyan shadow-neumorphicInset border border-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
