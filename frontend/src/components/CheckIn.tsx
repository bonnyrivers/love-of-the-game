// @ts-nocheck
import React from 'react';
import { Mono, Screen, Btn } from "./UI.tsx";
import copy from '../copy.ts';
import './CheckIn.css';

// ══════════════════════════════════════════════════════════════════════════════
// CHECK-IN
// ══════════════════════════════════════════════════════════════════════════════
class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "idle",
      self: null
    };
  }

  setStatus = (s) => this.setState({ status: s });

  setSelf = (s) => this.setState({ self: s });

  render() {
    const { status, self } = this.state;

    return (
      <Screen className="check-in-screen">
        <div className="fu d1 check-in-header">
          <Mono className="check-in-header-meta">{copy.components.checkIn.header.replace('{name}', 'Selin').replace('{venue}', 'Dimes')}</Mono>
          <h2 className="onboarding-h2">{copy.components.checkIn.title}</h2>
        </div>

        {status==="idle"&&(
          <div className="fu d2">
            <div className="check-in-status-box">
              <Mono className="check-in-status-text">{copy.components.checkIn.status.idle.pulse}<br/><span className="check-in-status-sub">{copy.components.checkIn.status.idle.privacy}</span></Mono>
            </div>
            <Btn onClick={()=>{ this.setStatus("checking"); setTimeout(()=>this.setStatus("unconfirmed"),2000); }}>{copy.components.checkIn.status.idle.here}</Btn>
            <Btn ghost className="check-in-btn-gap" onClick={()=>this.setStatus("no-show")}>{copy.components.checkIn.status.idle.cantMakeIt}</Btn>
          </div>
        )}

        {status==="checking"&&(
          <div className="fi check-in-checking-container">
            <div className="check-in-pulse-container">
              <div className="check-in-pulse-circle"/>
            </div>
            <Mono>{copy.components.checkIn.status.checking}</Mono>
          </div>
        )}

        {status==="unconfirmed"&&(
          <div className="fi">
            <div className="check-in-unconfirmed-box">
              <Mono className="check-in-unconfirmed-title">{copy.components.checkIn.status.unconfirmed.title}</Mono>
              <p className="onboarding-p-subtitle">{copy.components.checkIn.status.unconfirmed.message}</p>
            </div>
            <p className="check-in-unconfirmed-question">{copy.components.checkIn.status.unconfirmed.question}</p>
            {[[copy.components.checkIn.status.unconfirmed.yes,"yes"],[copy.components.checkIn.status.unconfirmed.no,"no"]].map(([l,v])=>(
              <button key={v} onClick={()=>this.setSelf(v)} className={`option-button block ${self===v ? 'selected' : ''}`}>{l}</button>
            ))}
            {self&&<Btn className="check-in-btn-gap-sm" onClick={()=>this.props.go(self==="yes"?"post-date":"home")}>
              {self==="yes"?copy.components.checkIn.status.unconfirmed.fieldNote:copy.components.checkIn.status.unconfirmed.submit}
            </Btn>}
          </div>
        )}

        {status==="no-show"&&(
          <div className="fi">
            <div className="check-in-no-show-box">
              <Mono className="check-in-no-show-title">{copy.components.checkIn.status.noShow.title}</Mono>
              <p className="onboarding-p-subtitle">{copy.components.checkIn.status.noShow.message}</p>
            </div>
            <Btn onClick={()=>this.props.go("home")}>{copy.components.checkIn.status.noShow.submit}</Btn>
            <Btn ghost className="check-in-btn-gap" onClick={()=>this.props.go("home")}>{copy.components.checkIn.status.noShow.justDidntGo}</Btn>
          </div>
        )}
      </Screen>
    );
  }
}

export default CheckIn;