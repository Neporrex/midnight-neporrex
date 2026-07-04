'use client';

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 brutalist-border"
      style={{
        borderBottomWidth: '4px',
        background: '#F2F0E9',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: '#000000',
              border: '3px solid #000000',
            }}
          >
            <span
              className="font-display text-2xl leading-none"
              style={{ color: '#FF3131', transform: 'translateY(-2px)' }}
            >
              N
            </span>
          </div>
          <span className="font-mono-raw text-sm tracking-tight">
            neporrex_<span style={{ color: '#FF3131' }}>.</span>dev
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'WORK', href: '#scene-1' },
            { label: 'GRID', href: '#scene-2' },
            { label: 'MANIFESTO', href: '#scene-3' },
            { label: 'CONTACT', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm tracking-tight hover:bg-black hover:text-[#F2F0E9] px-3 py-1 transition-colors duration-75"
              style={{ border: '2px solid #000000' }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1"
          style={{
            background: '#FF3131',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px 0px #000000',
          }}
        >
          <span
            className="w-2 h-2"
            style={{ background: '#000000', borderRadius: 0 }}
          />
          <span className="font-mono-raw text-xs font-bold">ONLINE</span>
        </div>
      </div>
    </nav>
  );
}
