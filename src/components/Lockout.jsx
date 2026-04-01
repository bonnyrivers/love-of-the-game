import React from 'react';
import { Screen, Mono } from "./UI";
import copy from '../copy.js';
import './Lockout.css';

// ══════════════════════════════════════════════════════════════════════════════
// 14. LOCKOUT

class Lockout extends React.Component {
  render() {
    const { go } = this.props;
    return (
      <Screen className="lockout-screen">
        <div className="fu d1">
          <div className="lockout-icon">⊘</div>
          <Mono className="lockout-label">{copy.components.lockout.label}</Mono>
          <h2 className="lockout-title">{copy.components.lockout.title}</h2>
          <p className="lockout-message">
            {copy.components.lockout.message}
          </p>
        </div>
        <div className="fu d3 lockout-days-box">
          <Mono className="lockout-days-title">{copy.components.lockout.daysRemaining}</Mono>
          <div className="lockout-progress-container">
            <div className="lockout-progress-fill"/>
          </div>
          <Mono className="lockout-unlock-time">{copy.components.lockout.unlockTime}</Mono>
        </div>
        <div className="lockout-notes-section">
          <p className="lockout-notes-text">
            {copy.components.lockout.notes.map((note, i) => (
              <span key={i}>{note}<br/></span>
            ))}
          </p>
        </div>
        <button onClick={()=>go("home")} className="lockout-back-button">{copy.components.lockout.back}</button>
      </Screen>
    );
  }
}

export default Lockout;