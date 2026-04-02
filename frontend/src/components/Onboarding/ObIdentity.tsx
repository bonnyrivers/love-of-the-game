// @ts-nocheck
// ══════════════════════════════════════════════════════════════════════════════
// 3. IDENTITY

import React from 'react';
import { Mono, Screen, Chip, Btn } from "../UI.tsx";
import copy from '../../copy.ts';
import './ObIdentity.css';

// ══════════════════════════════════════════════════════════════════════════════
class ObIdentity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: props.state.gender || null,
      seeking: props.state.seeking || [],
      sign: props.state.sign || null
    };
  }

  setGender = (g) => this.setState({ gender: g });

  toggleSeeking = (s) => this.setState((prevState) => ({
    seeking: prevState.seeking.includes(s)
      ? prevState.seeking.filter(x => x !== s)
      : [...prevState.seeking, s]
  }));

  setSign = (s) => this.setState({ sign: s === this.state.sign ? null : s });

  render() {
    const { gender, seeking, sign } = this.state;
    return (
      <Screen>
        <div className="fu d1" style={{ marginBottom:32 }}>
          <Mono>{copy.components.onboarding.obIdentity.step}</Mono>
          <h2 className="onboarding-h2">{copy.components.onboarding.obIdentity.title}</h2>
        </div>
        <div className="onboarding-main-container gap-28">
          <div className="fu d2">
            <Mono style={{ display:"block",marginBottom:12 }}>{copy.components.onboarding.obIdentity.iAmA}</Mono>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {copy.components.onboarding.obIdentity.genders.map(g=><Chip key={g} label={g} active={gender===g} onClick={()=>this.setGender(g)}/>)}
            </div>
          </div>
          <div className="fu d3">
            <Mono style={{ display:"block",marginBottom:12 }}>{copy.components.onboarding.obIdentity.openTo}</Mono>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {copy.components.onboarding.obIdentity.seeking.map(s=><Chip key={s} label={s} active={seeking.includes(s)} onClick={()=>this.toggleSeeking(s)}/>)}
            </div>
          </div>
          <div className="fu d4">
            <Mono style={{ display:"block",marginBottom:4 }}>{copy.components.onboarding.obIdentity.sunSign}</Mono>
            <p className="onboarding-p-hint-small">{copy.components.onboarding.obIdentity.sunSignHint}</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
              {copy.components.onboarding.obIdentity.zodiacSigns.map(s=><Chip key={s} label={s} active={sign===s} onClick={()=>this.setSign(s)}/>)}
            </div>
          </div>
        </div>
        <div className="fu d5" style={{ marginTop:28 }}>
          <Btn onClick={()=>{ this.props.set({gender,seeking,sign}); this.props.go("ob-quiz"); }} disabled={!gender||!seeking.length}>{copy.components.onboarding.obIdentity.continue}</Btn>
        </div>
      </Screen>
    );
  }
}

export default ObIdentity;