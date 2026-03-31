import React from 'react';
import { Screen, Mono, Btn } from "../UI";
import copy from '../../copy.js';
// ══════════════════════════════════════════════════════════════════════════════
// AVAILABILITY GRID
// ══════════════════════════════════════════════════════════════════════════════
const DAYS  = ["M","T","W","Th","F","Sa","Su"];
const SLOTS = ["Morn","Aftn","Eve","Night"];
const isPremium = (d,s) => ["Sa","Su","F"].includes(d)&&["Eve","Night"].includes(s);

class ObAvail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avail: props.state.avail || {}
    };
  }

  toggle = (d, s) => {
    const k = `${d}-${s}`;
    this.setState((prevState) => ({
      avail: { ...prevState.avail, [k]: !prevState.avail[k] }
    }));
  };

  render() {
    const { avail } = this.state;
    const count = Object.values(avail).filter(Boolean).length;

    return (
      <Screen>
        <div className="fu d1" style={{ marginBottom:22 }}>
          <Mono>{copy.components.onboarding.obAvail.step}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)",margin:"14px 0 6px",lineHeight:1.1 }}>{copy.components.onboarding.obAvail.title}</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",lineHeight:1.6 }}>
            {copy.components.onboarding.obAvail.subtitle}
          </p>
        </div>
        <div className="fu d2" style={{ overflowX:"auto",marginBottom:20 }}>
          <div style={{ display:"grid",gridTemplateColumns:`36px repeat(${DAYS.length},1fr)`,gap:3,minWidth:300 }}>
            <div/>
            {DAYS.map(d=><div key={d} style={{ fontFamily:"var(--mono)",fontSize:7,letterSpacing:"0.08em",color:"var(--mid)",textAlign:"center",paddingBottom:5 }}>{d}</div>)}
            {SLOTS.map(s=>(
              <>
                <div key={s} style={{ fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",display:"flex",alignItems:"center" }}>{s}</div>
                {DAYS.map(d=>{
                  const k=`${d}-${s}`, on=avail[k], prem=isPremium(d,s);
                  return (
                    <div key={k} onClick={()=>this.toggle(d,s)} style={{
                      border:`1px solid ${on?"var(--soft)":"var(--line)"}`,
                      background:on?"var(--bg3)":"transparent",
                      height:34,cursor:"pointer",display:"flex",alignItems:"center",
                      justifyContent:"center",transition:"all .1s",position:"relative"
                    }}>
                      {on&&<div style={{ width:5,height:5,borderRadius:"50%",background:"var(--white)" }}/>}
                      {prem&&!on&&<span style={{ fontSize:7,color:"var(--line2)" }}>★</span>}
                      {prem&&on&&<span style={{ fontSize:6,color:"var(--soft)",position:"absolute",top:2,right:2 }}>★</span>}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
        <div className="fu d3" style={{ borderLeft:"1px solid var(--line)",paddingLeft:12,marginBottom:24 }}>
          <p style={{ fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.08em",color:"var(--mid)",lineHeight:1.9 }}>
            {copy.components.onboarding.obAvail.notes.map(note => <>{note}<br/></>)}
          </p>
        </div>
        <Btn onClick={()=>{ this.props.set({avail}); this.props.go("home"); }} disabled={count<3}>
          {count<3?copy.components.onboarding.obAvail.pickMore.replace('{count}', 3-count).replace('{plural}', 3-count===1?'':'s') : copy.components.onboarding.obAvail.allSet}
        </Btn>
      </Screen>
    );
  }
}

export default ObAvail;