'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

export function DropScene() {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current || !cubeRef.current || !cube2Ref.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(0.72, 0.78, p);
    groupRef.current.visible = visibility > 0.001;
    const grow = smoothstep(0.74, 0.97, p);
    const scale = 0.5 + grow * 30;
    cubeRef.current.scale.setScalar(scale);
    cubeRef.current.rotation.x = grow * Math.PI * 0.5;
    cubeRef.current.rotation.z = grow * Math.PI * 0.25;
    const scale2 = 0.3 + grow * 20;
    cube2Ref.current.scale.setScalar(scale2);
    cube2Ref.current.rotation.y = grow * Math.PI * -0.5;
    cube2Ref.current.rotation.x = grow * Math.PI * 0.3;
  });

  return (
    <group ref={groupRef} position={[0, 0, -120]}>
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={cube2Ref} position={[2.5, -1.5, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#FF3131" />
      </mesh>
      <mesh position={[0, 0, 8]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#0000FF" />
      </mesh>
    </group>
  );
}
