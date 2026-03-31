import React from 'react';
import { Screen, Mono } from "./UI";

// ══════════════════════════════════════════════════════════════════════════════
// 14. LOCKOUT

class Lockout extends React.Component {
  render() {
    const { go } = this.props;
    return (
      <Screen style={{ justifyContent:"center",alignItems:"center",textAlign:"center" }}>
        <div className="fu d1">
          <div style={{ fontSize:44,marginBottom:16,color:"var(--dim)" }}>⊘</div>
          <Mono style={{ color:"#7a3025",display:"block",marginBottom:14 }}>Lockout active</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1.15,marginBottom:14 }}>You missed<br/>your date.</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.75,marginBottom:30,maxWidth:270 }}>
            Someone cleared their evening for you. Out of respect for their time, matching is paused for 7 days.
          </p>
        </div>
        <div className="fu d3" style={{ border:"1px solid var(--line)",padding:"18px 36px",background:"var(--bg1)",marginBottom:22,width:"100%" }}>
          <Mono style={{ display:"block",marginBottom:10,color:"var(--white)",fontSize:11 }}>6 days remaining</Mono>
          <div style={{ height:1,background:"var(--line)",marginBottom:10 }}>
            <div style={{ height:1,background:"var(--soft)",width:"14%" }}/>
          </div>
          <Mono style={{ fontSize:8 }}>Unlocks Sunday at midnight</Mono>
        </div>
        <div style={{ borderLeft:"1px solid var(--line)",paddingLeft:12,textAlign:"left",marginBottom:28,width:"100%" }}>
          <p style={{ fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.08em",color:"var(--mid)",lineHeight:1.9 }}>
            Profile and availability still editable.<br/>
            Matching resumes automatically.<br/>
            Emergency? Submit proof to unlock early.
          </p>
        </div>
        <button onClick={()=>go("home")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--dim)",cursor:"pointer" }}>← back</button>
      </Screen>
    );
  }
}

export default Lockout;