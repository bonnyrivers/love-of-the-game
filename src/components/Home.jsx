import React from 'react';
import { Screen, Mono, Rule, Btn } from "./UI";
import copy from '../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════════════════════════════
class Home extends React.Component {
  render() {
    const { go, state } = this.props;
    return (
      <Screen style={{ paddingBottom:90 }}>
        <div className="fu d1" style={{ marginBottom:32 }}>
          <Mono>{copy.components.home.title}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:40,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginTop:10,lineHeight:1.05 }}>
            {state.name ? copy.components.home.userGreeting.replace('{name}', state.name) : copy.components.home.defaultGreeting}
          </h2>
        </div>

        {/* Standing — private, no public stat */}
        <div className="fu d2" style={{ border:"1px solid var(--line)",padding:"13px 16px",background:"var(--bg1)",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
          <div>
            <Mono style={{ display:"block",marginBottom:4 }}>{copy.components.home.standing.label}</Mono>
            <span style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--white)" }}>{copy.components.home.standing.value}</span>
          </div>
          <Mono style={{ color:"var(--soft)",fontSize:8 }}>{copy.components.home.standing.bonusActive}</Mono>
        </div>

        {/* Confirmed date card */}
        <div className="fu d2" style={{ marginBottom:14 }}>
          <Mono style={{ display:"block",marginBottom:10 }}>{copy.components.home.confirmedDate.label}</Mono>
          <div style={{ border:"1px solid var(--line2)",background:"var(--bg1)",padding:"18px 16px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
              <div>
                <p style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)" }}>Selin</p>
                <Mono style={{ marginTop:5,display:"block" }}>2.4 mi · Scorpio · Generator</Mono>
              </div>
              <div style={{ textAlign:"right" }}>
                <Mono style={{ display:"block",marginBottom:3 }}>Tuesday</Mono>
                <Mono style={{ color:"var(--white)",fontSize:11 }}>6:30 pm ★</Mono>
              </div>
            </div>
            <Rule style={{ marginBottom:12 }}/>
            <Mono style={{ display:"block",marginBottom:6 }}>{copy.components.home.confirmedDate.venueLabel}</Mono>
            <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--soft)",marginBottom:12 }}>Dimes · Essex St, LES</p>
            <Rule style={{ marginBottom:12 }}/>
            {/* Why you matched */}
            <div style={{ background:"var(--bg2)",padding:"10px 12px",marginBottom:12 }}>
              <Mono style={{ display:"block",marginBottom:6,fontSize:8 }}>{copy.components.home.confirmedDate.whyMatched}</Mono>
              <p style={{ fontFamily:"var(--serif)",fontSize:13,fontStyle:"italic",color:"var(--soft)",lineHeight:1.6 }}>
                You both value emotional availability and depth. Selin is also open to wherever it goes — same as you. Schedule overlap is 100% this week.
              </p>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <Mono style={{ fontSize:8 }}>{copy.components.home.confirmedDate.scheduleOverlapIndicator.replace('{time}', '18').replace('{count}', '10')}</Mono>
              <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--dim)",animation:"pulse 2s infinite" }}/>
            </div>
          </div>
        </div>

        {/* Check-in */}
        <div className="fu d3" onClick={()=>go("checkin")} style={{
          border:"1px solid var(--line2)",padding:"13px 16px",marginBottom:14,cursor:"pointer",
          background:"var(--bg2)",display:"flex",justifyContent:"space-between",alignItems:"center"
        }}>
          <div>
            <Mono style={{ display:"block",marginBottom:4,color:"var(--soft)" }}>{copy.components.home.dateWindow.label}</Mono>
            <span style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--white)" }}>{copy.components.home.dateWindow.action}</span>
          </div>
          <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--soft)",animation:"pulse 1.5s infinite" }}/>
        </div>

        {/* Pending */}
        <div className="fu d4" style={{ marginBottom:14 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
            <Mono>{copy.components.home.waiting.label}</Mono>
            <button onClick={()=>go("matches")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em" }}>{copy.components.home.waiting.seeAll}</button>
          </div>
          {["Amara, 28 · 1.1 mi","Lily, 31 · 3.8 mi"].map((n,i)=>(
            <div key={i} onClick={()=>go("matches")} style={{
              border:"1px solid var(--line)",padding:"12px 14px",marginBottom:8,cursor:"pointer",
              display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg1)"
            }}>
              <span style={{ fontFamily:"var(--serif)",fontSize:17,fontStyle:"italic",color:"var(--soft)" }}>{n}</span>
              <Mono style={{ fontSize:8 }}>{copy.components.home.waiting.respond}</Mono>
            </div>
          ))}
        </div>

        {/* Field notes nudge */}
        <div className="fu d5" onClick={()=>go("post-date")} style={{
          border:"1px dashed var(--line2)",padding:"14px 16px",cursor:"pointer",background:"var(--bg1)"
        }}>
          <Mono style={{ display:"block",marginBottom:5 }}>{copy.components.home.fieldNotesCTA.label}</Mono>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)",lineHeight:1.6 }}>{copy.components.home.fieldNotesCTA.message}</p>
        </div>
      </Screen>
    );
  }
}

export default Home;