// @ts-nocheck
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

    /* Shared onboarding styles */
    .onboarding-h2 {
      font-family: var(--serif);
      font-size: 34px;
      font-style: italic;
      font-weight: 400;
      color: var(--white);
      margin: 14px 0 6px;
      line-height: 1.1;
    }

    .onboarding-h2-small {
      font-family: var(--serif);
      font-size: 26px;
      font-style: italic;
      font-weight: 400;
      color: var(--white);
      line-height: 1.25;
      margin-bottom: 7px;
    }

    /* Global h2 styles */
    h2 {
      font-family: var(--serif);
      font-size: 40px;
      font-style: italic;
      font-weight: 400;
      color: var(--white);
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 1.05;
    }

    .onboarding-p-subtitle {
      font-family: var(--serif);
      font-size: 14px;
      color: var(--mid);
      font-style: italic;
      line-height: 1.6;
    }

    .onboarding-p-subtitle-large {
      font-family: var(--serif);
      font-size: 15px;
      color: var(--mid);
      font-style: italic;
    }

    .onboarding-p-hint {
      font-family: var(--serif);
      font-size: 13px;
      font-style: italic;
      color: var(--dim);
      margin-bottom: 12px;
    }

    .onboarding-p-hint-small {
      font-family: var(--serif);
      font-size: 12px;
      font-style: italic;
      color: var(--dim);
      margin-bottom: 12px;
    }

    .onboarding-main-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .onboarding-main-container.gap-26 { gap: 26px; }
    .onboarding-main-container.gap-28 { gap: 28px; }
    .onboarding-main-container.gap-32 { gap: 32px; }

    /* Shared option button styles */
    .option-button {
      border: 1px solid var(--line);
      background: transparent;
      color: var(--mid);
      font-family: var(--serif);
      font-style: italic;
      padding: 14px 16px;
      cursor: pointer;
      text-align: left;
      transition: all 0.14s;
    }

    .option-button.selected {
      border-color: var(--soft);
      background: var(--bg2);
      color: var(--white);
    }

    .option-button.block {
      display: block;
      width: 100%;
    }

    .option-button.quiz {
      font-size: 16px;
      padding: 13px 16px;
    }

    .option-button.quiz.large {
      font-size: 17px;
      padding: 14px 16px;
      line-height: 1.3;
    }

    /* Shared subtitle styles */
    .subtitle-sm {
      font-family: var(--serif);
      font-size: 14px;
      color: var(--mid);
      font-style: italic;
      line-height: 1.6;
    }

    .subtitle-sm.mb-24 { margin-bottom: 24px; }
    .subtitle-sm.mb-18 { margin-bottom: 18px; }
    .subtitle-sm.mb-6 { margin-bottom: 6px; }

    .subtitle-md {
      font-family: var(--serif);
      font-size: 15px;
      color: var(--mid);
      font-style: italic;
      line-height: 1.7;
    }

    .subtitle-md.mb-30 { margin-bottom: 30px; }

    /* Shared label styles */
    .field-label {
      display: block;
      font-family: var(--mono);
      font-size: 8px;
      color: var(--dim);
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }

    /* Utility spacers */
    .spacer-sm { height: 16px; }
    .spacer-md { height: 20px; }
    .spacer-lg { height: 26px; }
    .spacer-xl { height: 28px; }
  `}</style>
);

export default G;