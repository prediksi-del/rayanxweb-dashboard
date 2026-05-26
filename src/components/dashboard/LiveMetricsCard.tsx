"use client";

import React from "react";
import { motion } from "framer-motion";

export interface MetricsCardProps {
  label: string;
  value: string | number;
  variant: "cyan" | "purple" | "green" | "red";
  description: string;
}

export const LiveMetricsCard: React.FC<MetricsCardProps> = ({ 
  label, 
  value, 
  variant, 
  description 
}) => {
  // Pemetaan kluster bayangan neon gaya dark neumorphism
  const variantStyles = {
    cyan: "border-cyber-cyan/30 text-cyber-cyan shadow-glow-cyan",
    purple: "border-cyber-purple/30 text-cyber-purple shadow-glow-purple",
    green: "border-cyber-green/30 text-cyber-green shadow-[0_0_20px_rgba(57,255,20,0.35)]",
    red: "border-cyber-red/30 text-cyber-red shadow-[0_0_20px_rgba(255,0,85,0.35)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`floating-glass-card p-6 border ${variantStyles[variant]}`}
    >
      {/* Kode Indikator Konsol */}
      <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400 mb-2 select-none">
        // {label}
      </div>
      
      {/* Penampil Angka Utama */}
      <div className="text-4xl font-extrabold tracking-tight font-mono mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {value}
      </div>
      
      {/* Keterangan Konteks Data */}
      <div className="text-xs text-slate-400 font-sans leading-relaxed">
        {description}
      </div>
    </motion.div>
  );
};
