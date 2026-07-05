'use client';

import { useEffect, useState } from 'react';

const PROJECTS = [
  { name: 'a brutalist portfolio', tag: 'WIP' },
  { name: 'a Roblox boss fight', tag: 'LUA' },
  { name: 'a Python scraper', tag: 'PY' },
  { name: 'a TS websocket thing', tag: 'TS' },
  { name: 'a CSS-only zine', tag: 'CSS' },
];

export function NowBuilding() {
  const [idx, setIdx] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % PROJECTS.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed left-5 z-40 hidden md:block transition-all duration-300"
      style={{
        bottom: hidden ? '-80px' : '20px',
        background: 'rgba(245, 241, 232, 0.7)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        border: '2px solid #1A1A1A',
        padding: '10px 14px',
        boxShadow: '4px 4px 0px 0px #1A1A1A',
        maxWidth: '280px',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="w-1.5 h-1.5"
          style={{ background: '#E76F51' }}
        />
        <span className="font-mono-raw text-[10px] tracking-widest" style={{ color: '#1A1A1A' }}>
          NOW BUILDING
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span
          key={idx}
          className="font-display text-sm animate-rise-fire"
          style={{ color: '#1A1A1A' }}
        >
          {PROJECTS[idx].name}
        </span>
        <span
          className="font-mono-raw text-[9px] font-bold px-1.5 py-0.5"
          style={{
            background: '#1D3557',
            color: '#F5F1E8',
          }}
        >
          {PROJECTS[idx].tag}
        </span>
      </div>
    </div>
  );
}
