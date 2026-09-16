"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  const [animProps, setAnimProps] = useState<TargetAndTransition>({
    top: "50%",
    left: "50%",
    width: 180,
    height: 180,
    x: "-50%",
    y: "-50%",
    opacity: 0, // Počinje potpuno nevidljivo (fade in efekt)
  });

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";

    // 1. Trenutak: Čim se učita, radimo Fade In logotipa u centru (nakon 100ms)
    const fadeInTimer = setTimeout(() => {
      setAnimProps(prev => ({ ...prev, opacity: 1 }));
    }, 100);

    // 2. Trenutak: Nakon 1.8 sekundi logo kreće put gore prema Navbaru
    const moveTimer = setTimeout(() => {
      const navLogo = document.getElementById("navbar-logo");
      if (navLogo) {
        const rect = navLogo.getBoundingClientRect();
        setAnimProps({
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          x: 0,
          y: 0,
          opacity: 1,
        });
      }

      window.dispatchEvent(new Event("preloaderFinished"));

      // 3. Trenutak: Gašenje preloadera nakon leta
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }, 800);
    }, 1800);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(moveTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-999999 bg-[#020202] overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <motion.img
            src="/TM_Logo.png"
            alt="TM Studio Logo"
            className="fixed rounded-full shadow-[0_0_80px_rgba(212,175,55,0.3)] object-cover"
            initial={{
              top: "50%",
              left: "50%",
              width: 180,
              height: 180,
              x: "-50%",
              y: "-50%",
              opacity: 0,
            }}
            animate={animProps}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}