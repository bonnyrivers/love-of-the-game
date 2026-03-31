import React from 'react';
import { Mono, Screen, Btn } from "../UI";
import copy from '../../copy.js';

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
    const iStyle = {
      width: "100%",
      background: "transparent",
      border: "none",
      borderBottom: "1px solid var(--line2)",
      color: "var(--white)",
      fontFamily: "var(--serif)",
      fontSize: 28,
      fontStyle: "italic",
      padding: "10px 0",
      outline: "none",
      marginTop: 8
    };

    return (
      <Screen>
        <div className="fu d1" style={{ marginBottom: 40 }}>
          <Mono>{copy.components.onboarding.obName.step}</Mono>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, fontStyle: "italic", fontWeight: 400, color: "var(--white)", margin: "14px 0 6px", lineHeight: 1.1 }}>{copy.components.onboarding.obName.title}</h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--mid)", fontStyle: "italic" }}>{copy.components.onboarding.obName.subtitle}</p>
        </div>
        <div className="fu d3" style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
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
                style={iStyle}
                onFocus={(e) => e.target.style.borderBottomColor = "var(--soft)"}
                onBlur={(e) => e.target.style.borderBottomColor = "var(--line2)"}
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