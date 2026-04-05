// @ts-nocheck
import React from 'react';
import { Screen, Mono, Btn } from "../UI.tsx";
import copy from '../../copy.ts';
import './ObQuiz.css';

// ══════════════════════════════════════════════════════════════════════════════
// 4. QUICK QUIZ — reworked 5 questions
// ══════════════════════════════════════════════════════════════════════════════
export const QS = [
  // Q1 — OPENER: how you spend time (moved from Q3)
  {
    id:"time", label:copy.components.onboarding.obQuiz.q1.label,
    q:copy.components.onboarding.obQuiz.q1.question,
    hint:copy.components.onboarding.obQuiz.q1.hint,
    opts:copy.components.onboarding.obQuiz.q1.options,
    multi:true
  },
  // Q2 — INTENT: rewritten options
  {
    id:"intent", label:copy.components.onboarding.obQuiz.q2.label,
    q:copy.components.onboarding.obQuiz.q2.question,
    hint:copy.components.onboarding.obQuiz.q2.hint,
    opts:copy.components.onboarding.obQuiz.q2.options,
    multi:false
  },
  // Q3 — WHAT MATTERS: re-bucketed
  {
    id:"values", label:copy.components.onboarding.obQuiz.q3.label,
    q:copy.components.onboarding.obQuiz.q3.question,
    hint:copy.components.onboarding.obQuiz.q3.hint,
    opts:copy.components.onboarding.obQuiz.q3.options,
    multi:true
  },
  // Q4 — LIGHTER conflict replacement: date energy
  {
    id:"dates", label:copy.components.onboarding.obQuiz.q4.label,
    q:copy.components.onboarding.obQuiz.q4.question,
    hint:copy.components.onboarding.obQuiz.q4.hint,
    opts:copy.components.onboarding.obQuiz.q4.options,
    multi:true
  },
  // Q5 — LOVE LANGUAGES: give and receive
  {
    id:"love", label:copy.components.onboarding.obQuiz.q5.label,
    q:copy.components.onboarding.obQuiz.q5.question,
    hint:copy.components.onboarding.obQuiz.q5.hint,
    type:"double",
    opts:copy.components.onboarding.obQuiz.q5.options,
  },
];

class ObQuiz extends React.Component<any> {
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
          {step>0&&<button onClick={()=>this.setStep(step-1)} className="ob-quiz-btn-back">{copy.components.onboarding.obQuiz.back}</button>}
        </div>
        <div className="fu d2" style={{ margin:"24px 0 24px" }}>
          <h2 className="onboarding-h2-small">{q.q}</h2>
          <p className="onboarding-p-hint">{q.hint}</p>
        </div>

        {/* Double question — love languages */}
        {q.type==="double" ? (
          <div className="fu d3" style={{ flex:1 }}>
            <Mono style={{ display:"block",marginBottom:12 }}>{copy.components.onboarding.obQuiz.q5.giveLabel}</Mono>
            <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:24 }}>
              {q.opts.map(o=>(
                <button key={`g-${o}`} onClick={()=>this.setGive(o)} className={`option-button quiz ${give===o ? 'selected' : ''}`}>{o}</button>
              ))}
            </div>
            <Mono style={{ display:"block",marginBottom:12 }}>{copy.components.onboarding.obQuiz.q5.receiveLabel}</Mono>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {q.opts.map(o=>(
                <button key={`r-${o}`} onClick={()=>this.setReceive(o)} className={`option-button quiz ${receive===o ? 'selected' : ''}`}>{o}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fu d3" style={{ display:"flex",flexDirection:"column",gap:9,flex:1 }}>
            {q.opts.map(opt=>{
              const on=q.multi?(cur||[]).includes(opt):cur===opt;
              return (
                <button key={opt} onClick={()=>this.pick(opt)} className={`option-button quiz large ${on ? 'selected' : ''}`}>{opt}</button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop:20 }}>
          <Btn disabled={!canNext} onClick={()=>{
            if(q.type==="double") this.props.set({ loveGive:give, loveReceive:receive });
            this.props.set({quickAnswers:answers});
            step<QS.length-1 ? this.setStep(step+1) : this.props.go("ob-lifestyle");
          }}>{step<QS.length-1?copy.components.onboarding.obQuiz.next:copy.components.onboarding.obQuiz.continue}</Btn>
          {q.multi&&<p className="ob-quiz-p-select">{copy.components.onboarding.obQuiz.selectAll}</p>}
        </div>
      </Screen>
    );
  }
}

export default ObQuiz;