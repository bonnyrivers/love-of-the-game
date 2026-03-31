import React from 'react';
import { Screen, Mono, Btn } from "../UI";

// ══════════════════════════════════════════════════════════════════════════════
// 4. QUICK QUIZ — reworked 5 questions
// ══════════════════════════════════════════════════════════════════════════════
export const QS = [
  // Q1 — OPENER: how you spend time (moved from Q3)
  {
    id:"time", label:"How you spend your time",
    q:"How do you actually spend your free time?",
    hint:"The real version, not the aspirational one.",
    opts:["Moving — walks, hikes, runs, the gym","Good food and good company","Art, music, making things","Quiet nights — books, films, cooking","Spontaneous plans, always moving","Travel whenever I can"],
    multi:true
  },
  // Q2 — INTENT: rewritten options
  {
    id:"intent", label:"What you're looking for",
    q:"What are you open to right now?",
    hint:"Be straight with yourself.",
    opts:["I want a real relationship","Seriously dating — putting in real time","Open to wherever it goes","Just getting back out there"],
    multi:false
  },
  // Q3 — WHAT MATTERS: re-bucketed
  {
    id:"values", label:"What matters in a partner",
    q:"In a partner, what actually matters to you?",
    hint:"Pick everything that genuinely lands.",
    opts:["Emotional availability","Making me laugh","Shared adventures and travel","Physical warmth and affection","Real intellectual depth","Ambition that matches mine","Space and trust without question","Lightness — someone who doesn't take life too seriously"],
    multi:true
  },
  // Q4 — LIGHTER conflict replacement: date energy
  {
    id:"dates", label:"Your date style",
    q:"What kind of dates do you actually want to go on?",
    hint:"Pick all that sound like a good time.",
    opts:["Coffee, walk, see where it goes","Dinner somewhere worth going to","Active — a hike, a game, something physical","A cultural thing — museum, show, market","Drinks and good conversation","Something off the bucket list"],
    multi:true
  },
  // Q5 — LOVE LANGUAGES: give and receive
  {
    id:"love", label:"How you give and receive love",
    q:"How do you best give love — and how do you most need to receive it?",
    hint:"You can pick one for each or the same.",
    type:"double",
    opts:["Words that land precisely","Quality time, fully present","Physical touch and closeness","Acts of care, big and small","Showing up — just being there"],
  },
];

class ObQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      answers: props.state.quickAnswers || {},
      give: null,
      receive: null
    };
  }

  setStep = (s) => this.setState({ step: s });

  setAnswers = (a) => this.setState({ answers: a });

  setGive = (g) => this.setState({ give: g });

  setReceive = (r) => this.setState({ receive: r });

  pick = (opt) => {
    const q = QS[this.state.step];
    if (q.multi) {
      const p = this.state.answers[q.id] || [];
      this.setState({
        answers: {
          ...this.state.answers,
          [q.id]: p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt]
        }
      });
    } else {
      this.setState({
        answers: { ...this.state.answers, [q.id]: opt }
      });
    }
  };

  render() {
    const { step, answers, give, receive } = this.state;
    const q = QS[step];
    const cur = answers[q.id] || (q.multi ? [] : "");
    const progress = (step / QS.length) * 100;
    const canNext = q.type === "double" ? (!!give && !!receive) : q.multi ? (cur.length > 0) : !!cur;

    return (
      <Screen key={step}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"var(--bg3)" }}>
          <div style={{ height:2,background:"var(--white)",width:`${progress}%`,transition:"width .4s ease" }}/>
        </div>
        <div className="fu d1" style={{ paddingTop:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <Mono>{step+1} of {QS.length} — {q.label}</Mono>
          {step>0&&<button onClick={()=>this.setStep(step-1)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em" }}>← back</button>}
        </div>
        <div className="fu d2" style={{ margin:"24px 0 24px" }}>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:26,fontWeight:400,fontStyle:"italic",color:"var(--white)",lineHeight:1.25,marginBottom:7 }}>{q.q}</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:13,color:"var(--dim)",fontStyle:"italic" }}>{q.hint}</p>
        </div>

        {/* Double question — love languages */}
        {q.type==="double" ? (
          <div className="fu d3" style={{ flex:1 }}>
            <Mono style={{ display:"block",marginBottom:12 }}>How I give love</Mono>
            <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:24 }}>
              {q.opts.map(o=>(
                <button key={`g-${o}`} onClick={()=>this.setGive(o)} style={{
                  border:`1px solid ${give===o?"var(--soft)":"var(--line)"}`,
                  background:give===o?"var(--bg2)":"transparent",
                  color:give===o?"var(--white)":"var(--mid)",
                  fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",
                  padding:"13px 16px",cursor:"pointer",transition:"all .14s",textAlign:"left"
                }}>{o}</button>
              ))}
            </div>
            <Mono style={{ display:"block",marginBottom:12 }}>How I need to receive it</Mono>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {q.opts.map(o=>(
                <button key={`r-${o}`} onClick={()=>this.setReceive(o)} style={{
                  border:`1px solid ${receive===o?"var(--soft)":"var(--line)"}`,
                  background:receive===o?"var(--bg2)":"transparent",
                  color:receive===o?"var(--white)":"var(--mid)",
                  fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",
                  padding:"13px 16px",cursor:"pointer",transition:"all .14s",textAlign:"left"
                }}>{o}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fu d3" style={{ display:"flex",flexDirection:"column",gap:9,flex:1 }}>
            {q.opts.map(opt=>{
              const on=q.multi?(cur||[]).includes(opt):cur===opt;
              return (
                <button key={opt} onClick={()=>this.pick(opt)} style={{
                  border:`1px solid ${on?"var(--soft)":"var(--line)"}`,
                  background:on?"var(--bg2)":"transparent",
                  color:on?"var(--white)":"var(--mid)",
                  fontFamily:"var(--serif)",fontSize:17,fontStyle:"italic",
                  padding:"14px 16px",cursor:"pointer",transition:"all .14s",textAlign:"left",lineHeight:1.3
                }}>{opt}</button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop:20 }}>
          <Btn disabled={!canNext} onClick={()=>{
            if(q.type==="double") this.props.set({ loveGive:give, loveReceive:receive });
            this.props.set({quickAnswers:answers});
            step<QS.length-1 ? this.setStep(step+1) : this.props.go("ob-lifestyle");
          }}>{step<QS.length-1?"Next →":"Continue →"}</Btn>
          {q.multi&&<p style={{ fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",textAlign:"center",marginTop:10,letterSpacing:"0.1em" }}>SELECT ALL THAT APPLY</p>}
        </div>
      </Screen>
    );
  }
}

export default ObQuiz;