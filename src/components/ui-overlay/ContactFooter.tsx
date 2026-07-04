'use client';

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative w-full"
      style={{
        background: '#000000',
        color: '#F2F0E9',
        padding: '80px 32px 48px',
        borderTop: '4px solid #FF3131',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="inline-block px-3 py-1 mb-6"
          style={{ background: '#FF3131', border: '2px solid #F2F0E9' }}
        >
          <span className="font-mono-raw text-xs font-bold tracking-widest text-[#F2F0E9]">
            {'>> END_OF_SCROLL'}
          </span>
        </div>
        <h2
          className="font-display leading-[0.85] tracking-tight"
          style={{ fontSize: 'clamp(48px, 12vw, 160px)', marginBottom: '32px' }}
        >
          LET&apos;S<br />
          <span style={{ color: '#FF3131' }}>BUILD</span><br />
          LOUD.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="https://github.com/Neporrex"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 transition-transform duration-75 hover:-translate-x-1 hover:-translate-y-1"
            style={{ background: '#F2F0E9', color: '#000000', border: '3px solid #F2F0E9', boxShadow: '6px 6px 0px 0px #FF3131' }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2">[01] CODE</div>
            <div className="font-display text-2xl leading-none mb-1">GITHUB</div>
            <div className="font-mono-raw text-xs">/Neporrex</div>
          </a>
          <a
            href="https://x.com/neporrex_"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 transition-transform duration-75 hover:-translate-x-1 hover:-translate-y-1"
            style={{ background: '#FF3131', color: '#000000', border: '3px solid #F2F0E9', boxShadow: '6px 6px 0px 0px #F2F0E9' }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2">[02] NOISE</div>
            <div className="font-display text-2xl leading-none mb-1">TWITTER / X</div>
            <div className="font-mono-raw text-xs">@neporrex_</div>
          </a>
          <a
            href="#"
            className="block p-5 transition-transform duration-75 hover:-translate-x-1 hover:-translate-y-1"
            style={{ background: '#0000FF', color: '#F2F0E9', border: '3px solid #F2F0E9', boxShadow: '6px 6px 0px 0px #FF3131' }}
          >
            <div className="font-mono-raw text-[10px] tracking-widest mb-2">[03] CHAT</div>
            <div className="font-display text-2xl leading-none mb-1">DISCORD</div>
            <div className="font-mono-raw text-xs">neporrex_</div>
          </a>
        </div>

        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-6"
          style={{ borderTop: '2px solid #F2F0E9' }}
        >
          <div>
            <div className="font-display text-3xl leading-none mb-1">
              neporrex_<span style={{ color: '#FF3131' }}>.</span>
            </div>
            <div className="font-mono-raw text-xs opacity-70">
              BUILT WITH R3F + GSAP. NO AI EM DASHES WERE USED.
            </div>
          </div>
          <div className="font-mono-raw text-xs opacity-70 md:text-right">
            <div>{`${new Date().getFullYear()} >> ALL RIGHTS RESERVED`}</div>
            <div>SCROLL BACK UP TO REPLAY.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
