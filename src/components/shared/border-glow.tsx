"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface BorderGlowProps {
  children: React.ReactNode;
  borderRadius?: number;
  borderWidth?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function BorderGlow({
  children,
  borderRadius = 28,
  borderWidth = 2,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  className,
  style,
}: BorderGlowProps) {
  return (
    <div
      className={cn("border-glow-effect", className)}
      style={{
        '--glow-radius': `${borderRadius}px`,
        '--glow-width': `${borderWidth}px`,
        '--glow-c1': colors[0] || '#c084fc',
        '--glow-c2': colors[1] || '#f472b6',
        '--glow-c3': colors[2] || '#38bdf8',
        ...style,
      } as React.CSSProperties}
    >
      <div className="relative z-[1] w-full h-full">
        {children}
      </div>
    </div>
  );
}
