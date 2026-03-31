import React from 'react';
import { Mono, Screen, Btn } from "../UI";

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
          <Mono>1 — 6</Mono>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, fontStyle: "italic", fontWeight: 400, color: "var(--white)", margin: "14px 0 6px", lineHeight: 1.1 }}>Start here.</h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--mid)", fontStyle: "italic" }}>No handle. No headline. Just you.</p>
        </div>
        <div className="fu d3" style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
          {[
            ["First name", name, "name", "text"],
            ["Age", age, "age", "number"]
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
          <Btn onClick={this.handleContinue} disabled={!name || !age}>Continue →</Btn>
        </div>
      </Screen>
    );
  }
}

export default ObName;