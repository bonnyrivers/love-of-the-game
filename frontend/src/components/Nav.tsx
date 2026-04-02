// @ts-nocheck
import React from 'react';
import { Mono } from "./UI.tsx";
import copy from '../copy.ts';

// ─── NAV ──────────────────────────────────────────────────────────────────────
class Nav extends React.Component {
  render() {
    const { active, go } = this.props;
    return (
      <div style={{
        position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:430,background:"var(--bg1)",
        borderTop:"1px solid var(--line)",display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",zIndex:100,
        paddingBottom:"env(safe-area-inset-bottom,0px)"
      }}>
        {[{id:"home",sym:"◈",label:copy.components.nav.today},{id:"matches",sym:"◎",label:copy.components.nav.matches},{id:"notes",sym:"◫",label:copy.components.nav.fieldNotes},{id:"profile",sym:"◻",label:copy.components.nav.you}].map(({id,sym,label})=>(
          <button key={id} onClick={()=>go(id)} style={{
            background:"transparent",border:"none",cursor:"pointer",
            padding:"14px 0 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:5
          }}>
            <span style={{ fontSize:15,color:active===id?"var(--white)":"var(--dim)",transition:"color .15s" }}>{sym}</span>
            <Mono style={{ fontSize:7,color:active===id?"var(--soft)":"var(--dim)",letterSpacing:"0.1em" }}>{label}</Mono>
          </button>
        ))}
      </div>
    );
  }
}

export default Nav;