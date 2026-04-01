import React from 'react';
import { Screen, Mono, Btn } from "./UI.jsx";
import copy from '../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
// 11. POST-DATE — simplified to 2 prompts + free write
// ══════════════════════════════════════════════════════════════════════════════
const VIBES = copy.components.postDate.step1.vibes;

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
          <h2 style={{ fontFamily:"var(--serif)",fontSize:30,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:10 }}>{copy.components.postDate.filed.title}</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.7,marginBottom:30 }}>{copy.components.postDate.filed.message}</p>
          <Btn onClick={()=>go("notes")}>{copy.components.postDate.filed.openNotes}</Btn>
          <Btn ghost style={{ marginTop:10 }} onClick={()=>go("home")}>{copy.components.postDate.filed.backToday}</Btn>
        </div>
      </Screen>
    );

    return (
      <Screen key={step}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
          <Mono>{copy.components.postDate.header.replace('{step+1}', step+1)}</Mono>
          <button onClick={()=>go("notes")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em" }}>{copy.components.postDate.skip}</button>
        </div>

        {step===0&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:6,lineHeight:1.2 }}>{copy.components.postDate.step1.title}</h2>
            <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",marginBottom:24 }}>{copy.components.postDate.step1.subtitle}</p>
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
            <p style={{ fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em",marginBottom:16 }}>{copy.components.postDate.step1.instruction}</p>
            <Btn disabled={!vibe} onClick={()=>this.setStep(1)}>{copy.components.postDate.next}</Btn>
          </div>
        )}

        {step===1&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:28,lineHeight:1.2 }}>{copy.components.postDate.step2.title}</h2>
            <Mono style={{ display:"block",marginBottom:10 }}>{copy.components.postDate.step2.greatLabel}</Mono>
            {ta(copy.components.postDate.step2.greatPlaceholder,great,this.setGreat)}
            <div style={{ height:16 }}/>
            <Mono style={{ display:"block",marginBottom:10 }}>{copy.components.postDate.step2.notGreatLabel}</Mono>
            {ta(copy.components.postDate.step2.notGreatPlaceholder,notso,this.setNotso,3)}
            <div style={{ height:20 }}/>
            <Btn onClick={()=>this.setStep(2)}>{copy.components.postDate.next}</Btn>
          </div>
        )}

        {step===2&&(
          <div className="fu d1">
            <h2 style={{ fontFamily:"var(--serif)",fontSize:28,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginBottom:6,lineHeight:1.2 }}>{copy.components.postDate.step3.title}</h2>
            <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",marginBottom:18 }}>{copy.components.postDate.step3.subtitle}</p>
            {ta(copy.components.postDate.step3.placeholder,free,this.setFree,9)}
            <div style={{ height:20 }}/>
            <Btn onClick={()=>this.setStep(3)}>{copy.components.postDate.save}</Btn>
          </div>
        )}
      </Screen>
    );
  }
}

export default PostDate;