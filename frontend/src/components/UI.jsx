// ─── UI ───────────────────────────────────────────────────────────────
export const Mono = ({ children, style = {}, className = "" }) => (
  <p className={className} style={{ fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--mid)",...style }}>{children}</p>
);
export const Rule = ({ style = {}, className = "" }) => <div className={className} style={{ height:1,background:"var(--line)",...style }}/>;

export const Btn = ({ children, onClick, ghost=false, disabled=false, style = {}, className = "" }) => (
  <button className={className} disabled={disabled} onClick={onClick} style={{
    display:"block",width:"100%",fontFamily:"var(--mono)",fontSize:10,
    letterSpacing:"0.16em",textTransform:"uppercase",padding:"14px 24px",
    border:`1px solid ${ghost?"var(--line2)":disabled?"var(--dim)":"var(--text)"}`,
    background:"transparent",
    color:ghost?"var(--mid)":disabled?"var(--dim)":"var(--text)",
    cursor:disabled?"default":"pointer",transition:"all .15s",...style
  }}
    onMouseEnter={e=>{ if(!disabled&&!ghost){e.currentTarget.style.background="var(--text)";e.currentTarget.style.color="var(--bg)"}}}
    onMouseLeave={e=>{ if(!disabled&&!ghost){e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--text)"}}}
  >{children}</button>
);

export const Chip = ({ label, active, onClick, style = {}, className = "" }) => (
  <button className={className} onClick={onClick} style={{
    border:`1px solid ${active?"var(--soft)":"var(--line)"}`,
    background:active?"var(--bg2)":"transparent",
    color:active?"var(--white)":"var(--mid)",
    fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.1em",textTransform:"uppercase",
    padding:"9px 13px",cursor:"pointer",transition:"all .14s",...style
  }}>{label}</button>
);

export const Screen = ({ children, style = {}, className = "" }) => (
  <div className={className} style={{
    width:"100%",maxWidth:430,minHeight:"100dvh",margin:"0 auto",
    display:"flex",flexDirection:"column",padding:"56px 24px 44px",
    overflowY:"auto",overflowX:"hidden",position:"relative",...style
  }}>{children}</div>
);