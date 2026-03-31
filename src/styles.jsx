export const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; background: #070707; }
    :root {
      --bg:#070707; --bg1:#0d0d0d; --bg2:#131313; --bg3:#1a1a1a;
      --line:#1e1e1e; --line2:#2a2a2a;
      --dim:#3a3a3a; --mid:#5a5a5a; --soft:#8a8a8a; --text:#e8e4de; --white:#f4f0ea;
      --serif:'Playfair Display',Georgia,serif;
      --mono:'IBM Plex Mono',monospace;
    }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes pulse   { 0%,100%{opacity:.3} 50%{opacity:1} }
    .fu { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both }
    .fi { animation:fadeIn .35s ease both }
    .d1{animation-delay:.04s} .d2{animation-delay:.1s} .d3{animation-delay:.17s}
    .d4{animation-delay:.24s} .d5{animation-delay:.32s}
    ::-webkit-scrollbar{width:2px}
    ::-webkit-scrollbar-thumb{background:var(--line2)}
    textarea,input{caret-color:var(--white)}
    .grain::after{
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.04;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .bw-photo { filter:grayscale(1) contrast(1.05); }
  `}</style>
);

export default G;