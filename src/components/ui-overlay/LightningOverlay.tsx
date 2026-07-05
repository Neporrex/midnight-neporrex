'use client';

import { useRef, useEffect } from 'react';
import { stormState } from '@/lib/storm-state';

export function LightningOverlay() {
  const flashRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const warmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = Math.min(1, stormState.flashIntensity);
      if (flashRef.current) {
        flashRef.current.style.opacity = String(v);
        flashRef.current.style.background = `rgba(255, 252, 240, ${v * 0.92})`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = String(v);
        glowRef.current.style.background = `radial-gradient(circle at 50% 25%, rgba(255, 252, 240, ${v * 0.6}) 0%, transparent 60%)`;
      }
      if (warmRef.current) {
        warmRef.current.style.opacity = String(v * 0.8);
        warmRef.current.style.background = `radial-gradient(circle at 30% 70%, rgba(231, 111, 81, ${v * 0.35}) 0%, transparent 50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={flashRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'rgba(255, 252, 240, 0)',
          mixBlendMode: 'screen',
          opacity: 0,
        }}
      />
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle at 50% 25%, rgba(255, 252, 240, 0) 0%, transparent 60%)',
          mixBlendMode: 'screen',
          opacity: 0,
        }}
      />
      <div
        ref={warmRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(231, 111, 81, 0) 0%, transparent 50%)',
          mixBlendMode: 'screen',
          opacity: 0,
        }}
      />
    </>
  );
}
