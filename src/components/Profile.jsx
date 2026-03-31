import React from 'react';
import { Screen, Mono } from "./UI";

// ══════════════════════════════════════════════════════════════════════════════
// 13. PROFILE
// ══════════════════════════════════════════════════════════════════════════════
class Profile extends React.Component {
  render() {
    const { go, state } = this.props;
    return (
      <Screen style={{ paddingBottom:90 }}>
        <div className="fu d1" style={{ marginBottom:24 }}>
          <Mono>You</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:44,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginTop:10,lineHeight:1 }}>{state.name||"Your name"}</h2>
          <Mono style={{ marginTop:8,display:"block" }}>{state.age||"—"} · {state.sign||"No sign set"} · {state.radius||5} mi</Mono>
        </div>
        <div className="fu d2" style={{ border:"1px solid var(--line)",height:165,background:"var(--bg1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,position:"relative" }}>
          <span style={{ color:"var(--line2)",fontSize:24 }}>◯</span>
          <div style={{ position:"absolute",bottom:8,left:8,background:"var(--bg)",border:"1px solid var(--line2)",fontFamily:"var(--mono)",fontSize:7,color:"var(--soft)",letterSpacing:"0.1em",padding:"4px 8px" }}>B&W · PROFILE</div>
          <button style={{ position:"absolute",bottom:8,right:8,border:"1px solid var(--line2)",background:"var(--bg)",fontFamily:"var(--mono)",fontSize:7,letterSpacing:"0.1em",color:"var(--dim)",padding:"5px 9px",cursor:"pointer" }}>EDIT</button>
        </div>
        {/* Stats — private only */}
        <div className="fu d3" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14 }}>
          {[["Dates attended","4"],["Standing","Good"],["Bonus matches","Active"],["Lockouts","0"]].map(([l,v])=>(
            <div key={l} style={{ border:"1px solid var(--line)",padding:"12px 13px",background:"var(--bg1)" }}>
              <Mono style={{ display:"block",marginBottom:5 }}>{l}</Mono>
              <span style={{ fontFamily:"var(--serif)",fontSize:19,fontStyle:"italic",color:"var(--white)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="fu d3" style={{ border:"1px solid var(--line2)",padding:"10px 12px",marginBottom:16,background:"var(--bg2)" }}>
          <Mono style={{ fontSize:7 }}>Attendance is private — only you see this. It is never shown to matches.</Mono>
        </div>
        {[
          { label:"Looking for",       val:state.seeking?.join(", ")||"—"                                          },
          { label:"Profession",        val:state.profession||"Not set"                                            },
          { label:"Date bucket list",  val:state.bucket?.length?`${state.bucket.length} things selected`:"Not set" },
          { label:"Love language",     val:state.loveGive?`Gives: ${state.loveGive}`:"Not answered"               },
          { label:"Quick profile",     val:`${state.quickAnswers?Object.keys(state.quickAnswers).length:0} of 5 answered` },
        ].map(({ label, val }) => (
          <div key={label} className="fu d3" style={{ border:"1px solid var(--line)",padding:"13px 14px",marginBottom:8,background:"var(--bg1)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <Mono style={{ display:"block",marginBottom:4 }}>{label}</Mono>
              <span style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)" }}>{val}</span>
            </div>
            <Mono style={{ fontSize:8 }}>edit</Mono>
          </div>
        ))}
        <div className="fu d4" style={{ border:"1px dashed var(--line2)",padding:"16px 14px",marginTop:8,background:"var(--bg1)" }}>
          <Mono style={{ display:"block",marginBottom:5 }}>Deep compatibility profile</Mono>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)",lineHeight:1.6,marginBottom:12 }}>20 more questions. More self-clarity, better matches. Your call.</p>
          <button onClick={()=>go("deep-quiz")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--soft)",cursor:"pointer",padding:0 }}>Begin →</button>
        </div>
        <div style={{ marginTop:22,display:"flex",gap:20 }}>
          <button onClick={()=>go("lockout")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",cursor:"pointer",textDecoration:"underline",letterSpacing:"0.1em" }}>Preview lockout</button>
          <button onClick={()=>go("checkin")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",cursor:"pointer",textDecoration:"underline",letterSpacing:"0.1em" }}>Preview check-in</button>
        </div>
      </Screen>
    );
  }
}

export default Profile;