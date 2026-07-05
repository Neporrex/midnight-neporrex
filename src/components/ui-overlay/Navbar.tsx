'use client';

import { useEffect, useState } from 'react';

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 40);
          if (y > lastY && y > 200) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        borderBottom: '2px solid #1A1A1A',
        background: 'rgba(245, 241, 232, 0.7)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3 group">
          <div
            className="flex items-center justify-center transition-transform duration-200 group-hover:rotate-[-8deg]"
            style={{
              width: 32,
              height: 32,
              background: '#1A1A1A',
            }}
          >
            <span
              className="font-display text-xl leading-none"
              style={{ color: '#E76F51', transform: 'translateY(-2px)' }}
            >
              N
            </span>
          </div>
          <span className="font-mono-raw text-sm tracking-tight">
            neporrex_<span style={{ color: '#E76F51' }}>.</span>dev
          </span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: 'WORK', href: '#top' },
            { label: 'STORM', href: '#storm' },
            { label: 'MANIFESTO', href: '#manifesto' },
            { label: 'CONTACT', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-raw text-xs tracking-wider px-3 py-1.5 transition-all duration-150 hover:bg-[#1A1A1A] hover:text-[#F5F1E8]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <a
            href="#contact"
            className="font-mono-raw text-xs tracking-wider px-2 py-1"
            style={{ border: '2px solid #1A1A1A' }}
          >
            MENU
          </a>
        </div>
      </div>
      <div
        className="h-[2px] w-full origin-left transition-transform duration-500"
        style={{
          background: '#E76F51',
          transform: scrolled ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </nav>
  );
}
