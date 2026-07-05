'use client';

import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TitleScene } from './TitleScene';
import { GridScene } from './GridScene';
import { LettersScene } from './LettersScene';
import { DropScene } from './DropScene';
import { StormScene } from './StormScene';
import { scrollState, SCENE_Z_POSITIONS, lerp, smoothstep } from '@/lib/scroll-state';
import { stormState, triggerLightning, decayFlash } from '@/lib/storm-state';

const BONE = '#F5F1E8';
const STORM_BG = '#D4D8DC';

function CameraRig() {
  const targetZ = useRef(0);

  useFrame((state, delta) => {
    const p = scrollState.progress;
    let z: number;
    if (p < 0.25) {
      z = lerp(SCENE_Z_POSITIONS[0] + 8, SCENE_Z_POSITIONS[0] - 4, p / 0.25);
    } else if (p < 0.5) {
      const local = (p - 0.25) / 0.25;
      z = lerp(SCENE_Z_POSITIONS[0] - 4, SCENE_Z_POSITIONS[1] - 2, local);
    } else if (p < 0.75) {
      const local = (p - 0.5) / 0.25;
      z = lerp(SCENE_Z_POSITIONS[1] - 2, SCENE_Z_POSITIONS[2] - 2, local);
    } else {
      const local = (p - 0.75) / 0.25;
      z = lerp(SCENE_Z_POSITIONS[2] - 2, SCENE_Z_POSITIONS[3] - 2, local);
    }
    targetZ.current = z;
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ.current, 0.18);
    const windSwayX = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
    const windSwayY = Math.cos(state.clock.elapsedTime * 0.4) * 0.25;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, windSwayX + Math.sin(p * Math.PI * 2) * 0.4, 0.08);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, windSwayY + Math.cos(p * Math.PI * 3) * 0.3, 0.08);
    cam.lookAt(0, 0, cam.position.z - 5);
    decayFlash(delta);
  });

  return null;
}

function FogRig() {
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.fog = new THREE.Fog(BONE, 22, 65);
    scene.background = new THREE.Color(BONE);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  const fogRef = useRef<THREE.Fog | null>(null);
  useFrame(() => {
    if (!scene.fog || !(scene.fog instanceof THREE.Fog)) return;
    const p = scrollState.progress;
    const storminess = smoothstep(0.18, 0.42, p) * (1 - smoothstep(0.6, 0.78, p));
    const baseColor = new THREE.Color(BONE);
    const stormColor = new THREE.Color(STORM_BG);
    const c = baseColor.clone().lerp(stormColor, storminess * 0.7);
    scene.fog.color = c;
    if (scene.background instanceof THREE.Color) {
      scene.background.copy(c);
    }
    scene.fog.near = 22 - storminess * 8;
    scene.fog.far = 65 - storminess * 15;
    fogRef.current = scene.fog;
  });

  return null;
}

function StormTrigger() {
  const lastStrikeRef = useRef(0);
  useFrame((state) => {
    const p = scrollState.progress;
    const storminess = smoothstep(0.18, 0.42, p) * (1 - smoothstep(0.6, 0.78, p));
    if (storminess < 0.1) return;
    const t = state.clock.elapsedTime;
    const interval = 1.8 - storminess * 0.8;
    const jitter = Math.sin(t * 7.3) * 0.3 + Math.cos(t * 3.1) * 0.4;
    if (t - lastStrikeRef.current > interval + jitter) {
      lastStrikeRef.current = t;
      triggerLightning(0.9 + storminess * 0.1);
    }
  });
  return null;
}

export function Scene3DCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        background: BONE,
      }}
      camera={{
        position: [0, 0, 8],
        fov: 70,
        near: 0.1,
        far: 200,
      }}
      gl={{
        antialias: true,
        alpha: false,
      }}
      dpr={[1, 2]}
    >
      <FogRig />
      <CameraRig />
      <StormTrigger />
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <TitleScene />
        <GridScene />
        <LettersScene />
        <DropScene />
        <StormScene />
      </Suspense>
    </Canvas>
  );
}
