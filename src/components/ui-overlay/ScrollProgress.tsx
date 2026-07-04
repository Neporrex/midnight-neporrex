'use client';

type Props = {
  progress: number;
};

export function ScrollProgress({ progress }: Props) {
  const pct = Math.max(0, Math.min(100, progress * 100));
  return (
    <div
      className="fixed right-4 top-1/2 z-40"
      style={{
        transform: 'translateY(-50%)',
        width: '24px',
        height: '60vh',
        background: '#F2F0E9',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px 0px #000000',
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: `${pct}%`,
          background: '#000000',
          transition: 'height 0.1s linear',
        }}
      />
      <div
        className="absolute top-2 left-1/2 font-mono-raw text-[10px] font-bold"
        style={{
          transform: 'translateX(-50%)',
          color: '#000000',
          writingMode: 'vertical-rl',
          letterSpacing: '0.1em',
        }}
      >
        SCROLL {Math.floor(pct).toString().padStart(2, '0')}%
      </div>
    </div>
  );
}
