'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

const SCENE_START = 0.67;
const SCENE_END = 0.84;

const GLYPHS = '01<>/{}[]()*+-=#$%&@!?|\\';

type Column = {
  x: number;
  y: number;
  z: number;
  speed: number;
  chars: string[];
  length: number;
};

function CodeRain({ count = 28 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const textRefs = useRef<(THREE.Group | null)[]>([]);
  const columns = useMemo<Column[]>(() => {
    const arr: Column[] = [];
    for (let i = 0; i < count; i++) {
      const len = 8 + Math.floor(Math.random() * 12);
      const chars: string[] = [];
      for (let j = 0; j < len; j++) {
        chars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }
      arr.push({
        x: (Math.random() - 0.5) * 30,
        y: Math.random() * 30,
        z: (Math.random() - 0.5) * 20 - 5,
        speed: 1 + Math.random() * 2,
        chars,
        length: len,
      });
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    columns.forEach((col, i) => {
      col.y -= delta * col.speed * 3;
      if (col.y < -16) {
        col.y = 18 + Math.random() * 6;
      }
      const g = textRefs.current[i];
      if (g) {
        g.position.set(col.x, col.y, col.z);
        g.children.forEach((child, j) => {
          if (Math.random() < 0.08) {
            const text = child as THREE.Group;
            const textMesh = text.children[0] as unknown as { text: string };
            if (textMesh && 'text' in textMesh) {
              textMesh.text = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
          }
        });
      }
    });
  });

  return (
    <group ref={groupRef}>
      {columns.map((col, i) => (
        <group
          key={i}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          position={[col.x, col.y, col.z]}
        >
          {col.chars.map((c, j) => (
            <Text
              key={j}
              position={[0, -j * 0.5, 0]}
              fontSize={0.32}
              color={j === 0 ? '#F4A261' : '#2A9D8F'}
              anchorX="center"
              anchorY="middle"
            >
              {c}
            </Text>
          ))}
        </group>
      ))}
    </group>
  );
}

function TypewriterQuote() {
  const ref = useRef<THREE.Group>(null);
  const textRef = useRef<{ text: string } | null>(null);
  const fullText = '> archive: raw thoughts, kept cold.';
  const idxRef = useRef(0);
  const lastUpdate = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    if (t - lastUpdate.current > 0.06) {
      lastUpdate.current = t;
      idxRef.current = Math.min(fullText.length, idxRef.current + 1);
      if (textRef.current) {
        textRef.current.text = fullText.slice(0, idxRef.current) + (idxRef.current < fullText.length ? '_' : '');
      }
      if (idxRef.current >= fullText.length && t - lastUpdate.current > 1.5) {
        idxRef.current = 0;
      }
    }
  });

  return (
    <group ref={ref} position={[0, 2, 4]}>
      <Text
        ref={(el: any) => {
          textRef.current = el as any;
        }}
        fontSize={0.5}
        color="#E76F51"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#1A1A1A"
      >
        {''}
      </Text>
    </group>
  );
}

function FrameBox() {
  return (
    <group position={[0, 0, -2]}>
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[24, 0.08, 0.08]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0, -7, 0]}>
        <boxGeometry args={[24, 0.08, 0.08]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[-12, 0, 0]}>
        <boxGeometry args={[0.08, 14, 0.08]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[12, 0, 0]}>
        <boxGeometry args={[0.08, 14, 0.08]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
    </group>
  );
}

export function ArchiveScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(SCENE_START - 0.02, SCENE_START + 0.03, p) * (1 - smoothstep(SCENE_END - 0.02, SCENE_END + 0.03, p));
    groupRef.current.visible = visibility > 0.001;
  });

  return (
    <group ref={groupRef} position={[0, 0, -160]}>
      <CodeRain count={24} />
      <TypewriterQuote />
      <FrameBox />
      <mesh position={[0, -3, 2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 0.2]} />
        <meshBasicMaterial color="#1D3557" wireframe />
      </mesh>
      <mesh position={[0, -3, 2.2]}>
        <boxGeometry args={[2.5, 0.4, 0.05]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0, -3.5, 2.2]}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0, -3.8, 2.2]}>
        <boxGeometry args={[1.5, 0.05, 0.05]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
    </group>
  );
}
