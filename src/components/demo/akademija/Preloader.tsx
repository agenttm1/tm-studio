"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/demo/akademija/Logo";

const SIZE = 160;

type Pose = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
};

export default function Preloader() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const [isLoading, setIsLoading] = useState(true);
  const [pose, setPose] = useState<Pose | null>(null);

  useEffect(() => {
    if (isAdmin) return;

    document.body.style.overflow = "hidden";

    const start: Pose = {
      x: window.innerWidth / 2 - SIZE / 2,
      y: window.innerHeight / 2 - SIZE / 2,
      scale: 1,
      opacity: 0,
    };

    setPose(start);

    const fadeInTimer = setTimeout(() => {
      setPose({ ...start, opacity: 1 });
    }, 60);

    const moveTimer = setTimeout(() => {
      const navLogo = document.getElementById("navbar-logo");

      if (navLogo) {
        const rect = navLogo.getBoundingClientRect();
        const scrollbar =
          window.innerWidth - document.documentElement.clientWidth;

        setPose({
          x: rect.left + rect.width / 2 - scrollbar / 2 - SIZE / 2,
          y: rect.top + rect.height / 2 - SIZE / 2,
          scale: rect.width / SIZE,
          opacity: 1,
        });
      }

      window.dispatchEvent(new Event("preloaderFinished"));

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 600);
    }, 600);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(moveTimer);
      document.body.style.overflow = "";
    };
  }, [isAdmin]);

  if (isAdmin || !pose) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="pointer-events-none fixed inset-0 z-999999 overflow-hidden bg-pitch"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3}}
        >
          <motion.div
            className="absolute left-0 top-0 flex items-center justify-center rounded-full bg-linear-to-b from-surface to-pitch shadow-[0_0_90px_rgba(47,164,79,0.35)] ring-1 ring-white/10"
            style={{ width: SIZE, height: SIZE, willChange: "transform" }}
            initial={{
              x: pose.x,
              y: pose.y,
              scale: 1,
              opacity: 0,
            }}
            animate={pose}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <Logo className="h-[58%] w-[58%] text-chalk" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
