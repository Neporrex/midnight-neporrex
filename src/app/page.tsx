'use client';

import { useEffect, useRef, useState } from 'react';
import { Scene3DCanvas } from '@/components/scene3d/Scene3DCanvas';
import { ScrollSetup } from '@/components/scene3d/ScrollSetup';
import { Navbar } from '@/components/ui-overlay/Navbar';
import { ScrollProgress } from '@/components/ui-overlay/ScrollProgress';
import { SceneIndicator } from '@/components/ui-overlay/SceneIndicator';
import { StickyPanel } from '@/components/ui-overlay/StickyPanel';
import { ContactFooter } from '@/components/ui-overlay/ContactFooter';
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
    <main ref={containerRef} className="relative w-full" style={{ background: '#F2F0E9' }}>
      <Navbar />
      <Scene3DCanvas />
      <ScrollSetup containerRef={containerRef} onSceneChange={setScene} />
      <ScrollProgress progress={progress} />
      <SceneIndicator scene={scene} />
      <StickyPanel active={scene === 2} />

      <div style={{ height: `${SCROLL_HEIGHT_VH}vh`, position: 'relative', zIndex: 2 }}>
        <SceneSection
          id="scene-1"
          index="01"
          title="THE TITLE"
          align="left"
          top="18vh"
          paragraph="A massive chunk of ink hovering in the void. It spins when you tell it to. No soft transitions, no ease-in-out comfort. Just rotation."
        />
        <SceneSection
          id="scene-2"
          index="02"
          title="THE GRID"
          align="right"
          top="38vh"
          paragraph="A wireframe tunnel with cubes and spheres punching past the lens. Parallax is not a feature here. It is the only language we speak."
        />
        <SceneSection
          id="scene-3"
          index="03"
          title="RAW CREATION"
          align="left"
          top="58vh"
          paragraph="The manifesto slides in from the right. Letters swirl behind it. Read the card. Ignore the chaos. Or don't."
          hideCard
        />
        <SceneSection
          id="scene-4"
          index="04"
          title="THE DROP"
          align="right"
          top="78vh"
          paragraph="A black cube eats the screen. Then the contact section arrives. That is how every good story ends."
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <ContactFooter />
      </div>
    </main>
  );
}

function SceneSection({
  id,
  index,
  title,
  align,
  top,
  paragraph,
  hideCard,
}: {
  id: string;
  index: string;
  title: string;
  align: 'left' | 'right';
  top: string;
  paragraph: string;
  hideCard?: boolean;
}) {
  const isRight = align === 'right';
  return (
    <section
      id={id}
      className="absolute"
      style={{
        top,
        [isRight ? 'right' : 'left']: '6vw',
      } as React.CSSProperties}
    >
      {!hideCard && (
        <div
          className="max-w-md"
          style={{
            background: '#F2F0E9',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px 0px #000000',
            padding: '20px',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="px-2 py-1"
              style={{ background: '#000000' }}
            >
              <span className="font-mono-raw text-[10px] font-bold tracking-widest" style={{ color: '#F2F0E9' }}>
                {index}
              </span>
            </div>
            <div
              className="px-2 py-1"
              style={{ background: '#FF3131', border: '2px solid #000000' }}
            >
              <span className="font-mono-raw text-[10px] font-bold tracking-widest">
                {'SCROLL >>'}
              </span>
            </div>
          </div>
          <h3
            className="font-display leading-[0.9] tracking-tight"
            style={{ fontSize: '38px', marginBottom: '10px' }}
          >
            {title}
          </h3>
          <p className="font-mono-raw text-xs leading-relaxed">
            {paragraph}
          </p>
          <div className="flex items-center gap-1 mt-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 4,
                  background: i < 4 ? '#000000' : 'transparent',
                  border: '1px solid #000000',
                }}
              />
            ))}
          </div>
        </div>
      )}
      {hideCard && (
        <div
          className="max-w-xs"
          style={{
            background: '#0000FF',
            color: '#F2F0E9',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px 0px #FF3131',
            padding: '20px',
          }}
        >
          <div className="font-mono-raw text-[10px] tracking-widest mb-2" style={{ color: '#FF3131' }}>
            {`>> ${index} >> SLIDING IN`}
          </div>
          <div className="font-display text-2xl leading-tight">
            {title}
          </div>
          <div className="font-mono-raw text-[10px] mt-3 opacity-80">
            CHECK THE PANEL ON THE RIGHT.
          </div>
        </div>
      )}
    </section>
  );
}
