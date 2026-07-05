'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';
import { stormState } from '@/lib/storm-state';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

export function TitleScene() {
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);
  const fireTextRef = useRef<THREE.Group>(null);
  const flashMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !textGroupRef.current) return;
    const p = scrollState.progress;
    const visibility = 1 - smoothstep(0.18, 0.26, p);
    groupRef.current.visible = visibility > 0.001;
    const rotY = (p - 0.05) * Math.PI * 10;
    textGroupRef.current.rotation.y = rotY;
    const scale = 1 + smoothstep(0.0, 0.1, p) * 0.4 - smoothstep(0.15, 0.26, p) * 0.5;
    textGroupRef.current.scale.setScalar(Math.max(0.3, scale));

    const firePulse = stormState.flashIntensity;
    if (fireTextRef.current) {
      const targetScale = 0.6 + firePulse * 0.8;
      fireTextRef.current.scale.setScalar(
        THREE.MathUtils.lerp(fireTextRef.current.scale.x, targetScale, 0.2)
      );
      const targetY = -3 + firePulse * 0.6;
      fireTextRef.current.position.y = THREE.MathUtils.lerp(
        fireTextRef.current.position.y,
        targetY,
        0.15
      );
      fireTextRef.current.visible = firePulse > 0.02 || p < 0.18;
      fireTextRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
    if (flashMatRef.current) {
      flashMatRef.current.opacity = 0.7 + firePulse * 0.3;
    }
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
            <meshBasicMaterial color="#1A1A1A" />
          </Text3D>
        </Center>
      </group>

      <group ref={fireTextRef} position={[0, -3, 1]} visible={false}>
        <Text
          fontSize={0.85}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#1A1A1A"
        >
          FIRED BY THE STORM
          <meshBasicMaterial ref={flashMatRef} color="#E76F51" transparent opacity={0.85} />
        </Text>
        <mesh position={[0, -0.5, -0.2]}>
          <boxGeometry args={[6, 0.08, 0.08]} />
          <meshBasicMaterial color="#F4A261" />
        </mesh>
        <mesh position={[-3.2, 0, -0.2]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
        <mesh position={[3.2, 0, -0.2]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
      </group>

      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[14, 0.12, 0.12]} />
        <meshBasicMaterial color="#1D3557" />
      </mesh>
      <mesh position={[0, -2.6, 0]}>
        <boxGeometry args={[14, 0.12, 0.12]} />
        <meshBasicMaterial color="#2A9D8F" />
      </mesh>
      <mesh position={[-3.5, 0, -1]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color="#E76F51" />
      </mesh>
      <mesh position={[3.5, 0, -1]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color="#1D3557" />
      </mesh>
    </group>
  );
}
