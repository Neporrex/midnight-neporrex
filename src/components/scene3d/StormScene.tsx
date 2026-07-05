'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';
import { stormState } from '@/lib/storm-state';

function CloudPuff({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * speed * 0.3) * 2;
    ref.current.position.y = position[1] + Math.cos(t * speed * 0.5) * 0.4;
    ref.current.position.z = position[2];
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 12, 8]} />
      <meshBasicMaterial color="#3A4047" transparent opacity={0.55} />
    </mesh>
  );
}

function LightningBolt({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let x = 0;
    let y = 14;
    pts.push(new THREE.Vector3(x, y, 0));
    for (let i = 0; i < 9; i++) {
      y -= 1.6;
      x += (Math.random() - 0.5) * 1.4;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.userData.stormFade = false;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const phase = (t + delay) % 3.5;
    const visible = phase < 0.22;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = visible ? 1 : 0;
    ref.current.visible = visible;
    if (visible) {
      ref.current.scale.x = 0.6 + Math.random() * 0.8;
      ref.current.scale.y = 0.9 + Math.random() * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <tubeGeometry args={[curve, 32, 0.08, 5, false]} />
      <meshBasicMaterial color="#F5F1E8" transparent opacity={0} />
    </mesh>
  );
}

function RainParticles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = Math.random() * 40 - 10;
      arr[i * 3 + 2] = -Math.random() * 100 + 20;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (ref.current) ref.current.userData.stormFade = false;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const windX = Math.sin(state.clock.elapsedTime * 0.4) * 0.4 + 1.0;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= delta * 35;
      arr[i * 3] += delta * windX * 3;
      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = 30;
        arr[i * 3] = (Math.random() - 0.5) * 80;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1D3557"
        size={0.18}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function StormLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.intensity = stormState.flashIntensity * 8;
  });
  return <pointLight ref={ref} position={[0, 10, -20]} color="#F5F1E8" intensity={0} distance={80} />;
}

export function StormScene() {
  const groupRef = useRef<THREE.Group>(null);

  const clouds = useMemo(() => {
    const arr: { position: [number, number, number]; scale: number; speed: number }[] = [];
    for (let i = 0; i < 14; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 50,
          8 + Math.random() * 6,
          -20 - Math.random() * 50,
        ],
        scale: 3 + Math.random() * 4,
        speed: 0.4 + Math.random() * 0.8,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const storminess = smoothstep(0.18, 0.42, p) * (1 - smoothstep(0.6, 0.78, p));
    groupRef.current.visible = storminess > 0.05;
    groupRef.current.children.forEach((child) => {
      child.traverse((c) => {
        const mesh = c as THREE.Mesh;
        if (mesh.material && mesh.userData.stormFade !== false) {
          const mat = mesh.material as THREE.Material & { opacity?: number };
          if ('opacity' in mat && mat.opacity !== undefined) {
            const baseOpacity = (mat.userData.baseOpacity as number) ?? (mat.opacity as number);
            if (!mat.userData.baseOpacity) mat.userData.baseOpacity = baseOpacity;
            (mat.opacity as number) = baseOpacity * storminess;
          }
        }
      });
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => (
        <CloudPuff key={i} {...c} />
      ))}
      <LightningBolt position={[-8, 0, -30]} delay={0} />
      <LightningBolt position={[6, 0, -40]} delay={1.7} />
      <LightningBolt position={[-3, 0, -50]} delay={2.9} />
      <RainParticles count={800} />
      <StormLight />
    </group>
  );
}
