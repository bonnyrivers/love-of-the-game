import React from 'react';
import { Screen, Mono, Btn } from "./UI";

// ══════════════════════════════════════════════════════════════════════════════
// 11. POST-DATE — simplified to 2 prompts + free write
// ══════════════════════════════════════════════════════════════════════════════
const VIBES = ["✦ Energized","◌ Calm","△ Curious","◎ Seen","▽ Flat","◈ Uncertain","○ Hopeful","◇ Guarded","◑ Amused","⊕ Full"];

class PostDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      vibe: null,
      great: "",
      notso: "",
      free: ""
    };
  }

  setStep = (s) => this.setState({ step: s });

  setVibe = (v) => this.setState({ vibe: v });

  setGreat = (g) => this.setState({ great: g });

  setNotso = (n) => this.setState({ notso: n });

  setFree = (f) => this.setState({ free: f });

  render() {
    const { step, vibe, great, notso, free } = this.state;
    const { go } = this.props;

    const ta = (placeholder, val, setter, rows=3) => (
      <textarea value={val} onChange={e=>setter(e.target.value)} rows={rows} placeholder={placeholder}
        style={{
          width:"100%",background:"var(--bg1)",border:"1px solid var(--line)",
          color:"var(--text)",fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",
          padding:"12px 14px",outline:"none",resize:"none",lineHeight:1.65,
        }}
        onFocus={e=>e.target.style.borderColor="var(--soft)"}
        onBlur={e=>e.target.style.borderColor="var(--line)"}
      />
    );

    if(step===3) return (
      <Screen style={{ justifyContent:"center",textAlign:"center" }}>
        <div className="fu d1">
          <div style={{ fontSize:28,marginBottom:18,color:"var(--dim)" }}>◫</div>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:30,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:10 }}>Filed.</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.7,marginBottom:30 }}>Only you will ever read this.</p>
          <Btn onClick={()=>go("notes")}>Open field notes →</Btn>
          <Btn ghost style={{ marginTop:10 }} onClick={()=>go("home")}>Back to today</Btn>
        </div>
      </Screen>
    );

    return (
      <Screen key={step}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
          <Mono>{step+1} of 3 — Field notes</Mono>
          <button onClick={()=>go("notes")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em" }}>SKIP</button>
        </div>

        {step===0&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:6,lineHeight:1.2 }}>How do you feel<br/>walking away?</h2>
            <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",marginBottom:24 }}>About you. Not them.</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:32 }}>
              {VIBES.map(v=>(
                <button key={v} onClick={()=>this.setVibe(v)} style={{
                  border:`1px solid ${vibe===v?"var(--soft)":"var(--line)"}`,
                  background:vibe===v?"var(--bg2)":"transparent",
                  color:vibe===v?"var(--white)":"var(--mid)",
                  fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.1em",
                  padding:"10px 13px",cursor:"pointer",transition:"all .13s"
                }}>{v}</button>
              ))}
            </div>
            <p style={{ fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em",marginBottom:16 }}>CHOOSE AS MANY AS YOU WANT</p>
            <Btn disabled={!vibe} onClick={()=>this.setStep(1)}>Next →</Btn>
          </div>
        )}

        {step===1&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:28,lineHeight:1.2 }}>Two questions.</h2>
            <Mono style={{ display:"block",marginBottom:10 }}>What was great</Mono>
            {ta("The moment, the feeling, the detail…",great,this.setGreat)}
            <div style={{ height:16 }}/>
            <Mono style={{ display:"block",marginBottom:10 }}>What was not so great</Mono>
            {ta("Honest is useful. This is only for you.",notso,this.setNotso,3)}
            <div style={{ height:20 }}/>
            <Btn onClick={()=>this.setStep(2)}>Next →</Btn>
          </div>
        )}

        {step===2&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:6,lineHeight:1.2 }}>Anything else?</h2>
            <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",marginBottom:18 }}>Stream of consciousness. Or leave it blank.</p>
            {ta("This is just for you…",free,this.setFree,9)}
            <div style={{ height:20 }}/>
            <Btn onClick={()=>this.setStep(3)}>Save to field notes →</Btn>
          </div>
        )}
      </Screen>
    );
  }
}

export default PostDate;