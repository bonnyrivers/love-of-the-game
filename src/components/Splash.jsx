import React from 'react';
import { Screen, Mono, Btn } from "./UI";

class Splash extends React.Component {
  render() {
    const { go } = this.props;
    return (
      <Screen style={{ justifyContent:"space-between" }}>
        <div className="fu d1"><Mono>LotG · Private Beta · 2025</Mono></div>
        <div>
          <div className="fu d2" style={{ marginBottom:48 }}>
            <div style={{ width:24,height:1,background:"var(--line2)",marginBottom:20 }}/>
            <h1 style={{ fontFamily:"var(--serif)",fontSize:52,fontWeight:400,fontStyle:"italic",color:"var(--white)",lineHeight:.97,letterSpacing:"-0.02em" }}>
              Love of<br/>the Game.
            </h1>
          </div>
          <div className="fu d3">
            <p style={{ fontFamily:"var(--serif)",fontSize:18,color:"var(--mid)",fontStyle:"italic",lineHeight:1.7,marginBottom:6 }}>Dating the way it was meant to be.</p>
            <p style={{ fontFamily:"var(--serif)",fontSize:15,color:"var(--dim)",fontStyle:"italic",lineHeight:1.7 }}>Real matches. Real places. Show up or step aside.</p>
          </div>
        </div>
        <div className="fu d5" style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <Btn onClick={()=>this.props.go("ob-name")}>Get started</Btn>
          <Btn ghost onClick={()=>this.props.go("home")}>Sign in</Btn>
        </div>
      </Screen>
    );
  }
}

export default Splash;