'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

export function TitleScene() {
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || !textGroupRef.current) return;
    const p = scrollState.progress;
    const visibility = 1 - smoothstep(0.18, 0.26, p);
    groupRef.current.visible = visibility > 0.001;
    const rotY = (p - 0.05) * Math.PI * 10;
    textGroupRef.current.rotation.y = rotY;
    const scale = 1 + smoothstep(0.0, 0.1, p) * 0.4 - smoothstep(0.15, 0.26, p) * 0.5;
    textGroupRef.current.scale.setScalar(Math.max(0.3, scale));
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={textGroupRef}>
        <Center>
          <Text3D
            font={FONT_URL}
            size={1.4}
            height={0.45}
            curveSegments={6}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.03}
            bevelSegments={2}
          >
            THE MANIFESTO
            <meshBasicMaterial color="#000000" />
          </Text3D>
        </Center>
      </group>
      <mesh position={[0, -3, 0]}>
        <boxGeometry args={[16, 0.18, 0.18]} />
        <meshBasicMaterial color="#FF3131" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[16, 0.18, 0.18]} />
        <meshBasicMaterial color="#0000FF" />
      </mesh>
      <mesh position={[-3.5, 0, -1]}>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshBasicMaterial color="#FF3131" />
      </mesh>
      <mesh position={[3.5, 0, -1]}>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshBasicMaterial color="#0000FF" />
      </mesh>
      <mesh position={[0, -1.6, 0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 1.6, 0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
