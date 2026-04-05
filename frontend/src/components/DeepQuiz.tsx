// @ts-nocheck
import React from 'react';
import { Screen, Mono, Rule, Btn } from "./UI";

// ══════════════════════════════════════════════════════════════════════════════
// 15. DEEP QUIZ — Likert scale + multi select + free response option
// ══════════════════════════════════════════════════════════════════════════════
const DEEP_QS = [
  {
    q:"What is your relationship with alone time?",
    type:"likert",
    scale:["Not at all","A little","Half the time","Quite a lot","Always"],
    context:"I need time alone to recharge."
  },
  {
    q:"How do you know when you actually like someone?",
    type:"multi",
    opts:["I feel it immediately, in my body","I can't stop thinking about them","It dawns on me slowly","When being around them just feels easy","I don't — I convince myself I do"],
  },
  {
    q:"What does intimacy actually mean to you?",
    type:"multi",
    opts:["Being fully known, flaws included","Physical closeness and presence","Laughing until it hurts","Sitting in silence without needing to fill it","Showing up when it's inconvenient"],
  },
  {
    q:"How do you tend to handle disagreement?",
    type:"multi",
    opts:["I say something right away","I need time to process first","I write it out before I can speak it","I go quiet and need space","It depends entirely on the person"],
  },
  {
    q:"What scares you most about dating right now?",
    type:"multi",
    opts:["Wasting time on the wrong person","Getting hurt again","Not being chosen","Being misread or misunderstood","Honestly — nothing. I'm ready."],
  },
];

class DeepQuiz extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      ans: {},
      typed: ""
    };
  }

  setStep = (s) => this.setState({ step: s });

  setAns = (a) => this.setState({ ans: a });

  setTyped = (t) => this.setState({ typed: t });

  toggleMulti = (opt) => {
    const prev = this.state.ans[this.state.step] || [];
    this.setState({
      ans: {
        ...this.state.ans,
        [this.state.step]: prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
      }
    });
  };

  render() {
    const { step, ans, typed } = this.state;
    const q = DEEP_QS[step % DEEP_QS.length];
    const progress = (step / 20) * 100;
    const cur = ans[step];
    const canNext = q.type === "likert" ? cur !== undefined : Array.isArray(cur) && cur.length > 0;

    return (
      <Screen key={step}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"var(--bg3)" }}>
          <div style={{ height:2,background:"var(--white)",width:`${progress}%`,transition:"width .4s ease" }}/>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,marginBottom:28 }}>
          <Mono>{step+1} of 20 — Deep profile</Mono>
          <button onClick={()=>this.props.go("profile")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em" }}>SAVE & EXIT</button>
        </div>
        <h2 style={{ fontFamily:"var(--serif)",fontSize:25,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1.3,marginBottom:28,flex:0 }}>{q.q}</h2>

        {q.type==="likert"&&(
          <div className="fu d2" style={{ flex:1 }}>
            {q.context&&<p style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--dim)",marginBottom:20 }}>{q.context}</p>}
            <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
              {q.scale.map((l,i)=>(
                <button key={i} onClick={()=>this.setAns({...this.state.ans,[this.state.step]:i})} style={{
                  border:`1px solid ${cur===i?"var(--soft)":"var(--line)"}`,
                  background:cur===i?"var(--bg2)":"transparent",
                  color:cur===i?"var(--white)":"var(--mid)",
                  fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",
                  padding:"14px 16px",cursor:"pointer",transition:"all .14s",
                  textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"
                }}>
                  <span>{l}</span>
                  <span style={{ fontFamily:"var(--mono)",fontSize:8,color:cur===i?"var(--soft)":"var(--dim)" }}>{["◯","◔","◑","◕","●"][i]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {q.type==="multi"&&(
          <div className="fu d2" style={{ flex:1 }}>
            <div style={{ display:"flex",flexDirection:"column",gap:9,marginBottom:18 }}>
              {q.opts.map((o,i)=>{
                const on=(this.state.ans[this.state.step]||[]).includes(o);
                return (
                  <button key={i} onClick={()=>this.toggleMulti(o)} style={{
                    border:`1px solid ${on?"var(--soft)":"var(--line)"}`,
                    background:on?"var(--bg2)":"transparent",
                    color:on?"var(--white)":"var(--mid)",
                    fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",
                    padding:"14px 16px",cursor:"pointer",transition:"all .14s",textAlign:"left",lineHeight:1.3
                  }}>{o}</button>
                );
              })}
            </div>
            {/* Optional free-type */}
            <div style={{ borderTop:"1px solid var(--line)",paddingTop:14 }}>
              <Mono style={{ display:"block",marginBottom:8,fontSize:7 }}>Or type your own</Mono>
              <input value={typed} onChange={(e)=>this.setTyped(e.target.value)} placeholder="Something else…"
                style={{ width:"100%",background:"transparent",border:"none",borderBottom:"1px solid var(--line2)",color:"var(--text)",fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",padding:"8px 0",outline:"none" }}
                onFocus={(e)=>e.target.style.borderBottomColor="var(--soft)"}
                onBlur={(e)=>e.target.style.borderBottomColor="var(--line2)"}
              />
            </div>
            <p style={{ fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",marginTop:10,letterSpacing:"0.08em" }}>SELECT ALL THAT APPLY</p>
          </div>
        )}

        <div style={{ marginTop:20 }}>
          <Btn disabled={!canNext} onClick={()=>{ this.setTyped(""); this.state.step<19?this.setStep(this.state.step+1):this.props.go("profile"); }}>
            {this.state.step<19?"Next →":"Complete →"}
          </Btn>
        </div>
      </Screen>
    );
  }
}

export default DeepQuiz;