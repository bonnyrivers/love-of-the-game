// @ts-nocheck
import React from 'react';
import { Screen, Mono, Chip } from './UI.tsx';
import copy from '../copy.ts';
import './Profile.css';

// ══════════════════════════════════════════════════════════════════════════════
// 13. PROFILE
// ══════════════════════════════════════════════════════════════════════════════
class Profile extends React.Component<{
  go: (s: string) => void;
  state: Record<string, any>;
  onLogout: () => void;
  setProfile: (d: Partial<Record<string, any>>) => void;
}> {
  constructor(props) {
    super(props);
    this.state = {
      activeEditor: null,
    };
  }

  openEditor = (key) => {
    this.setState({ activeEditor: key });
  };

  closeEditor = () => {
    this.setState({ activeEditor: null });
  };

  toggleArrayValue = (field, value) => {
    const current = this.props.state[field] || [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    this.props.setProfile({ [field]: next });
  };

  setValue = (field, value) => {
    this.props.setProfile({ [field]: value });
  };

  renderEditor = (editorKey) => {
    const { activeEditor } = this.state;
    const { state, go } = this.props;
    if (activeEditor !== editorKey) return null;

    if (editorKey === 'seeking') {
      const options = copy.components.onboarding.obIdentity.seeking;
      const selected = state.seeking || [];
      return (
        <div className="fu d3 profile-choice-panel">
          <Mono style={{ display: 'block', marginBottom: 10 }}>
            {copy.components.profile.details.lookingFor}
          </Mono>
          <div className="profile-choice-grid">
            {options.map((option) => (
              <Chip
                key={option}
                label={option}
                active={selected.includes(option)}
                onClick={() => this.toggleArrayValue('seeking', option)}
              />
            ))}
          </div>
          <button onClick={this.closeEditor} className="profile-choice-close">
            Done
          </button>
        </div>
      );
    }

    if (editorKey === 'profession') {
      const options = copy.components.onboarding.obLifestyle.profession.options;
      return (
        <div className="fu d3 profile-choice-panel">
          <Mono style={{ display: 'block', marginBottom: 10 }}>
            {copy.components.profile.details.profession}
          </Mono>
          <div className="profile-choice-grid">
            {options.map((option) => (
              <Chip
                key={option}
                label={option}
                active={state.profession === option}
                onClick={() => this.setValue('profession', option)}
              />
            ))}
          </div>
          <button onClick={this.closeEditor} className="profile-choice-close">
            Done
          </button>
        </div>
      );
    }

    if (editorKey === 'bucket') {
      const options = copy.components.onboarding.obLifestyle.bucketList.items;
      const selected = state.bucket || [];
      return (
        <div className="fu d3 profile-choice-panel">
          <Mono style={{ display: 'block', marginBottom: 10 }}>
            {copy.components.profile.details.dateBucketList}
          </Mono>
          <div className="profile-choice-grid">
            {options.map((option) => (
              <Chip
                key={option}
                label={option}
                active={selected.includes(option)}
                onClick={() => this.toggleArrayValue('bucket', option)}
              />
            ))}
          </div>
          <button onClick={this.closeEditor} className="profile-choice-close">
            Done
          </button>
        </div>
      );
    }

    if (editorKey === 'loveGive') {
      const options = copy.components.onboarding.obQuiz.q5.options;
      return (
        <div className="fu d3 profile-choice-panel">
          <Mono style={{ display: 'block', marginBottom: 10 }}>
            {copy.components.profile.details.loveLanguage}
          </Mono>
          <div className="profile-choice-grid">
            {options.map((option) => (
              <Chip
                key={option}
                label={option}
                active={state.loveGive === option}
                onClick={() => this.setValue('loveGive', option)}
              />
            ))}
          </div>
          <button onClick={this.closeEditor} className="profile-choice-close">
            Done
          </button>
        </div>
      );
    }

    if (editorKey === 'quickAnswers') {
      return (
        <div className="fu d3 profile-choice-panel">
          <Mono style={{ display: 'block', marginBottom: 10 }}>
            {copy.components.profile.details.quickProfile}
          </Mono>
          <p className="profile-choice-hint">Edit your quick profile responses in the quiz flow.</p>
          <div className="profile-choice-actions">
            <button onClick={() => go('ob-quiz')} className="profile-choice-close">
              Open Quiz Editor
            </button>
            <button onClick={this.closeEditor} className="profile-choice-close">
              Close
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  render() {
    const { go, state, onLogout } = this.props;
    return (
      <Screen className="profile-screen">
        <div className="fu d1 profile-header">
          <Mono>{copy.components.profile.header.label}</Mono>
          <h2 className="profile-name">
            {state.name || copy.components.profile.header.nameDefault}
          </h2>
          <Mono className="profile-details">
            {state.age || copy.shared.genericLabels.dash} ·{' '}
            {state.sign || copy.components.profile.header.noSignSet} · {state.radius || 5}{' '}
            {copy.components.profile.header.distanceUnit}
          </Mono>
        </div>
        <div className="fu d2 profile-photo-container">
          <span className="profile-photo-placeholder">◯</span>
          <div className="profile-photo-label">{copy.components.profile.profile.label}</div>
          <button className="profile-edit-button">
            {copy.components.profile.profile.editButton}
          </button>
        </div>
        {/* Stats — private only */}
        <div className="fu d3 profile-stats-grid">
          {[
            [copy.components.profile.stats.datesAttended, '4'],
            [copy.components.profile.stats.standing, 'Good'],
            [copy.components.profile.stats.bonusMatches, 'Active'],
            [copy.components.profile.stats.lockouts, '0'],
          ].map(([l, v]) => (
            <div key={l} className="profile-stat-card">
              <Mono style={{ display: 'block', marginBottom: 5 }}>{l}</Mono>
              <span className="profile-stat-value">{v}</span>
            </div>
          ))}
        </div>
        <div className="fu d3 profile-attendance-note">
          <Mono style={{ fontSize: 7 }}>{copy.components.profile.stats.attendancePrivacyNote}</Mono>
        </div>
        {[
          {
            key: 'seeking',
            label: copy.components.profile.details.lookingFor,
            val: state.seeking?.join(', ') || copy.shared.genericLabels.dash,
          },
          {
            key: 'profession',
            label: copy.components.profile.details.profession,
            val: state.profession || copy.components.profile.details.professionNotSet,
          },
          {
            key: 'bucket',
            label: copy.components.profile.details.dateBucketList,
            val: state.bucket?.length
              ? copy.components.profile.details.dateBucketSelected.replace(
                  '{count}',
                  state.bucket.length
                )
              : copy.components.profile.details.dateBucketNotSet,
          },
          {
            key: 'loveGive',
            label: copy.components.profile.details.loveLanguage,
            val: state.loveGive
              ? copy.components.profile.details.loveLanguageGives.replace('{value}', state.loveGive)
              : copy.components.profile.details.loveLanguageNotAnswered,
          },
          {
            key: 'quickAnswers',
            label: copy.components.profile.details.quickProfile,
            val: `${state.quickAnswers ? Object.keys(state.quickAnswers).length : 0} of 5 answered`,
          },
        ].map(({ key, label, val }) => (
          <React.Fragment key={label}>
            <div className="fu d3 profile-detail-item">
              <div>
                <Mono style={{ display: 'block', marginBottom: 4 }}>{label}</Mono>
                <span className="profile-detail-value">{val}</span>
              </div>
              <button onClick={() => this.openEditor(key)} className="profile-detail-edit-btn">
                {copy.components.profile.details.edit}
              </button>
            </div>
            {this.renderEditor(key)}
          </React.Fragment>
        ))}
        <div className="fu d4 profile-deep-quiz-section">
          <Mono style={{ display: 'block', marginBottom: 5 }}>
            {copy.components.profile.deepQuiz.title}
          </Mono>
          <p className="profile-deep-quiz-description">
            {copy.components.profile.deepQuiz.description}
          </p>
          <button onClick={() => go('deep-quiz')} className="profile-deep-quiz-button">
            {copy.components.profile.deepQuiz.begin}
          </button>
        </div>
        <div className="profile-footer-buttons">
          <button onClick={() => go('lockout')} className="profile-footer-button">
            {copy.components.profile.preview.lockout}
          </button>
          <button onClick={() => go('checkin')} className="profile-footer-button">
            {copy.components.profile.preview.checkin}
          </button>
          <button onClick={onLogout} className="profile-footer-button profile-logout-button">
            Log out
          </button>
        </div>
      </Screen>
    );
  }
}

export default Profile;
