// @ts-nocheck
import React from 'react';
import { Screen, Mono, Btn } from "./UI.tsx";
import copy from '../copy.ts';
import './PostDate.css';

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
      <textarea
        className="postdate-textarea"
        value={val}
        onChange={e => setter(e.target.value)}
        rows={rows}
        placeholder={placeholder}
      />
    );

    if(step===3) return (
      <Screen style={{ justifyContent:"center",textAlign:"center" }}>
        <div className="fu d1">
          <div className="postdate-filed-icon">◫</div>
          <h2 className="postdate-filed-title">{copy.components.postDate.filed.title}</h2>
          <p className="subtitle-md mb-30">{copy.components.postDate.filed.message}</p>
          <Btn onClick={()=>go("notes")}>{copy.components.postDate.filed.openNotes}</Btn>
          <Btn ghost style={{ marginTop:10 }} onClick={()=>go("home")}>{copy.components.postDate.filed.backToday}</Btn>
        </div>
      </Screen>
    );

    return (
      <Screen key={step}>
        <div className="postdate-header">
          <Mono>{copy.components.postDate.header.replace('{step+1}', step+1)}</Mono>
          <button
            onClick={() => go("notes")}
            className="postdate-skip-btn"
          >
            {copy.components.postDate.skip}
          </button>
        </div>

        {step===0&&(
          <div className="fu d1">
            <h2 className="postdate-step1-title">{copy.components.postDate.step1.title}</h2>
            <p className="subtitle-sm mb-24">{copy.components.postDate.step1.subtitle}</p>
            <div className="postdate-vibes-container">
              {VIBES.map(v=>(
                <button
                  key={v}
                  onClick={() => this.setVibe(v)}
                  className={`postdate-vibe-btn${vibe===v ? ' active' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <p className="field-label">{copy.components.postDate.step1.instruction}</p>
            <Btn disabled={!vibe} onClick={()=>this.setStep(1)}>{copy.components.postDate.next}</Btn>
          </div>
        )}

        {step===1&&(
          <div className="fu d1">
            <h2 className="postdate-step1-title">{copy.components.postDate.step2.title}</h2>
            <Mono className="field-label">{copy.components.postDate.step2.greatLabel}</Mono>
            {ta(copy.components.postDate.step2.greatPlaceholder,great,this.setGreat)}
            <div className="spacer-sm"/>
            <Mono className="field-label">{copy.components.postDate.step2.notGreatLabel}</Mono>
            {ta(copy.components.postDate.step2.notGreatPlaceholder,notso,this.setNotso,3)}
            <div className="spacer-md"/>
            <Btn onClick={()=>this.setStep(2)}>{copy.components.postDate.next}</Btn>
          </div>
        )}

        {step===2&&(
          <div className="fu d1">
            <h2 className="postdate-step1-title">{copy.components.postDate.step3.title}</h2>
            <p className="subtitle-sm mb-18">{copy.components.postDate.step3.subtitle}</p>
            {ta(copy.components.postDate.step3.placeholder,free,this.setFree,9)}
            <div className="spacer-md"/>
            <Btn onClick={()=>this.setStep(3)}>{copy.components.postDate.save}</Btn>
          </div>
        )}
      </Screen>
    );
  }
}

export default PostDate;