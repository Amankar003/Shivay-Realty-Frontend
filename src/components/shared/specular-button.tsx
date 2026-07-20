"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  className?: string;
  defaultBorderColor?: string;
}

export function SpecularButton({
  children,
  size = "md",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 0,
  textColor = "#f5f5f5",
  lineColor = "#ffffff",
  baseColor = "#525252",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  defaultBorderColor = "rgba(255, 255, 255, 0.1)",
  className,
  onClick,
  ...props
}: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!followMouse) return;
    
    const updatePosition = (e: MouseEvent) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        
        // Calculate distance from mouse to button center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < proximity) {
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        } else if (!isHovered) {
          setPosition({ x: -1000, y: -1000 });
        }
      }
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [followMouse, proximity, isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: -1000, y: -1000 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden font-medium transition-transform duration-300 active:scale-[0.98]",
        sizeClasses[size],
        className
      )}
      style={{
        borderRadius: radius,
        backgroundColor: baseColor,
        color: textColor,
        boxShadow: `0 0 ${blur}px rgba(0,0,0,0.5)`,
        ...props.style,
      }}
      {...props}
    >
      {/* Specular Background Shine */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered || autoAnimate ? intensity : 0,
          background: `radial-gradient(${shineSize * 10}px circle at ${position.x}px ${position.y}px, ${tint} ${shineFade}%, transparent 100%)`,
        }}
      />
      
      {/* Base Tint Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: tint, opacity: tintOpacity }}
      />

      {/* Specular Border Shine */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{
          padding: thickness,
          background: `radial-gradient(${shineSize * 10}px circle at ${position.x}px ${position.y}px, ${lineColor} ${shineFade}%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      
      {/* Default border color fallback (when not hovered) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
           padding: thickness,
           background: defaultBorderColor, // Configurable default border
           WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
           WebkitMaskComposite: "xor",
           mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
           maskComposite: "exclude",
        }}
      />

      {/* Content */}
      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
