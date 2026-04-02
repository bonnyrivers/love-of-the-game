// @ts-nocheck
import React from 'react';
import { Screen, Mono, Btn } from "../UI.tsx";
import copy from '../../copy.ts';
import { upsertOnboardingProfile } from "../../services/profileApi.ts";
import './ObAvail.css';
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

  handleComplete = async () => {
    const { avail } = this.state;
    this.props.set({ avail });

    try {
      await upsertOnboardingProfile(this.props.state, avail);
    } catch (error) {
      console.error("Failed to save onboarding profile:", error);
    }

    this.props.go("home");
  };

  render() {
    const { avail } = this.state;
    const count = Object.values(avail).filter(Boolean).length;

    return (
      <Screen>
        <div className="fu d1" style={{ marginBottom:22 }}>
          <Mono>{copy.components.onboarding.obAvail.step}</Mono>
          <h2 className="onboarding-h2">{copy.components.onboarding.obAvail.title}</h2>
          <p className="onboarding-p-subtitle">
            {copy.components.onboarding.obAvail.subtitle}
          </p>
        </div>
        <div className="fu d2" style={{ overflowX:"auto",marginBottom:20 }}>
          <div style={{ display:"grid",gridTemplateColumns:`36px repeat(${DAYS.length},1fr)`,gap:3,minWidth:300 }}>
            <div/>
            {DAYS.map(d=><div key={d} className="ob-avail-day-header">{d}</div>)}
            {SLOTS.map(s=>(
              <>
                <div key={s} className="ob-avail-slot-label">{s}</div>
                {DAYS.map(d=>{
                  const k=`${d}-${s}`, on=avail[k], prem=isPremium(d,s);
                  return (
                    <div key={k} onClick={()=>this.toggle(d,s)} className={`ob-avail-grid-cell ${on ? 'selected' : ''}`}>
                      {on&&<div className="ob-avail-dot"/>}
                      {prem&&!on&&<span className="ob-avail-star-unselected">★</span>}
                      {prem&&on&&<span className="ob-avail-star-selected">★</span>}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
        <div className="fu d3" style={{ borderLeft:"1px solid var(--line)",paddingLeft:12,marginBottom:24 }}>
          <p className="ob-avail-p-notes">
            {copy.components.onboarding.obAvail.notes.map(note => <>{note}<br/></>)}
          </p>
        </div>
        <Btn onClick={this.handleComplete} disabled={count<3}>
          {count<3?copy.components.onboarding.obAvail.pickMore.replace('{count}', 3-count).replace('{plural}', 3-count===1?'':'s') : copy.components.onboarding.obAvail.allSet}
        </Btn>
      </Screen>
    );
  }
}

export default ObAvail;