'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';
import { stormState } from '@/lib/storm-state';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

const SCENE_START = 0.0;
const SCENE_END = 0.18;

export function TitleScene() {
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);
  const fireTextRef = useRef<THREE.Group>(null);
  const flashMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !textGroupRef.current) return;
    const p = scrollState.progress;
    const visibility = 1 - smoothstep(SCENE_END - 0.04, SCENE_END + 0.04, p);
    groupRef.current.visible = visibility > 0.001;
    const rotY = (p / SCENE_END) * Math.PI * 0.8;
    textGroupRef.current.rotation.y = rotY;
    const scale = 1 - smoothstep(SCENE_END - 0.06, SCENE_END + 0.04, p) * 0.4;
    textGroupRef.current.scale.setScalar(Math.max(0.4, scale));

    const firePulse = stormState.flashIntensity;
    if (fireTextRef.current) {
      const targetScale = 0.7 + firePulse * 0.5;
      fireTextRef.current.scale.setScalar(
        THREE.MathUtils.lerp(fireTextRef.current.scale.x, targetScale, 0.2)
      );
      const targetY = -2.5 + firePulse * 0.4;
      fireTextRef.current.position.y = THREE.MathUtils.lerp(
        fireTextRef.current.position.y,
        targetY,
        0.15
      );
      fireTextRef.current.visible = firePulse > 0.02 || p < SCENE_END;
      fireTextRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (flashMatRef.current) {
      flashMatRef.current.opacity = 0.7 + firePulse * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={textGroupRef} position={[0, 0.6, 0]}>
        <Center>
          <Text3D
            font={FONT_URL}
            size={0.9}
            height={0.3}
            curveSegments={6}
            bevelEnabled
            bevelThickness={0.04}
            bevelSize={0.02}
            bevelSegments={2}
          >
            MANIFESTO
            <meshBasicMaterial color="#1A1A1A" />
          </Text3D>
        </Center>
      </group>

      <group position={[0, 1.7, 0]}>
        <Text
          fontSize={0.22}
          color="#1D3557"
          anchorX="center"
          anchorY="middle"
          maxWidth={14}
          textAlign="center"
        >
          a scroll-driven storm by neporrex_
        </Text>
      </group>

      <group ref={fireTextRef} position={[0, -2.5, 1]} visible={false}>
        <Text
          fontSize={0.55}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.025}
          outlineColor="#1A1A1A"
        >
          FIRED BY THE STORM
          <meshBasicMaterial ref={flashMatRef} color="#E76F51" transparent opacity={0.85} />
        </Text>
        <mesh position={[0, -0.4, -0.2]}>
          <boxGeometry args={[4.5, 0.06, 0.06]} />
          <meshBasicMaterial color="#F4A261" />
        </mesh>
        <mesh position={[-2.4, 0, -0.2]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
        <mesh position={[2.4, 0, -0.2]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
      </group>

      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[10, 0.08, 0.08]} />
        <meshBasicMaterial color="#1D3557" />
      </mesh>
      <mesh position={[0, -3.4, 0]}>
        <boxGeometry args={[10, 0.08, 0.08]} />
        <meshBasicMaterial color="#2A9D8F" />
      </mesh>
      <mesh position={[-4.5, 0, -2]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#E76F51" />
      </mesh>
      <mesh position={[4.5, 0, -2]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#1D3557" />
      </mesh>
      <mesh position={[-3, 2, -1.5]} rotation={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#F4A261" />
      </mesh>
      <mesh position={[3, -2, -1.5]} rotation={[0.4, -0.3, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#2A9D8F" />
      </mesh>
      <mesh position={[0, -1.6, -3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial color="#E76F51" wireframe />
      </mesh>
    </group>
  );
}
