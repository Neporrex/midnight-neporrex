'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

const LETTERS = 'RAWCREATION01/01//<>{}[]*+-=#';

type Letter = {
  char: string;
  radius: number;
  angle: number;
  yBase: number;
  ySpeed: number;
  rotSpeed: number;
  size: number;
  color: string;
};

function SwirlingLetter({ letter, index }: { letter: Letter; index: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const angle = letter.angle + t * 0.15;
    ref.current.position.x = Math.cos(angle) * letter.radius;
    ref.current.position.z = Math.sin(angle) * letter.radius;
    ref.current.position.y = letter.yBase + Math.sin(t * letter.ySpeed + index) * 1.5;
    ref.current.rotation.y = -angle + Math.PI / 2;
    ref.current.rotation.x = Math.sin(t * 0.3 + index) * 0.3;
  });

  return (
    <group ref={ref}>
      <Text
        fontSize={letter.size}
        color={letter.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0}
      >
        {letter.char}
      </Text>
    </group>
  );
}

export function LettersScene() {
  const groupRef = useRef<THREE.Group>(null);

  const letters = useMemo<Letter[]>(() => {
    const arr: Letter[] = [];
    const colors = ['#1A1A1A', '#E76F51', '#1D3557', '#2A9D8F', '#1A1A1A', '#F4A261'];
    for (let i = 0; i < 60; i++) {
      arr.push({
        char: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        radius: 4 + Math.random() * 14,
        angle: Math.random() * Math.PI * 2,
        yBase: (Math.random() - 0.5) * 14,
        ySpeed: 0.5 + Math.random() * 1.5,
        rotSpeed: 0.2 + Math.random() * 0.8,
        size: 0.8 + Math.random() * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(0.48, 0.54, p) * (1 - smoothstep(0.64, 0.69, p));
    groupRef.current.visible = visibility > 0.001;
  });

  return (
    <group ref={groupRef} position={[0, 0, -120]}>
      {letters.map((l, i) => (
        <SwirlingLetter key={i} letter={l} index={i} />
      ))}
    </group>
  );
}
