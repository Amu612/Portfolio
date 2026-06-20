"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Sphere, MeshDistortMaterial, Float, Ring } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, Suspense } from "react";
import * as THREE from "three";

function NeuralCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (outerRef.current) {
      outerRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      outerRef.current.rotation.y = clock.getElapsedTime() * 0.25;
      outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, pointer.x * 1.5, 0.05);
      outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, pointer.y * 1.5, 0.05);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -clock.getElapsedTime() * 0.3;
      innerRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
    if (ring1.current) {
      ring1.current.rotation.x = clock.getElapsedTime() * 0.4;
      ring1.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -clock.getElapsedTime() * 0.5;
      ring2.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      {/* Outer distorted shell */}
      <Sphere ref={outerRef as any} args={[2.2, 128, 128]}>
        <MeshDistortMaterial
          color="#000510"
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={1}
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Inner pulsing core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Sphere ref={innerRef as any} args={[1.2, 64, 64]}>
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={3}
            wireframe
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Orbiting holographic rings */}
      <Ring ref={ring1 as any} args={[2.5, 2.7, 64]}>
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2 as any} args={[3.2, 3.4, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  // Ensure size is multiple of 3 to avoid NaN bounding sphere
  const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 7 }));

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref as any} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#67E8F9"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const [cloud] = useState(() => random.inSphere(new Float32Array(3000), { radius: 12 }));

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 60;
    }
  });

  return (
    <Points ref={ref as any} positions={cloud} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c4b5fd"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 10, 30]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#67E8F9" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#c4b5fd" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />

        <Suspense fallback={null}>
          <NeuralCore />
          <ParticleField />
          <AmbientParticles />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2 + 0.5}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>
    </div>
  );
}
