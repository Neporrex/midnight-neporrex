'use client';

import { useEffect, useRef, useState } from 'react';
import { Scene3DCanvas } from '@/components/scene3d/Scene3DCanvas';
import { ScrollSetup } from '@/components/scene3d/ScrollSetup';
import { Navbar } from '@/components/ui-overlay/Navbar';
import { ScrollProgress } from '@/components/ui-overlay/ScrollProgress';
import { StickyPanel } from '@/components/ui-overlay/StickyPanel';
import { ContactFooter } from '@/components/ui-overlay/ContactFooter';
import { LightningOverlay } from '@/components/ui-overlay/LightningOverlay';
import { EpilepticWarning } from '@/components/ui-overlay/EpilepticWarning';
import { RetroOverlay, GrainOverlay } from '@/components/ui-overlay/Overlays';
import { NowBuilding } from '@/components/ui-overlay/NowBuilding';
import { ThoughtTicker } from '@/components/ui-overlay/ThoughtTicker';
import { scrollState } from '@/lib/scroll-state';

const SCROLL_HEIGHT_VH = 700;

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
      <EpilepticWarning />
      <Navbar />
      <Scene3DCanvas />
      <ScrollSetup containerRef={containerRef} onSceneChange={setScene} />
      <ScrollProgress progress={progress} />
      <LightningOverlay />
      <RetroOverlay />
      <GrainOverlay />
      <StickyPanel active={scene === 3} />
      <NowBuilding />
      <ThoughtTicker />

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
          subtitle="where it begins."
          position={{ bottom: '14vh', left: '6vw' }}
        />
        <SceneLabel
          visible={scene === 1}
          number="02"
          title="THE STORM"
          subtitle="wind, water, lightning."
          position={{ top: '20vh', right: '8vw' }}
        />
        <SceneLabel
          visible={scene === 2}
          number="03"
          title="THE BEACON"
          subtitle="something stays lit."
          position={{ bottom: '14vh', left: '6vw' }}
        />
        <SceneLabel
          visible={scene === 3}
          number="04"
          title="RAW CREATION"
          subtitle="the manifesto slides in."
          position={{ top: '20vh', right: '8vw' }}
          hideOnPanel
        />
        <SceneLabel
          visible={scene === 4}
          number="05"
          title="THE ARCHIVE"
          subtitle="old thoughts, kept cold."
          position={{ bottom: '14vh', left: '6vw' }}
        />
        <SceneLabel
          visible={scene === 5}
          number="06"
          title="THE DROP"
          subtitle="end of the line."
          position={{ top: '20vh', right: '8vw' }}
        />
        <WindTagline visible={scene === 1} />
        <BeaconTagline visible={scene === 2} />
        <ArchiveTagline visible={scene === 4} />
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
      className="absolute z-10"
      style={{
        top: '14vh',
        left: '6vw',
      }}
    >
      <div
        className="font-mono-raw text-[10px] tracking-[0.3em] mb-2"
        style={{ color: '#1A1A1A', opacity: 0.7 }}
      >
        NEPORREX_ / 2026
      </div>
      <div
        className="font-mono-raw text-[10px] tracking-[0.3em]"
        style={{ color: '#E76F51' }}
      >
        SCROLL SLOWLY TO BEGIN
      </div>
    </div>
  );
}

type SceneLabelProps = {
  visible: boolean;
  number: string;
  title: string;
  subtitle: string;
  position: React.CSSProperties;
  hideOnPanel?: boolean;
};

function SceneLabel({ visible, number, title, subtitle, position, hideOnPanel }: SceneLabelProps) {
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
        {number} / 06
      </div>
      <div
        className="font-display leading-[0.9] tracking-tight"
        style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          color: '#1A1A1A',
        }}
      >
        {title}
      </div>
      {!hideOnPanel && (
        <div
          className="font-mono-raw text-xs mt-1"
          style={{ color: '#1A1A1A', opacity: 0.6 }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function WindTagline({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute z-10 transition-opacity duration-700 font-mono-raw text-xs"
      style={{
        bottom: '14vh',
        right: '8vw',
        maxWidth: '260px',
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

function BeaconTagline({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute z-10 transition-opacity duration-700 font-mono-raw text-xs"
      style={{
        bottom: '14vh',
        right: '8vw',
        maxWidth: '260px',
        textAlign: 'right',
        color: '#1D3557',
        opacity: visible ? 0.85 : 0,
        lineHeight: 1.6,
      }}
    >
      a beam turns in the dark. every cube it hits, lights up. the rest wait.
    </div>
  );
}

function ArchiveTagline({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute z-10 transition-opacity duration-700 font-mono-raw text-xs"
      style={{
        bottom: '14vh',
        right: '8vw',
        maxWidth: '260px',
        textAlign: 'right',
        color: '#2A9D8F',
        opacity: visible ? 0.85 : 0,
        lineHeight: 1.6,
      }}
    >
      code falls. letters change. nothing is saved. that is the point.
    </div>
  );
}
