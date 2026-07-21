"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "916206825676";
const DEFAULT_MESSAGE = encodeURIComponent(
  "Hello Shivaay Realty,\nI am interested in your rental properties.\nPlease help me."
);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = useCallback(() => {
    const url = isMobile
      ? `https://wa.me/${PHONE}?text=${DEFAULT_MESSAGE}`
      : `https://web.whatsapp.com/send?phone=${PHONE}&text=${DEFAULT_MESSAGE}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [isMobile]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium shadow-lg"
            style={{
              background: "hsla(0, 0%, 100%, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsla(220, 20%, 4%, 0.08)",
              color: "hsl(220, 20%, 4%)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            Chat with us on WhatsApp
            <div
              className="absolute -bottom-1 right-5 h-2 w-2 rotate-45"
              style={{
                background: "hsla(0, 0%, 100%, 0.92)",
                border: "1px solid hsla(220, 20%, 4%, 0.08)",
                borderTop: "none",
                borderLeft: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-fab relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow duration-300 md:h-16 md:w-16"
        style={{
          background:
            "linear-gradient(135deg, hsl(142, 70%, 45%) 0%, hsl(142, 70%, 38%) 100%)",
          boxShadow: isHovered
            ? "0 8px 32px hsla(142, 70%, 40%, 0.4)"
            : "0 4px 16px hsla(142, 70%, 40%, 0.25)",
        }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="whatsapp-pulse absolute inset-0 rounded-full" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="relative z-10 h-7 w-7 md:h-8 md:w-8"
        >
          <path
            d="M16.004 2.667A13.273 13.273 0 0 0 2.78 16.04a13.15 13.15 0 0 0 1.79 6.628L2.667 29.333l6.882-1.808A13.28 13.28 0 0 0 16.004 29.4a13.367 13.367 0 0 0 0-26.733Zm0 24.266a10.807 10.807 0 0 1-5.902-1.75l-.42-.252-4.38 1.148 1.168-4.27-.274-.44A10.8 10.8 0 1 1 16.004 26.933Zm5.928-8.096c-.324-.162-1.921-.948-2.219-1.056-.298-.108-.515-.162-.732.162-.216.324-.84 1.056-1.031 1.273-.19.217-.38.244-.704.081-.324-.162-1.369-.504-2.607-1.608-.963-.858-1.613-1.92-1.802-2.244-.19-.324-.02-.5.143-.661.146-.146.324-.38.487-.57.162-.19.216-.325.324-.54.108-.217.054-.405-.027-.568-.081-.162-.732-1.764-1.003-2.416-.264-.633-.532-.548-.732-.558l-.624-.01a1.196 1.196 0 0 0-.867.406c-.298.324-1.139 1.112-1.139 2.714s1.166 3.148 1.328 3.364c.163.217 2.294 3.504 5.56 4.913.777.336 1.383.536 1.855.686.779.248 1.488.213 2.049.129.625-.093 1.921-.785 2.192-1.543.271-.758.271-1.407.19-1.543-.081-.135-.298-.216-.624-.378Z"
            fill="white"
          />
        </svg>
      </motion.button>

      <style jsx>{`
        @keyframes whatsapp-pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          70% {
            transform: scale(1.4);
            opacity: 0;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .whatsapp-pulse {
          animation: whatsapp-pulse-ring 3s ease-out infinite;
          background: hsla(142, 70%, 45%, 0.3);
        }
      `}</style>
    </div>
  );
}
