'use client';

import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TitleScene } from './TitleScene';
import { GridScene } from './GridScene';
import { LettersScene } from './LettersScene';
import { DropScene } from './DropScene';
import { scrollState, SCENE_Z_POSITIONS, lerp } from '@/lib/scroll-state';

const BROKEN_WHITE = '#F2F0E9';

function CameraRig() {
  const targetZ = useRef(0);

  useFrame((state) => {
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
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, Math.sin(p * Math.PI * 2) * 0.6, 0.1);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, Math.cos(p * Math.PI * 3) * 0.4, 0.1);
    cam.lookAt(0, 0, cam.position.z - 5);
  });

  return null;
}

function FogRig() {
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.fog = new THREE.Fog(BROKEN_WHITE, 25, 70);
    scene.background = new THREE.Color(BROKEN_WHITE);
  }, [scene]);
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
        background: BROKEN_WHITE,
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
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <TitleScene />
        <GridScene />
        <LettersScene />
        <DropScene />
      </Suspense>
    </Canvas>
  );
}
