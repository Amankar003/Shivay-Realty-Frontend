"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse position state
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Mutation observer to detect hovering over elements with data-cursor-label
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelElement = target.closest('[data-cursor-label]');
      if (labelElement) {
        setCursorText(labelElement.getAttribute('data-cursor-label') || "");
      } else {
        setCursorText("");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Lerp for smooth trailing effect
      const lerp = (start: number, end: number, amt: number) => {
        return (1 - amt) * start + amt * end;
      };

      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: 'transform' }}
    >
      <div 
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-gold mix-blend-difference transition-all duration-300 flex items-center justify-center text-[10px] font-accent uppercase tracking-widest text-accent-gold whitespace-nowrap bg-background/10 backdrop-blur-sm
          ${cursorText ? "w-20 h-20" : "w-8 h-8"}
        `}
      >
        {cursorText}
      </div>
      
      {/* Center dot */}
      <div className={`absolute w-1 h-1 bg-accent-gold rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${cursorText ? "opacity-0" : "opacity-100"}`} />
    </div>
  );
}
