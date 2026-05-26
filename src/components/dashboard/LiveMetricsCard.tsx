"use client";

import React from "react";
import { motion } from "framer-motion";

interface MetricsCardProps {
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
  // Pemetaan class gaya visual bertema siber / neon-glow
  const styles = {
    cyan: "border-cyber-cyan/30 text-cyber-cyan shadow-glow-cyan",
    purple: "border-cyber-purple/30 text-cyber-purple shadow-glow-purple",
    green: "border-cyber-green/30 text-cyber-green shadow-[0_0_15px_rgba(57,255,20,0.3)]",
    red: "border-cyber-red/30 text-cyber-red shadow-[0_0_15px_rgba(255,0,85,0.3)]",
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`floating-glass-card p-6 border ${styles}`}
    >
      <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400 mb-2">
        // {label}
      </div>
      <div className="text-4xl font-extrabold tracking-tight font-mono mb-2 drop-shadow-md">
        {value}
      </div>
      <div className="text-xs text-slate-500 font-sans">
        {description}
      </div>
    </motion.div>
  );
};
