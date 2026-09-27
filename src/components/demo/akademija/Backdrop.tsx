"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  ring: boolean;
};

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 22 : 46;
      particles = Array.from({ length: count }, () => {
        const ring = Math.random() > 0.78;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: ring ? 3 + Math.random() * 4 : 0.8 + Math.random() * 1.6,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.05 - Math.random() * 0.18,
          alpha: ring ? 0.1 + Math.random() * 0.12 : 0.12 + Math.random() * 0.25,
          ring,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.ring) {
          ctx.strokeStyle = `rgba(47, 164, 79, ${p.alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(244, 246, 243, ${p.alpha})`;
          ctx.fill();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        frame = requestAnimationFrame(draw);
      }
    };

    build();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f4f6f3 1px, transparent 1px), linear-gradient(to bottom, #f4f6f3 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] max-w-4xl -translate-x-1/2 rounded-full bg-turf/10 blur-[120px]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
