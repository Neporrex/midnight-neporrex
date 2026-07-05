'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState, smoothstep } from '@/lib/scroll-state';

const SCENE_START = 0.34;
const SCENE_END = 0.50;

function LighthouseBeam() {
  const ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const angle = t * 0.8;
    ref.current.rotation.y = angle;
    if (lightRef.current && targetRef.current) {
      const r = 14;
      targetRef.current.position.set(
        Math.cos(angle) * r,
        -2,
        Math.sin(angle) * r
      );
      targetRef.current.updateMatrixWorld();
      lightRef.current.target = targetRef.current;
    }
  });

  return (
    <group position={[0, 2, 0]}>
      <mesh ref={ref}>
        <coneGeometry args={[1.5, 6, 24, 1, true]} />
        <meshBasicMaterial
          color="#F4A261"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <spotLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#F4D35E"
        intensity={4}
        distance={30}
        angle={0.4}
        penumbra={0.5}
        decay={1.5}
      />
      <object3D ref={targetRef} />
    </group>
  );
}

function LighthouseTower() {
  return (
    <group position={[0, -2, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 6, 8]} />
        <meshBasicMaterial color="#1A1A1A" wireframe />
      </mesh>
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[1.6, 0.6, 1.6]} />
        <meshBasicMaterial color="#E76F51" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[1, 1, 6]} />
        <meshBasicMaterial color="#1D3557" />
      </mesh>
    </group>
  );
}

type SweptCube = {
  position: [number, number, number];
  scale: number;
  color: string;
  spinSpeed: number;
  baseAngle: number;
  radius: number;
};

function SweptObject({ cube }: { cube: SweptCube }) {
  const ref = useRef<THREE.Mesh>(null);
  const initial = useRef(cube.position);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const beamAngle = t * 0.8;
    const cubeAngle = Math.atan2(initial.current[2], initial.current[0]);
    let diff = beamAngle - cubeAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const lit = Math.max(0, 1 - Math.abs(diff) / 0.5);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    const dimColor = new THREE.Color('#2A2A2A');
    const fullColor = new THREE.Color(cube.color);
    mat.color = dimColor.clone().lerp(fullColor, lit);
    const pulse = 1 + lit * 0.3;
    ref.current.scale.setScalar(cube.scale * pulse);
    ref.current.rotation.y = t * cube.spinSpeed;
    ref.current.rotation.x = t * cube.spinSpeed * 0.5;
    ref.current.position.y = initial.current[1] + Math.sin(t * 0.5 + cube.baseAngle) * 0.4;
  });

  return (
    <mesh ref={ref} position={cube.position} scale={cube.scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#2A2A2A" />
    </mesh>
  );
}

function StandingLabel() {
  return (
    <group position={[0, -4.5, 0]}>
      <Text
        fontSize={0.4}
        color="#1A1A1A"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#F5F1E8"
      >
        STAY LIT
      </Text>
    </group>
  );
}

export function BeaconScene() {
  const groupRef = useRef<THREE.Group>(null);

  const sweptCubes = useMemo<SweptCube[]>(() => {
    const arr: SweptCube[] = [];
    const colors = ['#E76F51', '#F4A261', '#2A9D8F', '#1D3557', '#E63946'];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const r = 8 + Math.random() * 4;
      arr.push({
        position: [Math.cos(angle) * r, (Math.random() - 0.5) * 6, Math.sin(angle) * r],
        scale: 0.8 + Math.random() * 0.7,
        color: colors[i % colors.length],
        spinSpeed: 0.2 + Math.random() * 0.4,
        baseAngle: angle,
        radius: r,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(SCENE_START - 0.02, SCENE_START + 0.03, p) * (1 - smoothstep(SCENE_END - 0.02, SCENE_END + 0.03, p));
    groupRef.current.visible = visibility > 0.001;
  });

  return (
    <group ref={groupRef} position={[0, 0, -80]}>
      <LighthouseTower />
      <LighthouseBeam />
      {sweptCubes.map((c, i) => (
        <SweptObject key={i} cube={c} />
      ))}
      <StandingLabel />
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5, 5.2, 32]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11, 11.2, 32]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
    </group>
  );
}
