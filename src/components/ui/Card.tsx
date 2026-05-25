import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, inset = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl bg-panelDark p-5 border border-slate-800/20 transition-all duration-300",
          inset ? "shadow-neumorphicInset" : "shadow-neumorphicOut",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
