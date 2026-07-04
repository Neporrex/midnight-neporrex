'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

type FlyingObject = {
  position: [number, number, number];
  scale: number;
  type: 'cube' | 'sphere';
  color: string;
  speed: number;
  rotationSpeed: number;
};

function GridPlane({
  y,
  rotation,
  visible,
}: {
  y: number;
  rotation: [number, number, number];
  visible: boolean;
}) {
  return (
    <group visible={visible}>
      <mesh rotation={rotation} position={[0, y, 0]}>
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshBasicMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

function FlyingCube({ obj }: { obj: FlyingObject }) {
  const ref = useRef<THREE.Mesh>(null);
  const initialZ = obj.position[2];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const drift = (t * obj.speed) % 80;
    ref.current.position.z = initialZ + drift;
    ref.current.position.x = obj.position[0] + Math.sin(t * 0.5 + initialZ) * 1.2;
    ref.current.position.y = obj.position[1] + Math.cos(t * 0.7 + initialZ) * 1.0;
    ref.current.rotation.x = t * obj.rotationSpeed;
    ref.current.rotation.y = t * obj.rotationSpeed * 0.8;
    if (ref.current.position.z > 10) {
      ref.current.position.z = initialZ;
    }
  });

  if (obj.type === 'sphere') {
    return (
      <mesh ref={ref} position={obj.position} scale={obj.scale}>
        <sphereGeometry args={[0.8, 16, 12]} />
        <meshBasicMaterial color={obj.color} />
      </mesh>
    );
  }
  return (
    <mesh ref={ref} position={obj.position} scale={obj.scale}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshBasicMaterial color={obj.color} />
    </mesh>
  );
}

export function GridScene() {
  const groupRef = useRef<THREE.Group>(null);

  const flyingObjects = useMemo<FlyingObject[]>(() => {
    const arr: FlyingObject[] = [];
    const colors = ['#000000', '#FF3131', '#0000FF', '#000000', '#000000'];
    for (let i = 0; i < 28; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 18,
          -10 - Math.random() * 30,
        ],
        scale: 0.6 + Math.random() * 1.6,
        type: Math.random() > 0.5 ? 'cube' : 'sphere',
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 4 + Math.random() * 8,
        rotationSpeed: 0.3 + Math.random() * 0.8,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(0.22, 0.3, p) * (1 - smoothstep(0.46, 0.52, p));
    groupRef.current.visible = visibility > 0.001;
  });

  return (
    <group ref={groupRef} position={[0, 0, -40]}>
      <GridPlane y={-8} rotation={[-Math.PI / 2, 0, 0]} visible />
      <GridPlane y={8} rotation={[Math.PI / 2, 0, 0]} visible />
      <GridPlane y={0} rotation={[0, Math.PI / 2, 0]} visible />
      {flyingObjects.map((obj, i) => (
        <FlyingCube key={i} obj={obj} />
      ))}
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#FF3131" />
      </mesh>
    </group>
  );
}
