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
  windFactor: number;
  drift: number;
};

const WATER_VERT = `
  uniform float uTime;
  uniform float uAmp;
  varying float vWave;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 0.5 + uTime * 1.2) * cos(p.y * 0.5 + uTime * 0.9);
    float w2 = sin(p.x * 0.2 - uTime * 0.6) * 0.4;
    p.z += (w + w2) * uAmp;
    vWave = (w + w2) * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const WATER_FRAG = `
  varying float vWave;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    gl_FragColor = vec4(mix(uColorA, uColorB, vWave), 1.0);
  }
`;

function WaterFloor({ y, storminess }: { y: number; storminess: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0 },
      uColorA: { value: new THREE.Color('#1D3557') },
      uColorB: { value: new THREE.Color('#2A9D8F') },
    }),
    []
  );
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uAmp.value = 0.3 + storminess * 1.4;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[200, 200, 60, 60]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={WATER_VERT}
        fragmentShader={WATER_FRAG}
        uniforms={uniforms}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function WireCeiling({ y }: { y: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[200, 200, 30, 30]} />
      <meshBasicMaterial color="#1A1A1A" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

function FlyingCube({ obj, storminess }: { obj: FlyingObject; storminess: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const initialZ = obj.position[2];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const drift = (t * obj.speed) % 80;
    ref.current.position.z = initialZ + drift;
    const windDir = Math.sin(t * 0.4) * 1.5;
    const windStrength = (0.6 + storminess * 1.4) * obj.windFactor;
    ref.current.position.x = obj.position[0] + windDir * windStrength + Math.sin(t * 0.7 + initialZ) * 0.6;
    ref.current.position.y = obj.position[1] + Math.cos(t * 0.5 + initialZ) * 0.8 + Math.sin(t * 1.2 + obj.drift) * storminess * 0.8;
    ref.current.rotation.x = t * obj.rotationSpeed;
    ref.current.rotation.y = t * obj.rotationSpeed * 0.8;
    ref.current.rotation.z = windDir * 0.2 * storminess;
    if (ref.current.position.z > 10) {
      ref.current.position.z = initialZ;
    }
  });

  if (obj.type === 'sphere') {
    return (
      <mesh ref={ref} position={obj.position} scale={obj.scale}>
        <sphereGeometry args={[0.7, 14, 10]} />
        <meshBasicMaterial color={obj.color} />
      </mesh>
    );
  }
  return (
    <mesh ref={ref} position={obj.position} scale={obj.scale}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial color={obj.color} />
    </mesh>
  );
}

export function GridScene() {
  const groupRef = useRef<THREE.Group>(null);
  const stormRef = useRef(0);

  const flyingObjects = useMemo<FlyingObject[]>(() => {
    const arr: FlyingObject[] = [];
    const colors = ['#1A1A1A', '#E76F51', '#1D3557', '#2A9D8F', '#1A1A1A', '#F4A261'];
    for (let i = 0; i < 24; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 16,
          -10 - Math.random() * 30,
        ],
        scale: 0.5 + Math.random() * 1.5,
        type: Math.random() > 0.55 ? 'cube' : 'sphere',
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 4 + Math.random() * 8,
        rotationSpeed: 0.3 + Math.random() * 0.8,
        windFactor: 0.5 + Math.random() * 1.5,
        drift: Math.random() * 10,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = scrollState.progress;
    const visibility = smoothstep(0.15, 0.19, p) * (1 - smoothstep(0.31, 0.36, p));
    groupRef.current.visible = visibility > 0.001;
    const target = smoothstep(0.15, 0.30, p);
    stormRef.current = THREE.MathUtils.lerp(stormRef.current, target, delta * 1.5);
  });

  return (
    <group ref={groupRef} position={[0, 0, -40]}>
      <WaterFloor y={-8} storminess={stormRef.current} />
      <WireCeiling y={8} />
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[200, 200, 20, 20]} />
        <meshBasicMaterial color="#1A1A1A" wireframe opacity={0.25} transparent />
      </mesh>
      {flyingObjects.map((obj, i) => (
        <FlyingCube key={i} obj={obj} storminess={stormRef.current} />
      ))}
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial color="#E76F51" />
      </mesh>
    </group>
  );
}
