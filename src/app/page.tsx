'use client';

import { useEffect, useRef, useState } from 'react';
import { Scene3DCanvas } from '@/components/scene3d/Scene3DCanvas';
import { ScrollSetup } from '@/components/scene3d/ScrollSetup';
import { Navbar } from '@/components/ui-overlay/Navbar';
import { ScrollProgress } from '@/components/ui-overlay/ScrollProgress';
import { StickyPanel } from '@/components/ui-overlay/StickyPanel';
import { ContactFooter } from '@/components/ui-overlay/ContactFooter';
import { LightningOverlay } from '@/components/ui-overlay/LightningOverlay';
import { RetroOverlay, GrainOverlay } from '@/components/ui-overlay/Overlays';
import { scrollState } from '@/lib/scroll-state';

const SCROLL_HEIGHT_VH = 500;

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setProgress(scrollState.progress);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main ref={containerRef} id="top" className="relative w-full" style={{ background: '#F5F1E8' }}>
      <Navbar />
      <Scene3DCanvas />
      <ScrollSetup containerRef={containerRef} onSceneChange={setScene} />
      <ScrollProgress progress={progress} />
      <LightningOverlay />
      <RetroOverlay />
      <GrainOverlay />
      <StickyPanel active={scene === 2} />

      <div
        id="storm"
        style={{
          height: `${SCROLL_HEIGHT_VH}vh`,
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <HeroLabel />
        <SceneLabel
          visible={scene === 0}
          number="01"
          title="THE TITLE"
          position={{ bottom: '12vh', left: '6vw' }}
        />
        <SceneLabel
          visible={scene === 1}
          number="02"
          title="THE STORM"
          position={{ top: '20vh', right: '8vw' }}
        />
        <SceneLabel
          visible={scene === 2}
          number="03"
          title="RAW CREATION"
          position={{ bottom: '14vh', left: '6vw' }}
        />
        <SceneLabel
          visible={scene === 3}
          number="04"
          title="THE DROP"
          position={{ top: '20vh', right: '8vw' }}
        />
        <WindTagline visible={scene === 1} />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <ContactFooter />
      </div>
    </main>
  );
}

function HeroLabel() {
  return (
    <div
      className="absolute z-10 font-mono-raw text-[10px] tracking-[0.3em]"
      style={{
        top: '8vh',
        left: '6vw',
        color: '#1A1A1A',
        opacity: 0.6,
      }}
    >
      <div>NEPORREX_</div>
      <div style={{ marginTop: 4, color: '#E76F51' }}>SCROLL TO BEGIN</div>
    </div>
  );
}

type SceneLabelProps = {
  visible: boolean;
  number: string;
  title: string;
  position: React.CSSProperties;
};

function SceneLabel({ visible, number, title, position }: SceneLabelProps) {
  return (
    <div
      className="absolute z-10 transition-all duration-500"
      style={{
        ...position,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      <div
        className="font-mono-raw text-[11px] tracking-widest mb-1"
        style={{ color: '#E76F51' }}
      >
        {number} / 04
      </div>
      <div
        className="font-display leading-[0.9] tracking-tight"
        style={{
          fontSize: 'clamp(28px, 5vw, 56px)',
          color: '#1A1A1A',
          WebkitTextStroke: '0.5px #1A1A1A',
        }}
      >
        {title}
      </div>
    </div>
  );
}

function WindTagline({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute z-10 transition-opacity duration-700 font-mono-raw text-xs"
      style={{
        bottom: '12vh',
        right: '8vw',
        maxWidth: '280px',
        textAlign: 'right',
        color: '#1D3557',
        opacity: visible ? 0.85 : 0,
        lineHeight: 1.6,
      }}
    >
      <span className="animate-sway inline-block">
        wind bends the cubes. water moves the floor. lightning fires the text.
      </span>
    </div>
  );
}
