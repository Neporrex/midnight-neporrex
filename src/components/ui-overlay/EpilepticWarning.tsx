'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'midnight-neporrex-warning-accepted-v1';

function readAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function EpilepticWarning() {
  const [accepted, setAccepted] = useState<boolean>(() => readAccepted());

  useEffect(() => {
    if (accepted) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.height = '100vh';
      document.body.style.width = '100%';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, [accepted]);

  const enter = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setAccepted(true);
  };

  const leave = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.google.com';
    }
  };

  if (accepted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 retro-grain"
      style={{
        background: '#1A1A1A',
        color: '#F5F1E8',
      }}
    >
      <div
        className="relative max-w-2xl w-full"
        style={{
          background: 'rgba(245, 241, 232, 0.06)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '2px solid #F5F1E8',
          boxShadow: '12px 12px 0px 0px #E76F51',
          padding: '40px 32px 32px',
        }}
      >
        <div
          className="inline-block px-2.5 py-1 mb-5"
          style={{
            background: '#E76F51',
            border: '2px solid #F5F1E8',
          }}
        >
          <span className="font-mono-raw text-[10px] font-bold tracking-widest text-[#1A1A1A]">
            00 / WARNING
          </span>
        </div>

        <h1
          className="font-display leading-[0.95] tracking-tight mb-5"
          style={{ fontSize: 'clamp(36px, 5.5vw, 64px)' }}
        >
          FLASHING LIGHTS<br />
          <span style={{ color: '#E76F51' }}>&amp; STORMS</span> AHEAD.
        </h1>

        <p
          className="font-mono-raw text-sm leading-relaxed mb-4"
          style={{ color: '#F5F1E8', opacity: 0.92 }}
        >
          This site contains lightning flashes, rapid light changes, and storm effects that may trigger seizures in people with photosensitive epilepsy. The flashes are most intense during the second scene (the storm).
        </p>

        <p
          className="font-mono-raw text-xs leading-relaxed mb-7"
          style={{ color: '#F5F1E8', opacity: 0.7 }}
        >
          If you are sensitive to flashing lights, please leave. If you are not sure, scroll slowly. There is no shame in closing the tab.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={enter}
            className="font-display text-sm px-5 py-3 transition-transform duration-100 hover:-translate-x-1 hover:-translate-y-1"
            style={{
              background: '#E76F51',
              color: '#1A1A1A',
              border: '2px solid #F5F1E8',
              boxShadow: '6px 6px 0px 0px #F5F1E8',
            }}
          >
            I UNDERSTAND, ENTER
          </button>
          <button
            onClick={leave}
            className="font-mono-raw text-xs px-5 py-3 transition-colors duration-100"
            style={{
              background: 'transparent',
              color: '#F5F1E8',
              border: '2px solid #F5F1E8',
            }}
          >
            LEAVE THE SITE
          </button>
        </div>

        <div
          className="mt-7 pt-4 flex items-center justify-between"
          style={{ borderTop: '1px dashed rgba(245, 241, 232, 0.4)' }}
        >
          <span className="font-mono-raw text-[10px] tracking-widest opacity-60">
            signed / neporrex_
          </span>
          <span className="font-mono-raw text-[10px] tracking-widest opacity-60">
            stay safe out there.
          </span>
        </div>
      </div>
    </div>
  );
}
