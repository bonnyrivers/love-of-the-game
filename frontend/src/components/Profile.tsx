// @ts-nocheck
import React from 'react';
import { Screen, Mono } from "./UI.tsx";
import copy from '../copy.ts';
import './Profile.css';

// ══════════════════════════════════════════════════════════════════════════════
// 13. PROFILE
// ══════════════════════════════════════════════════════════════════════════════
class Profile extends React.Component {
  render() {
    const { go, state } = this.props;
    return (
      <Screen className="profile-screen">
        <div className="fu d1 profile-header">
          <Mono>{copy.components.profile.header.label}</Mono>
          <h2 className="profile-name">{state.name||copy.components.profile.header.nameDefault}</h2>
          <Mono className="profile-details">{state.age||copy.shared.genericLabels.dash} · {state.sign||copy.components.profile.header.noSignSet} · {state.radius||5} {copy.components.profile.header.distanceUnit}</Mono>
        </div>
        <div className="fu d2 profile-photo-container">
          <span className="profile-photo-placeholder">◯</span>
          <div className="profile-photo-label">{copy.components.profile.profile.label}</div>
          <button className="profile-edit-button">{copy.components.profile.profile.editButton}</button>
        </div>
        {/* Stats — private only */}
        <div className="fu d3 profile-stats-grid">
          {[[copy.components.profile.stats.datesAttended,"4"],[copy.components.profile.stats.standing,"Good"],[copy.components.profile.stats.bonusMatches,"Active"],[copy.components.profile.stats.lockouts,"0"]].map(([l,v])=>(
            <div key={l} className="profile-stat-card">
              <Mono style={{ display:"block",marginBottom:5 }}>{l}</Mono>
              <span className="profile-stat-value">{v}</span>
            </div>
          ))}
        </div>
        <div className="fu d3 profile-attendance-note">
          <Mono style={{ fontSize:7 }}>{copy.components.profile.stats.attendancePrivacyNote}</Mono>
        </div>
        {[
          { label:copy.components.profile.details.lookingFor,       val:state.seeking?.join(", ")||copy.shared.genericLabels.dash                                          },
          { label:copy.components.profile.details.profession,        val:state.profession||copy.components.profile.details.professionNotSet                                            },
          { label:copy.components.profile.details.dateBucketList,  val:state.bucket?.length?copy.components.profile.details.dateBucketSelected.replace('{count}', state.bucket.length):copy.components.profile.details.dateBucketNotSet },
          { label:copy.components.profile.details.loveLanguage,     val:state.loveGive?copy.components.profile.details.loveLanguageGives.replace('{value}', state.loveGive):copy.components.profile.details.loveLanguageNotAnswered               },
          { label:copy.components.profile.details.quickProfile,     val:`${state.quickAnswers?Object.keys(state.quickAnswers).length:0} of 5 answered` },
        ].map(({ label, val }) => (
          <div key={label} className="fu d3 profile-detail-item">
            <div>
              <Mono style={{ display:"block",marginBottom:4 }}>{label}</Mono>
              <span className="profile-detail-value">{val}</span>
            </div>
            <Mono style={{ fontSize:8 }}>{copy.components.profile.details.edit}</Mono>
          </div>
        ))}
        <div className="fu d4 profile-deep-quiz-section">
          <Mono style={{ display:"block",marginBottom:5 }}>{copy.components.profile.deepQuiz.title}</Mono>
          <p className="profile-deep-quiz-description">{copy.components.profile.deepQuiz.description}</p>
          <button onClick={()=>go("deep-quiz")} className="profile-deep-quiz-button">{copy.components.profile.deepQuiz.begin}</button>
        </div>
        <div className="profile-footer-buttons">
          <button onClick={()=>go("lockout")} className="profile-footer-button">{copy.components.profile.preview.lockout}</button>
          <button onClick={()=>go("checkin")} className="profile-footer-button">{copy.components.profile.preview.checkin}</button>
        </div>
      </Screen>
    );
  }
}

export default Profile;