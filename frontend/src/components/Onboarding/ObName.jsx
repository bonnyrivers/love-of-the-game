import React from 'react';
import { Mono, Screen, Btn } from "../UI.jsx";
import copy from '../../copy.js';
import './ObName.css';

// ══════════════════════════════════════════════════════════════════════════════
// 2. NAME + AGE
// ══════════════════════════════════════════════════════════════════════════════
class ObName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.state.name || "",
      age: props.state.age || ""
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleContinue = () => {
    const { name, age } = this.state;
    if (name && age) {
      this.props.set({ name, age });
      this.props.go("ob-identity");
    }
  };

  render() {
    const { name, age } = this.state;

    return (
      <Screen>
        <div className="fu d1 ob-name-header">
          <Mono>{copy.components.onboarding.obName.step}</Mono>
          <h2 className="onboarding-h2">{copy.components.onboarding.obName.title}</h2>
          <p className="onboarding-p-subtitle-large">{copy.components.onboarding.obName.subtitle}</p>
        </div>
        <div className="fu d3 onboarding-main-container gap-32">
          {[
            [copy.components.onboarding.obName.firstNameLabel, name, "name", "text"],
            [copy.components.onboarding.obName.ageLabel, age, "age", "number"]
          ].map(([l, v, f, t]) => (
            <div key={l}>
              <Mono>{l}</Mono>
              <input
                type={t}
                value={v}
                onChange={(e) => this.handleChange(f, e.target.value)}
                className="ob-name-input"
              />
            </div>
          ))}
        </div>
        <div className="fu d5">
          <Btn onClick={this.handleContinue} disabled={!name || !age}>{copy.components.onboarding.obName.continue}</Btn>
        </div>
      </Screen>
    );
  }
}

export default ObName;