'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState, getSceneFromProgress } from '@/lib/scroll-state';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
  onSceneChange?: (scene: number) => void;
};

export function ScrollSetup({ containerRef, onSceneChange }: Props) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          const newScene = getSceneFromProgress(self.progress);
          if (newScene !== scrollState.sceneIndex) {
            scrollState.sceneIndex = newScene;
            onSceneChange?.(newScene);
          }
        },
      });
      return () => {
        st.kill();
      };
    }, containerRef);
    return () => ctx.revert();
  }, [containerRef, onSceneChange]);

  return null;
}
