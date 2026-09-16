"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function BackgroundStars() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Sparkles
          count={320}
          scale={[30, 25, 15]}
          size={2.8}
          speed={0.4}
          color="#d4af37"
        />
      </Canvas>
    </div>
  );
}