'use client';

const SKILLS = [
  { name: 'HTML', color: '#E76F51' },
  { name: 'CSS', color: '#1D3557' },
  { name: 'JS', color: '#F4A261' },
  { name: 'ROBLOX LUA', color: '#2A9D8F' },
  { name: 'PYTHON', color: '#E63946' },
  { name: 'NODE', color: '#1A1A1A' },
  { name: 'TYPESCRIPT', color: '#1D3557' },
];

const MAIN = ['HTML', 'CSS', 'LUA', 'PYTHON', 'TYPESCRIPT'];

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative w-full retro-grain"
      style={{
        background: '#1A1A1A',
        color: '#F5F1E8',
        padding: '96px 32px 56px',
        borderTop: '4px solid #E76F51',
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className="inline-block px-3 py-1 mb-8"
          style={{ background: '#E76F51', border: '2px solid #F5F1E8' }}
        >
          <span className="font-mono-raw text-[11px] font-bold tracking-widest text-[#F5F1E8]">
            END / SCROLL
          </span>
        </div>

        <h2
          className="font-display leading-[0.85] tracking-tight mb-4"
          style={{ fontSize: 'clamp(56px, 12vw, 168px)' }}
        >
          LET&apos;S<br />
          <span style={{ color: '#E76F51' }}>BUILD</span><br />
          LOUD.
        </h2>

        <p
          className="font-mono-raw text-sm max-w-2xl mb-12"
          style={{ color: '#F5F1E8', opacity: 0.85, lineHeight: 1.6 }}
        >
          Hi, I&apos;m <span style={{ color: '#F4A261', fontWeight: 'bold' }}>neporrex_</span>. I&apos;m a HTML / CSS / JS / Roblox Lua / Python / Node / TypeScript developer. My main experience lives in HTML, CSS, Lua, Python and TypeScript. I build loud interfaces, raw backends, and weird experiments in between.
        </p>

        <div className="mb-12">
          <div className="font-mono-raw text-[10px] tracking-widest mb-3" style={{ color: '#F4A261' }}>
            STACK /
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {SKILLS.map((s) => {
              const isMain = MAIN.includes(s.name === 'ROBLOX LUA' ? 'LUA' : s.name);
              return (
                <span
                  key={s.name}
                  className="font-display text-xs px-3 py-2"
                  style={{
                    background: isMain ? s.color : 'transparent',
                    color: isMain ? '#F5F1E8' : s.color,
                    border: `2px solid ${s.color}`,
                  }}
                >
                  {s.name}
                  {isMain && <span style={{ marginLeft: 6, opacity: 0.7 }}>*</span>}
                </span>
              );
            })}
          </div>
          <div className="font-mono-raw text-[10px]" style={{ color: '#F5F1E8', opacity: 0.55 }}>
            * main experience
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <a
            href="https://github.com/Neporrex"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 transition-transform duration-100 hover:-translate-x-1 hover:-translate-y-1"
            style={{
              background: '#F5F1E8',
              color: '#1A1A1A',
              border: '2px solid #F5F1E8',
              boxShadow: '6px 6px 0px 0px #E76F51',
            }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2">01 / CODE</div>
            <div className="font-display text-xl leading-none mb-1">GITHUB</div>
            <div className="font-mono-raw text-xs opacity-70">/Neporrex</div>
          </a>
          <a
            href="https://x.com/neporrex_"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 transition-transform duration-100 hover:-translate-x-1 hover:-translate-y-1"
            style={{
              background: '#E76F51',
              color: '#1A1A1A',
              border: '2px solid #F5F1E8',
              boxShadow: '6px 6px 0px 0px #F5F1E8',
            }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2">02 / NOISE</div>
            <div className="font-display text-xl leading-none mb-1">TWITTER / X</div>
            <div className="font-mono-raw text-xs opacity-80">@neporrex_</div>
          </a>
          <a
            href="#"
            className="block p-5 transition-transform duration-100 hover:-translate-x-1 hover:-translate-y-1"
            style={{
              background: '#1D3557',
              color: '#F5F1E8',
              border: '2px solid #F5F1E8',
              boxShadow: '6px 6px 0px 0px #2A9D8F',
            }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2" style={{ color: '#F4A261' }}>03 / CHAT</div>
            <div className="font-display text-xl leading-none mb-1">DISCORD</div>
            <div className="font-mono-raw text-xs opacity-80">neporrex_</div>
          </a>
        </div>

        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-6"
          style={{ borderTop: '1px dashed #F5F1E8' }}
        >
          <div>
            <div className="font-display text-3xl leading-none mb-1">
              neporrex_<span style={{ color: '#E76F51' }}>.</span>
            </div>
            <div className="font-mono-raw text-[10px] opacity-60">
              built with r3f + gsap. storm included.
            </div>
          </div>
          <div className="font-mono-raw text-[10px] opacity-60 md:text-right">
            <div>{new Date().getFullYear()} / all rights reserved</div>
            <div>scroll back up to replay the storm.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
