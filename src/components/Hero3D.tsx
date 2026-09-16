"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GoldCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
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

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.25;
      wireframeRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group>
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0d0a04"
            roughness={0.1}
            metalness={0.95}
            emissive="#d4af37"
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh ref={wireframeRef} scale={2.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#d4af37"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
      </group>
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

        <GoldCrystal />
      </Canvas>
    </div>
  );
}