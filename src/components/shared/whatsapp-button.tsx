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
  const isMobile = useIsMobile();

  const handleClick = useCallback(() => {
    const url = isMobile
      ? `https://wa.me/${PHONE}?text=${DEFAULT_MESSAGE}`
      : `https://web.whatsapp.com/send?phone=${PHONE}&text=${DEFAULT_MESSAGE}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      className="fixed z-[9999] right-[32px] bottom-[32px] flex flex-col items-end"
    >
      <div className="relative flex items-center justify-center">
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: -16, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-full mr-4 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium shadow-xl pointer-events-none"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                color: "#000",
                fontFamily: "var(--font-outfit), sans-serif",
              }}
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="whatsapp-btn relative flex items-center justify-center rounded-full text-[#25D366] shadow-xl h-[50px] w-[50px] md:h-[54px] md:w-[54px] lg:h-[60px] lg:w-[60px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Ripple effect */}
          <span className="whatsapp-ripple absolute inset-0 rounded-full" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="relative z-10 w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
          >
            <path
              d="M16.004 2.667A13.273 13.273 0 0 0 2.78 16.04a13.15 13.15 0 0 0 1.79 6.628L2.667 29.333l6.882-1.808A13.28 13.28 0 0 0 16.004 29.4a13.367 13.367 0 0 0 0-26.733Zm0 24.266a10.807 10.807 0 0 1-5.902-1.75l-.42-.252-4.38 1.148 1.168-4.27-.274-.44A10.8 10.8 0 1 1 16.004 26.933Zm5.928-8.096c-.324-.162-1.921-.948-2.219-1.056-.298-.108-.515-.162-.732.162-.216.324-.84 1.056-1.031 1.273-.19.217-.38.244-.704.081-.324-.162-1.369-.504-2.607-1.608-.963-.858-1.613-1.92-1.802-2.244-.19-.324-.02-.5.143-.661.146-.146.324-.38.487-.57.162-.19.216-.325.324-.54.108-.217.054-.405-.027-.568-.081-.162-.732-1.764-1.003-2.416-.264-.633-.532-.548-.732-.558l-.624-.01a1.196 1.196 0 0 0-.867.406c-.298.324-1.139 1.112-1.139 2.714s1.166 3.148 1.328 3.364c.163.217 2.294 3.504 5.56 4.913.777.336 1.383.536 1.855.686.779.248 1.488.213 2.049.129.625-.093 1.921-.785 2.192-1.543.271-.758.271-1.407.19-1.543-.081-.135-.298-.216-.624-.378Z"
              fill="currentColor"
            />
          </svg>
        </motion.button>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-btn, .whatsapp-ripple {
            animation: none !important;
          }
        }

        .whatsapp-btn {
          background-color: #ffffff;
          animation: whatsapp-glow 2s ease-in-out infinite;
        }

        @keyframes whatsapp-glow {
          0% {
            box-shadow: 0 0 0 rgba(37, 211, 102, 0.6);
          }
          50% {
            box-shadow: 0 0 25px rgba(37, 211, 102, 0.5);
          }
          100% {
            box-shadow: 0 0 0 rgba(37, 211, 102, 0.6);
          }
        }

        @keyframes whatsapp-ripple-anim {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        
        .whatsapp-ripple {
          animation: whatsapp-ripple-anim 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          background: rgba(37, 211, 102, 0.4);
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </motion.div>
  );
}
