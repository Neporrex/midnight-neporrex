'use client';

type Props = {
  progress: number;
};

export function ScrollProgress({ progress }: Props) {
  const pct = Math.max(0, Math.min(100, progress * 100));
  return (
    <div
      className="fixed right-5 top-1/2 z-40 hidden md:block"
      style={{
        transform: 'translateY(-50%)',
        width: '3px',
        height: '50vh',
        background: 'rgba(26, 26, 26, 0.15)',
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: `${pct}%`,
          background: 'linear-gradient(0deg, #2A9D8F 0%, #1D3557 50%, #E76F51 100%)',
          transition: 'height 0.1s linear',
        }}
      />
      <div
        className="absolute right-3 font-mono-raw text-[10px] font-bold"
        style={{
          top: '50%',
          transform: 'translateY(-50%) rotate(0deg)',
          color: '#1A1A1A',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {Math.floor(pct).toString().padStart(2, '0')}%
      </div>
    </div>
  );
}
