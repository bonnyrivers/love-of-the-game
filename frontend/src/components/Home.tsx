// @ts-nocheck
import React from 'react';
import { Screen, Mono, Rule, Btn } from "./UI.tsx";
import copy from '../copy.ts';
import './Home.css';

// ══════════════════════════════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════════════════════════════
class Home extends React.Component {
  render() {
    const { go, state } = this.props;
    return (
      <Screen className="home-screen">
        <div className="fu d1 home-header">
          <Mono>{copy.components.home.title}</Mono>
          <h2>
            {state.name ? copy.components.home.userGreeting.replace('{name}', state.name) : copy.components.home.defaultGreeting}
          </h2>
        </div>

        {/* Standing — private, no public stat */}
        <div className="fu d2 home-standing-card">
          <div>
            <Mono className="home-standing-label">{copy.components.home.standing.label}</Mono>
            <span className="home-standing-value">{copy.components.home.standing.value}</span>
          </div>
          <Mono className="home-standing-bonus">{copy.components.home.standing.bonusActive}</Mono>
        </div>

        {/* Confirmed date card */}
        <div className="fu d2 home-confirmed-date-section">
          <Mono className="home-confirmed-label">{copy.components.home.confirmedDate.label}</Mono>
          <div className="home-confirmed-date-card">
            <div className="home-date-header">
              <div>
                <p className="home-date-name">Selin</p>
                <Mono className="home-date-details">2.4 mi · Scorpio · Generator</Mono>
              </div>
              <div className="home-date-time">
                <Mono className="home-date-day">Tuesday</Mono>
                <Mono className="home-date-time-value">6:30 pm ★</Mono>
              </div>
            </div>
            <Rule style={{ marginBottom:12 }}/>
            <Mono className="home-venue-label">{copy.components.home.confirmedDate.venueLabel}</Mono>
            <p className="home-venue-info">Dimes · Essex St, LES</p>
            <Rule style={{ marginBottom:12 }}/>
            {/* Why you matched */}
            <div className="home-why-matched">
              <Mono className="home-why-matched-title">{copy.components.home.confirmedDate.whyMatched}</Mono>
              <p className="home-why-matched-text">
                You both value emotional availability and depth. Selin is also open to wherever it goes — same as you. Schedule overlap is 100% this week.
              </p>
            </div>
            <div className="home-schedule-indicator">
              <Mono className="home-schedule-text">{copy.components.home.confirmedDate.scheduleOverlapIndicator.replace('{time}', '18').replace('{count}', '10')}</Mono>
              <div className="home-pulse-dot"/>
            </div>
          </div>
        </div>

        {/* Check-in */}
        <div className="fu d3 home-checkin-button" onClick={()=>go("checkin")}>
          <div>
            <Mono className="home-checkin-label">{copy.components.home.dateWindow.label}</Mono>
            <p className="home-checkin-action">{copy.components.home.dateWindow.action}</p>
          </div>
          <div className="home-checkin-pulse"/>
        </div>

        {/* Pending */}
        <div className="fu d4 home-pending-section">
          <div className="home-pending-header">
            <Mono>{copy.components.home.waiting.label}</Mono>
            <button onClick={()=>go("matches")} className="home-see-all-button">{copy.components.home.waiting.seeAll}</button>
          </div>
          {["Amara, 28 · 1.1 mi","Lily, 31 · 3.8 mi"].map((n,i)=>(
            <div key={i} onClick={()=>go("matches")} className="home-pending-item">
              <span className="home-pending-name">{n}</span>
              <Mono className="home-pending-respond">{copy.components.home.waiting.respond}</Mono>
            </div>
          ))}
        </div>

        {/* Field notes nudge */}
        <div className="fu d5 home-field-notes-cta" onClick={()=>go("post-date")}>
          <Mono className="home-field-notes-label">{copy.components.home.fieldNotesCTA.label}</Mono>
          <p className="home-field-notes-message">{copy.components.home.fieldNotesCTA.message}</p>
        </div>
      </Screen>
    );
  }
}

export default Home;