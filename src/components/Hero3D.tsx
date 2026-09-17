"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Ravna (planarna) matematička lemniskata — pravi oblik "∞" gledano sprijeda,
// bez uvijanja u z-osi koje ga je prije činilo spljoštenim/iskrivljenim sa strane.
// TubeGeometry mu daje 3D volumen kroz debljinu cijevi, ne kroz uvijenu putanju.
class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  getPoint(t: number) {
    const angle = t * Math.PI * 2;
    const scale = 1.9;
    const x = scale * Math.cos(angle);
    const y = scale * Math.sin(angle) * Math.cos(angle);
    return new THREE.Vector3(x, y, 0);
  }
}

// Detektira mobilni viewport da smanjimo oblik i spriječimo da viri van ekrana.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function InfinityLogo() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const isMobile = useIsMobile();

  const curve = useMemo(() => new InfinityCurve(), []);
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.3, 32, true),
    [curve]
  );

  // Rotacija: kursor pomiče oblik (lerp za glatkoću) PLUS stalna spora vrtnja
  // u pozadini — vraćeno kako je bilo prije.
  useFrame((state) => {
    const targetX = (state.pointer.x * Math.PI) / 5;
    const targetY = (state.pointer.y * Math.PI) / 5;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetX + state.clock.elapsedTime * 0.15,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -targetY,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={geometry} scale={isMobile ? 0.6 : 1}>
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.25}
          metalness={1}
          emissive="#a8791f"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-85 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -5, 5]} intensity={1.2} color="#d4af37" />

        <InfinityLogo />
      </Canvas>

      {/* Fade prema sljedećoj sekciji — sprječava oštar rez na dnu Hero sekcije */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
