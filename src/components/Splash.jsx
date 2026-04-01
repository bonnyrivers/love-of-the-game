import React from 'react';
import { Screen, Mono, Btn } from "./UI";
import copy from '../copy.js';
import './Splash.css';

class Splash extends React.Component {
  render() {
    const { go } = this.props;
    return (
      <Screen className="splash-screen">
        <div className="fu d1"><Mono>{copy.components.splash.header.beta}</Mono></div>
        <div>
          <div className="fu d2 splash-header-section">
            <div className="splash-divider"/>
            <h1 className="splash-title">
              {copy.components.splash.header.title}
            </h1>
          </div>
          <div className="fu d3">
            <p className="splash-subtitle">{copy.components.splash.header.subtitle}</p>
            <p className="splash-description">{copy.components.splash.header.description}</p>
          </div>
        </div>
        <div className="fu d5 splash-button-container">
          <Btn onClick={()=>this.props.go("ob-name")}>{copy.components.splash.buttons.getStarted}</Btn>
          <Btn ghost onClick={()=>this.props.go("home")}>{copy.components.splash.buttons.signIn}</Btn>
        </div>
      </Screen>
    );
  }
}

export default Splash;