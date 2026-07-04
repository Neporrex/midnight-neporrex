'use client';

type Props = {
  scene: number;
};

const SCENE_NAMES = [
  'TITLE',
  'GRID',
  'MANIFESTO',
  'DROP',
];

export function SceneIndicator({ scene }: Props) {
  const current = Math.max(0, Math.min(3, scene));
  const total = 4;
  const name = SCENE_NAMES[current] || 'UNKNOWN';
  return (
    <div
      className="fixed bottom-6 left-6 z-40 px-4 py-3"
      style={{
        background: '#F2F0E9',
        border: '4px solid #000000',
        boxShadow: '6px 6px 0px 0px #000000',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="font-mono-raw text-[10px] font-bold tracking-widest"
          style={{ color: '#FF3131' }}
        >
          [SCENE]
        </span>
        <span className="font-mono-raw text-[10px] font-bold">
          {String(current + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </div>
      <div className="font-display text-xl leading-none tracking-tight">
        {name}
      </div>
      <div className="flex gap-1 mt-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 6,
              background: i === current ? '#000000' : 'transparent',
              border: '2px solid #000000',
            }}
          />
        ))}
      </div>
    </div>
  );
}
