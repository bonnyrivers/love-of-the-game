// @ts-nocheck
import React from 'react';
import { Screen, Mono, Btn, Rule } from "./UI.tsx";
import copy from '../copy.ts';
import './Matches.css';

// ══════════════════════════════════════════════════════════════════════════════
// MATCHES — no % scores, "why matched" bubble, availability request

// ══════════════════════════════════════════════════════════════════════════════
const MATCHES = [
  { name:"Selin",  age:27, dist:"2.4 mi", sign:"Scorpio",  hd:"Generator",  slots:["Tue Eve ★","Thu Eve"],      scheduleOverlap:100, why:"Both value depth and emotional presence. Date styles overlap — dinner + walks. Love language match: quality time.", status:"confirmed", photos:[null,null] },
  { name:"Amara",  age:28, dist:"1.1 mi", sign:"Leo",      hd:"Projector",  slots:["Wed Aftn","Fri Eve ★"],     scheduleOverlap:80,  why:"Shared bucket list: concerts, galleries, day trips. Both open to wherever it goes. Strong lifestyle match.", status:"pending",   photos:[null,null] },
  { name:"Lily",   age:31, dist:"3.8 mi", sign:"Pisces",   hd:"Manifestor", slots:["Sat Morn ★"],               scheduleOverlap:60,  why:"Both serious about dating with intention. Receive love the same way — quality time, fully present.", status:"pending",   photos:[null,null] },
  { name:"Joelle", age:29, dist:"0.9 mi", sign:"Gemini",   hd:"Reflector",  slots:["Sun Eve ★"],                scheduleOverlap:90,  why:"Matching date energy — spontaneous, active. Bucket list overlaps on 6 items. Giving you a Friday night.", status:"pending",   photos:[null,null] },
  { name:"Remi",   age:26, dist:"4.1 mi", sign:"Aquarius", hd:"Generator",  slots:["Fri Night ★","Sat Aftn ★"], scheduleOverlap:70,  why:"Both want a real relationship. Physical warmth as a shared love language. Same music and food interests.", status:"pending",   photos:[null,null] },
];

class Matches extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      sel: null,
      reqOpen: false,
      reqMsg: ""
    };
  }

  setSel = (s) => this.setState({ sel: s });

  setReqOpen = (o) => this.setState({ reqOpen: o });

  setReqMsg = (m) => this.setState({ reqMsg: m });

  render() {
    const { sel, reqOpen, reqMsg } = this.state;
    const { go } = this.props;

    if(sel!==null) {
      const m = MATCHES[sel];
      return (
        <Screen className="matches-screen">
          <button
            onClick={() => this.setSel(null)}
            className="matches-back-btn"
          >
            {copy.components.matches.matchCard.back}
          </button>
          <div className="fu d1 matches-card-header">
            <Mono className="matches-meta">{m.dist} · {m.sign} · {m.hd}</Mono>
            <h2 className="matches-card-title">{m.name}</h2>
            <Mono>{copy.components.matches.matchCard.yearsOld.replace('{age}', m.age)}</Mono>
          </div>

          {/* B&W photos — up to 3 */}
          <div className="fu d2 matches-photos-grid">
            {[0,1,2].map(i=>(
              <div key={i} className={`matches-photo-slot${i===0 ? ' first' : ''}`}>
                <span className="matches-photo-placeholder">◯</span>
              </div>
            ))}
          </div>

          {/* Why matched — no percentages */}
          <div className="fu d3 matches-why-box">
            <Mono className="matches-why-label">{copy.components.matches.matchDetail.whyMatched}</Mono>
            <p className="matches-why-text">{m.why}</p>
          </div>

          {/* Schedule overlap — the one stat */}
          <div className="fu d3 matches-schedule-box">
            <div className="matches-schedule-header">
              <Mono>{copy.components.matches.matchDetail.scheduleOverlap}</Mono>
              <Mono className="matches-overlap-value">{m.scheduleOverlap}%</Mono>
            </div>
            <div className="matches-progress-bar">
              <div className="matches-progress-fill" style={{ width:`${m.scheduleOverlap}%` }}/>
            </div>
            <div className="matches-slots">
              {m.slots.map(s=>(
                <span key={s} className={`matches-slot-tag${s.includes("★") ? ' available' : ' unavailable'}`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Availability request */}
          <div className="fu d4 matches-request-wrap">
            <button
              onClick={() => this.setReqOpen(!this.state.reqOpen)}
              className="matches-request-btn"
            >
              {reqOpen?copy.components.matches.matchDetail.cancelRequest:copy.components.matches.matchDetail.requestAvail}
            </button>
            {reqOpen&&(
              <div className="fi matches-request-panel">
                <p className="matches-request-message">
                  {copy.components.matches.matchDetail.requestMessage.replace('{name}', m.name)}
                </p>
                <textarea
                  className="matches-request-textarea"
                  value={reqMsg}
                  onChange={e => this.setReqMsg(e.target.value)}
                  rows={2}
                  placeholder={copy.components.matches.matchDetail.requestPlaceholder}
                />
                <Btn small className="matches-send-btn" disabled={!reqMsg.trim()} onClick={() => { this.setReqOpen(false); this.setReqMsg(""); }}>{copy.components.matches.matchDetail.sendRequest}</Btn>
              </div>
            )}
          </div>

          <Rule className="matches-rule"/>
          {m.status==="confirmed"
            ? <Mono className="matches-confirmed-message">{copy.components.matches.matchDetail.dateConfirmed}</Mono>
            : <div className="matches-actions">
                <Btn onClick={() => this.setSel(null)}>{copy.components.matches.matchDetail.acceptMatch}</Btn>
                <Btn ghost onClick={() => this.setSel(null)}>{copy.components.matches.matchDetail.passMatch}</Btn>
              </div>
          }
        </Screen>
      );
    }

    return (
      <Screen className="matches-screen">
        <div className="fu d1 matches-list-header">
          <Mono>{copy.components.matches.header.sectionLabel}</Mono>
          <h2 className="matches-list-title">{copy.components.matches.header.title}</h2>
          <p className="subtitle-sm">{copy.components.matches.header.subtitle}</p>
        </div>
        <div className="matches-list">
          {MATCHES.map((m,i)=>(
            <div key={i} className="fu matches-list-anim" style={{ animationDelay:`${i*.07+.08}s` }}>
              <div
                onClick={() => this.setSel(i)}
                className="matches-list-item"
                style={{ borderColor: m.status==="confirmed" ? "var(--soft)" : "var(--line)" }}
              >
                <div>
                  <p className="matches-list-name">{m.name}, {m.age}</p>
                  <div className="matches-list-meta-row">
                    <Mono>{m.dist}</Mono>
                    {m.slots.some(s=>s.includes("★"))&&<Mono className="matches-premium-slot">{copy.components.matches.matchDetail.premiumSlot}</Mono>}
                  </div>
                  {m.status==="confirmed" && <span className="matches-list-status">{copy.components.matches.matchCard.confirmed}</span>}
                </div>
                {m.status!=="confirmed" && <Mono className="matches-list-view-more">{copy.components.matches.matchCard.viewMore}</Mono>}
              </div>
            </div>
          ))}
        </div>
      </Screen>
    );
  }
}

export default Matches;