import React from 'react';
import { Screen, Mono, Btn } from "./UI";
import copy from '../copy.js';

class Splash extends React.Component {
  render() {
    const { go } = this.props;
    return (
      <Screen style={{ justifyContent:"space-between" }}>
        <div className="fu d1"><Mono>{copy.components.splash.header.beta}</Mono></div>
        <div>
          <div className="fu d2" style={{ marginBottom:48 }}>
            <div style={{ width:24,height:1,background:"var(--line2)",marginBottom:20 }}/>
            <h1 style={{ fontFamily:"var(--serif)",fontSize:52,fontWeight:400,fontStyle:"italic",color:"var(--white)",lineHeight:.97,letterSpacing:"-0.02em" }}>
              {copy.components.splash.header.title}
            </h1>
          </div>
          <div className="fu d3">
            <p style={{ fontFamily:"var(--serif)",fontSize:18,color:"var(--mid)",fontStyle:"italic",lineHeight:1.7,marginBottom:6 }}>{copy.components.splash.header.subtitle}</p>
            <p style={{ fontFamily:"var(--serif)",fontSize:15,color:"var(--dim)",fontStyle:"italic",lineHeight:1.7 }}>{copy.components.splash.header.description}</p>
          </div>
        </div>
        <div className="fu d5" style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <Btn onClick={()=>this.props.go("ob-name")}>{copy.components.splash.buttons.getStarted}</Btn>
          <Btn ghost onClick={()=>this.props.go("home")}>{copy.components.splash.buttons.signIn}</Btn>
        </div>
      </Screen>
    );
  }
}

export default Splash;