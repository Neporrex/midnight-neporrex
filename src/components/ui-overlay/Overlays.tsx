'use client';

export function RetroOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[45]"
      aria-hidden
      style={{
        background:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(26, 26, 26, 0.045) 2px, rgba(26, 26, 26, 0.045) 3px)',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[46]"
      aria-hidden
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1, 0 0 0 0 0.1, 0 0 0 0 0.1, 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        opacity: 0.5,
        mixBlendMode: 'multiply',
      }}
    />
  );
}
