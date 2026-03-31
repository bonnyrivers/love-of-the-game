import React from 'react';
import { Screen, Mono } from "./UI";
import copy from '../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
// 13. PROFILE
// ══════════════════════════════════════════════════════════════════════════════
class Profile extends React.Component {
  render() {
    const { go, state } = this.props;
    return (
      <Screen style={{ paddingBottom:90 }}>
        <div className="fu d1" style={{ marginBottom:24 }}>
          <Mono>{copy.components.profile.header.label}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:44,fontStyle:"italic",fontWeight:400,color:"var(--white)",marginTop:10,lineHeight:1 }}>{state.name||copy.components.profile.header.nameDefault}</h2>
          <Mono style={{ marginTop:8,display:"block" }}>{state.age||copy.shared.genericLabels.dash} · {state.sign||copy.components.profile.header.noSignSet} · {state.radius||5} {copy.components.profile.header.distanceUnit}</Mono>
        </div>
        <div className="fu d2" style={{ border:"1px solid var(--line)",height:165,background:"var(--bg1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,position:"relative" }}>
          <span style={{ color:"var(--line2)",fontSize:24 }}>◯</span>
          <div style={{ position:"absolute",bottom:8,left:8,background:"var(--bg)",border:"1px solid var(--line2)",fontFamily:"var(--mono)",fontSize:7,color:"var(--soft)",letterSpacing:"0.1em",padding:"4px 8px" }}>{copy.components.profile.profile.label}</div>
          <button style={{ position:"absolute",bottom:8,right:8,border:"1px solid var(--line2)",background:"var(--bg)",fontFamily:"var(--mono)",fontSize:7,letterSpacing:"0.1em",color:"var(--dim)",padding:"5px 9px",cursor:"pointer" }}>{copy.components.profile.profile.editButton}</button>
        </div>
        {/* Stats — private only */}
        <div className="fu d3" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14 }}>
          {[[copy.components.profile.stats.datesAttended,"4"],[copy.components.profile.stats.standing,"Good"],[copy.components.profile.stats.bonusMatches,"Active"],[copy.components.profile.stats.lockouts,"0"]].map(([l,v])=>(
            <div key={l} style={{ border:"1px solid var(--line)",padding:"12px 13px",background:"var(--bg1)" }}>
              <Mono style={{ display:"block",marginBottom:5 }}>{l}</Mono>
              <span style={{ fontFamily:"var(--serif)",fontSize:19,fontStyle:"italic",color:"var(--white)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="fu d3" style={{ border:"1px solid var(--line2)",padding:"10px 12px",marginBottom:16,background:"var(--bg2)" }}>
          <Mono style={{ fontSize:7 }}>{copy.components.profile.stats.attendancePrivacyNote}</Mono>
        </div>
        {[
          { label:copy.components.profile.details.lookingFor,       val:state.seeking?.join(", ")||copy.shared.genericLabels.dash                                          },
          { label:copy.components.profile.details.profession,        val:state.profession||copy.components.profile.details.professionNotSet                                            },
          { label:copy.components.profile.details.dateBucketList,  val:state.bucket?.length?copy.components.profile.details.dateBucketSelected.replace('{count}', state.bucket.length):copy.components.profile.details.dateBucketNotSet },
          { label:copy.components.profile.details.loveLanguage,     val:state.loveGive?copy.components.profile.details.loveLanguageGives.replace('{value}', state.loveGive):copy.components.profile.details.loveLanguageNotAnswered               },
          { label:copy.components.profile.details.quickProfile,     val:`${state.quickAnswers?Object.keys(state.quickAnswers).length:0} of 5 answered` },
        ].map(({ label, val }) => (
          <div key={label} className="fu d3" style={{ border:"1px solid var(--line)",padding:"13px 14px",marginBottom:8,background:"var(--bg1)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <Mono style={{ display:"block",marginBottom:4 }}>{label}</Mono>
              <span style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)" }}>{val}</span>
            </div>
            <Mono style={{ fontSize:8 }}>{copy.components.profile.details.edit}</Mono>
          </div>
        ))}
        <div className="fu d4" style={{ border:"1px dashed var(--line2)",padding:"16px 14px",marginTop:8,background:"var(--bg1)" }}>
          <Mono style={{ display:"block",marginBottom:5 }}>{copy.components.profile.deepQuiz.title}</Mono>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)",lineHeight:1.6,marginBottom:12 }}>{copy.components.profile.deepQuiz.description}</p>
          <button onClick={()=>go("deep-quiz")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--soft)",cursor:"pointer",padding:0 }}>{copy.components.profile.deepQuiz.begin}</button>
        </div>
        <div style={{ marginTop:22,display:"flex",gap:20 }}>
          <button onClick={()=>go("lockout")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",cursor:"pointer",textDecoration:"underline",letterSpacing:"0.1em" }}>{copy.components.profile.preview.lockout}</button>
          <button onClick={()=>go("checkin")} style={{ background:"none",border:"none",fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",cursor:"pointer",textDecoration:"underline",letterSpacing:"0.1em" }}>{copy.components.profile.preview.checkin}</button>
        </div>
      </Screen>
    );
  }
}

export default Profile;