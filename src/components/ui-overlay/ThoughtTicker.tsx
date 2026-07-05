'use client';

import { useEffect, useState } from 'react';

const THOUGHTS = [
  'i think rounded corners are a personality flaw.',
  'css is a programming language and i will fight you on this.',
  'every pixel earns its place. the rest get cut.',
  'lua taught me that tables are everything.',
  'python is for when i am tired and want to ship.',
  'typescript is for when i am awake and want to ship right.',
  'i do not decorate. i declare.',
  'the storm is the page. the page is the storm.',
  'gradients are for people who cannot decide.',
  'my Roblox games are weirder than this site.',
];

export function ThoughtTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % THOUGHTS.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-40 pointer-events-none"
      style={{
        borderTop: '1px solid rgba(26, 26, 26, 0.18)',
        background: 'rgba(245, 241, 232, 0.7)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        padding: '8px 16px',
      }}
    >
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        <span
          className="font-mono-raw text-[9px] font-bold tracking-widest px-1.5 py-0.5"
          style={{
            background: '#1A1A1A',
            color: '#F5F1E8',
            flexShrink: 0,
          }}
        >
          THOUGHT
        </span>
        <div
          key={idx}
          className="font-mono-raw text-[11px] truncate animate-rise-fire"
          style={{ color: '#1A1A1A' }}
        >
          {THOUGHTS[idx]}
        </div>
        <span
          className="font-mono-raw text-[9px] ml-auto"
          style={{ color: '#E76F51', flexShrink: 0 }}
        >
          / neporrex_
        </span>
      </div>
    </div>
  );
}
