'use client';

type Props = {
  active: boolean;
};

export function StickyPanel({ active }: Props) {
  return (
    <div
      id="manifesto"
      style={{
        position: 'fixed',
        top: '50%',
        right: active ? '40px' : '-700px',
        transform: 'translateY(-50%)',
        width: '420px',
        maxWidth: 'calc(100vw - 60px)',
        padding: '32px',
        zIndex: 30,
        transition: 'right 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(245, 241, 232, 0.55)',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        border: '2px solid #1A1A1A',
        boxShadow: '10px 10px 0px 0px #1A1A1A',
      }}
    >
      <div
        className="inline-block px-2.5 py-1 mb-4"
        style={{
          background: '#E76F51',
          border: '2px solid #1A1A1A',
        }}
      >
        <span className="font-mono-raw text-[10px] font-bold tracking-widest">
          03 / MANIFESTO
        </span>
      </div>
      <h2
        className="font-display leading-[0.95] tracking-tight"
        style={{ fontSize: '48px', marginBottom: '14px' }}
      >
        RAW<br />
        <span className="doodle-underline" style={{ color: '#E76F51' }}>CREATION.</span>
      </h2>
      <p
        className="font-mono-raw text-xs leading-relaxed"
        style={{ marginBottom: '14px', color: '#1A1A1A' }}
      >
        No gradients. No soft edges. No apologies. Just ink on bone, code that hits hard, and shapes that refuse to be subtle.
      </p>
      <p
        className="font-mono-raw text-xs leading-relaxed"
        style={{ marginBottom: '18px', color: '#1A1A1A' }}
      >
        Every pixel earns its place. Every shadow is a solid block. Every typeface screams.
      </p>
      <div className="flex gap-2 flex-wrap">
        <div
          className="px-3 py-2"
          style={{ background: '#1A1A1A', border: '2px solid #1A1A1A' }}
        >
          <span className="font-display text-xs" style={{ color: '#F5F1E8' }}>
            BUILD LOUD
          </span>
        </div>
        <div
          className="px-3 py-2"
          style={{ background: 'transparent', border: '2px solid #1A1A1A' }}
        >
          <span className="font-display text-xs">SHIP RAW</span>
        </div>
        <div
          className="px-3 py-2"
          style={{ background: '#2A9D8F', border: '2px solid #1A1A1A' }}
        >
          <span className="font-display text-xs">STAY WEIRD</span>
        </div>
      </div>
      <div
        className="mt-5 pt-4 flex items-center justify-between"
        style={{ borderTop: '1px dashed #1A1A1A' }}
      >
        <span className="font-mono-raw text-[10px] tracking-widest">
          signed / neporrex_
        </span>
        <span
          className="font-mono-raw text-[10px] font-bold"
          style={{ color: '#1D3557' }}
        >
          01 / 01
        </span>
      </div>
    </div>
  );
}
