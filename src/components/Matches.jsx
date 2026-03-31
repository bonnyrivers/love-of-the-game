import React from 'react';
import { Screen, Mono, Btn, Rule } from "./UI";

// ══════════════════════════════════════════════════════════════════════════════
// MATCHES — no % scores, "why matched" bubble, availability request

// ══════════════════════════════════════════════════════════════════════════════
const MATCHES = [
  { name:"Selin",  age:27, dist:"2.4 mi", sign:"Scorpio",  hd:"Generator",  slots:["Tue Eve ★","Thu Eve"],      scheduleOverlap:100, why:"Both value depth and emotional presence. Date styles overlap — dinner + walks. Love language match: quality time.", status:"confirmed", photos:[null,null] },
  { name:"Amara",  age:28, dist:"1.1 mi", sign:"Leo",      hd:"Projector",  slots:["Wed Aftn","Fri Eve ★"],     scheduleOverlap:80,  why:"Shared bucket list: concerts, galleries, day trips. Both open to wherever it goes. Strong lifestyle match.", status:"pending",   photos:[null,null] },
  { name:"Lily",   age:31, dist:"3.8 mi", sign:"Pisces",   hd:"Manifestor", slots:["Sat Morn ★"],               scheduleOverlap:60,  why:"Both serious about dating with intention. Receive love the same way — quality time, fully present.", status:"pending",   photos:[null,null] },
  { name:"Joelle", age:29, dist:"0.9 mi", sign:"Gemini",   hd:"Reflector",  slots:["Sun Eve ★"],                scheduleOverlap:90,  why:"Matching date energy — spontaneous, active. Bucket list overlaps on 6 items. Giving you a Friday night.", status:"pending",   photos:[null,null] },
  { name:"Remi",   age:26, dist:"4.1 mi", sign:"Aquarius", hd:"Generator",  slots:["Fri Night ★","Sat Aftn ★"], scheduleOverlap:70,  why:"Both want a real relationship. Physical warmth as a shared love language. Same music and food interests.", status:"pending",   photos:[null,null] },
];

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: null,
      reqOpen: false,
      reqMsg: ""
    };
  }

  setSel = (s) => this.setState({ sel: s });

  setReqOpen = (o) => this.setState({ reqOpen: o });

  setReqMsg = (m) => this.setState({ reqMsg: m });

  render() {
    const { sel, reqOpen, reqMsg } = this.state;
    const { go } = this.props;

    if(sel!==null) {
      const m = MATCHES[sel];
      return (
        <Screen style={{ paddingBottom:90 }}>
          <button onClick={()=>this.setSel(null)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em",marginBottom:24,padding:0,textAlign:"left" }}>← back</button>
          <div className="fu d1">
            <Mono style={{ display:"block",marginBottom:7 }}>{m.dist} · {m.sign} · {m.hd}</Mono>
            <h2 style={{ fontFamily:"var(--serif)",fontSize:50,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1,marginBottom:4 }}>{m.name}</h2>
            <Mono>{m.age} years old</Mono>
          </div>

          {/* B&W photos — up to 3 */}
          <div className="fu d2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,margin:"20px 0" }}>
            {[0,1,2].map(i=>(
              <div key={i} style={ {
                border:"1px solid var(--line)",background:"var(--bg1)",
                height: i===0?220:140,
                gridColumn: i===0?"1 / span 2":"auto",
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                <span style={{ color:"var(--line2)",fontSize:22 }}>◯</span>
              </div>
            ))}
          </div>

          {/* Why matched — no percentages */}
          <div className="fu d3" style={{ background:"var(--bg2)",border:"1px solid var(--line)",padding:"16px",marginBottom:18 }}>
            <Mono style={{ display:"block",marginBottom:8 }}>Why we matched you</Mono>
            <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--text)",lineHeight:1.65 }}>{m.why}</p>
          </div>

          {/* Schedule overlap — the one stat */}
          <div className="fu d3" style={{ border:"1px solid var(--line)",padding:"14px 16px",background:"var(--bg1)",marginBottom:18 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <Mono>Schedule overlap this week</Mono>
              <Mono style={{ color:"var(--white)" }}>{m.scheduleOverlap}%</Mono>
            </div>
            <div style={{ height:1,background:"var(--line)" }}>
              <div style={{ height:1,background:"var(--soft)",width:`${m.scheduleOverlap}%`,transition:"width 1s ease" }}/>
            </div>
            <div style={{ display:"flex",gap:8,marginTop:12,flexWrap:"wrap" }}>
              {m.slots.map(s=>(
                <span key={s} style={{ border:"1px solid var(--line2)",fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.1em",color:s.includes("★")?"var(--white)":"var(--dim)",padding:"6px 11px" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Availability request */}
          <div className="fu d4" style={{ marginBottom:20 }}>
            <button onClick={()=>this.setReqOpen(!this.state.reqOpen)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em",padding:0,textDecoration:"underline" }}>
              {reqOpen?"Cancel request":"Request different availability →"}
            </button>
            {reqOpen&&(
              <div className="fi" style={{ marginTop:12 }}>
                <p style={{ fontFamily:"var(--serif)",fontSize:14,fontStyle:"italic",color:"var(--mid)",marginBottom:10,lineHeight:1.5 }}>
                  Send a one-time message asking {m.name} to open a specific window. They can accept or ignore.
                </p>
                <textarea value={reqMsg} onChange={e=>this.setReqMsg(e.target.value)} rows={2}
                  placeholder={`e.g. "Would you be free Tuesday evening instead?"`}
                  style={{ width:"100%",background:"var(--bg1)",border:"1px solid var(--line)",color:"var(--text)",fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",padding:"10px 12px",outline:"none",resize:"none",lineHeight:1.5,marginBottom:10 }}
                  onFocus={e=>e.target.style.borderColor="var(--soft)"}
                  onBlur={e=>e.target.style.borderColor="var(--line)"}
                />
                <Btn small style={{ width:"auto" }} disabled={!reqMsg.trim()} onClick={()=>{ this.setReqOpen(false); this.setReqMsg(""); }}>Send request</Btn>
              </div>
            )}
          </div>

          <Rule style={{ marginBottom:18 }}/>
          {m.status==="confirmed"
            ? <Mono style={{ textAlign:"center",display:"block",padding:"12px 0",color:"var(--soft)" }}>Date confirmed ✓</Mono>
            : <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <Btn onClick={()=>this.setSel(null)}>Accept this match</Btn>
                <Btn ghost onClick={()=>this.setSel(null)}>Pass</Btn>
              </div>
          }
        </Screen>
      );
    }

    return (
      <Screen style={{ paddingBottom:90 }}>
        <div className="fu d1" style={{ marginBottom:26 }}>
          <Mono>This week</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:38,fontStyle:"italic",fontWeight:400,color:"var(--white)",margin:"12px 0 6px" }}>Your matches.</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic" }}>3 base · 2 bonus from attendance. Both must accept to confirm.</p>
        </div>
        {MATCHES.map((m,i)=>(
          <div key={i} className="fu" style={{ animationDelay:`${i*.07+.08}s`,marginBottom:8 }}>
            <div onClick={()=>this.setSel(i)} style={{
              border:`1px solid ${m.status==="confirmed"?"var(--soft)":"var(--line)"}`,
              padding:"16px 14px",cursor:"pointer",background:"var(--bg1)",
              display:"flex",justifyContent:"space-between",alignItems:"center"
            }}>
              <div>
                <p style={{ fontFamily:"var(--serif)",fontSize:22,fontStyle:"italic",color:"var(--white)",marginBottom:5 }}>{m.name}, {m.age}</p>
                <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <Mono>{m.dist}</Mono>
                  {m.slots.some(s=>s.includes("★"))&&<Mono style={{ color:"var(--soft)",fontSize:8 }}>★ premium slot</Mono>}
                </div>
              </div>
              <Mono style={{ color:m.status==="confirmed"?"var(--soft)":"var(--dim)" }}>
                {m.status==="confirmed"?"confirmed ✓":"view →"}
              </Mono>
            </div>
          </div>
        ))}
      </Screen>
    );
  }
}

export default Matches;