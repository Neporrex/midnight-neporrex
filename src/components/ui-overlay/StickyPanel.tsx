'use client';

type Props = {
  active: boolean;
};

export function StickyPanel({ active }: Props) {
  return (
    <div
      className="sticky-panel"
      style={{
        position: 'fixed',
        top: '50%',
        right: active ? '80px' : '-600px',
        transform: 'translateY(-50%)',
        width: '420px',
        maxWidth: 'calc(100vw - 120px)',
        background: '#F2F0E9',
        border: '4px solid #000000',
        boxShadow: '12px 12px 0px 0px #000000',
        padding: '28px',
        zIndex: 30,
        transition: 'right 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="inline-block px-2 py-1 mb-4"
        style={{ background: '#FF3131', border: '2px solid #000000' }}
      >
        <span className="font-mono-raw text-[11px] font-bold tracking-widest">
          {'>> 03.MANIFESTO'}
        </span>
      </div>
      <h2
        className="font-display leading-[0.95] tracking-tight"
        style={{ fontSize: '44px', marginBottom: '16px' }}
      >
        RAW<br />
        <span style={{ color: '#FF3131' }}>CREATION.</span>
      </h2>
      <p
        className="font-mono-raw text-sm leading-relaxed"
        style={{ marginBottom: '16px' }}
      >
        No gradients. No soft edges. No apologies. Just black ink on broken white, code that hits hard, and shapes that refuse to be subtle. This is a manifesto for people who think rounded corners are a personality flaw.
      </p>
      <p
        className="font-mono-raw text-sm leading-relaxed"
        style={{ marginBottom: '20px' }}
      >
        Every pixel earns its place. Every shadow is a solid block. Every typeface screams. We do not decorate. We declare.
      </p>
      <div className="flex gap-2">
        <div
          className="px-3 py-2"
          style={{ background: '#000000', border: '2px solid #000000' }}
        >
          <span className="font-display text-sm" style={{ color: '#F2F0E9' }}>
            BUILD LOUD
          </span>
        </div>
        <div
          className="px-3 py-2"
          style={{ background: '#F2F0E9', border: '2px solid #000000' }}
        >
          <span className="font-display text-sm">SHIP RAW</span>
        </div>
      </div>
      <div
        className="mt-5 pt-4 flex items-center justify-between"
        style={{ borderTop: '2px solid #000000' }}
      >
        <span className="font-mono-raw text-[10px] tracking-widest">
          SIGNED: neporrex_
        </span>
        <span
          className="font-mono-raw text-[10px] font-bold"
          style={{ color: '#0000FF' }}
        >
          [01/01]
        </span>
      </div>
    </div>
  );
}
