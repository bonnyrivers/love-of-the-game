// @ts-nocheck
import React from 'react';
import { Screen, Mono, Rule, Btn } from "./UI";
import "./Notes.css";

// ══════════════════════════════════════════════════════════════════════════════
// 12. FIELD NOTES

// ══════════════════════════════════════════════════════════════════════════════
const ENTRIES = [
  { date:"Mar 4",  name:"Selin",  venue:"Dimes · LES",      vibe:["◎ Seen","○ Hopeful"],       great:"Her complete lack of performance — she just talked.", notso:"Felt like I was interviewing her at points.", free:"It's rare someone doesn't perform. I noticed." },
  { date:"Feb 25", name:"Priya",  venue:"Foragers · DUMBO",  vibe:["◌ Calm"],                   great:"We walked to the bridge after. Didn't plan to.",       notso:"Couldn't tell if the interest was real.",         free:"" },
  { date:"Feb 18", name:"Zoe",    venue:"Café Henrie · LES", vibe:["◌ Calm","▽ Flat"],          great:"Two hours felt like twenty minutes.",                  notso:"No spark, no reason.",                            free:"Sometimes a good conversation is enough." },
  { date:"Feb 11", name:"Maria",  venue:"Dimes · LES",       vibe:["▽ Flat"],                   great:"She was kind.",                                        notso:"Everything felt effortful.",                       free:"" },
];

const PATTERNS = [
  { label:"You feel most yourself after",        insight:"walks and unhurried venues"            },
  { label:"Common thread in what was great",     insight:"people who don't perform"              },
  { label:"You feel flat when",                  insight:"the energy is effortful from the start" },
  { label:"Dates completed",                     insight:"4  ·  100% attendance"                 },
  { label:"Most common vibes walking away",      insight:"Calm, then Hopeful"                    },
];

const calDateNums = [4,11,18,25];

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "list",
      entry: null
    };
  }

  setView = (v) => this.setState({ view: v });

  setEntry = (e) => this.setState({ entry: e });

  render() {
    const { view, entry } = this.state;
    const { go } = this.props;

    const TabBtn = ({ id, label }) => (
      <button
        onClick={() => this.setView(id)}
        className={`notes-tab-btn${view === id ? " active" : ""}`}
      >
        {label}
      </button>
    );

    if(entry!==null) {
      const e = ENTRIES[entry];
      return (
        <Screen style={{ paddingBottom:90 }}>
          <button
            onClick={() => this.setEntry(null)}
            className="notes-back-btn"
          >
            ← back
          </button>
          <div className="fu d1">
            <Mono style={{ display:"block",marginBottom:8 }}>{e.date} · {e.venue}</Mono>
            <h2 style={{ fontFamily:"var(--serif)",fontSize:44,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1,marginBottom:14 }}>{e.name}</h2>
            <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:24 }}>
              {e.vibe.map(v=><span key={v} style={{ border:"1px solid var(--line)",fontFamily:"var(--mono)",fontSize:8,color:"var(--soft)",letterSpacing:"0.1em",padding:"5px 10px" }}>{v}</span>)}
            </div>
          </div>
          {[["What was great",e.great],["What was not so great",e.notso]].map(([l,v])=>v?(
            <div key={l} className="fu d2" style={{ marginBottom:22 }}>
              <Mono style={{ display:"block",marginBottom:8 }}>{l}</Mono>
              <p style={{ fontFamily:"var(--serif)",fontSize:17,fontStyle:"italic",color:"var(--text)",lineHeight:1.65 }}>{v}</p>
            </div>
          ):null)}
          {e.free&&(
            <div className="fu d3" style={{ borderLeft:"1px solid var(--line)",paddingLeft:14,marginTop:6 }}>
              <p style={{ fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",color:"var(--mid)",lineHeight:1.7 }}>{e.free}</p>
            </div>
          )}
        </Screen>
      );
    }

    return (
      <Screen style={{ paddingBottom:90 }}>
        <div className="fu d1" style={{ marginBottom:22 }}>
          <Mono>Love of the Game</Mono>
          <h2 style={{ margin:"12px 0 16px" }}>Field notes.</h2>
          <div style={{ display:"flex",gap:24 }}>
            <TabBtn id="list" label="Entries"/>
            <TabBtn id="calendar" label="Calendar"/>
            <TabBtn id="patterns" label="Patterns"/>
          </div>
        </div>
        <Rule style={{ marginBottom:18 }}/>

        {view==="list"&&(
          <div>
            {ENTRIES.map((e,i)=>(
              <div key={i} className="fu" style={{ animationDelay:`${i*.07}s`,marginBottom:9 }}>
                <div
                  onClick={() => this.setEntry(i)}
                  className="notes-entry"
                >
                  <div>
                    <p className="notes-entry-name">{e.name}</p>
                    <Mono className="notes-entry-venue">{e.date} · {e.venue}</Mono>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {e.vibe.map(v => (
                        <Mono key={v} className="notes-entry-vibe">{v}</Mono>
                      ))}
                    </div>
                  </div>
                  <p className="notes-entry-great">{e.great.slice(0, 38)}…</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop:14 }}>
              <Btn onClick={()=>this.props.go("post-date")}>+ New entry</Btn>
            </div>
          </div>
        )}

        {view==="calendar"&&(
          <div className="fi">
            <Mono style={{ display:"block",marginBottom:14 }}>March 2025</Mono>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:22 }}>
              {["Su","M","T","W","Th","F","Sa"].map(d=>(
                <div key={d} style={{ fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",textAlign:"center",paddingBottom:5 }}>{d}</div>
              ))}
              {Array(6).fill(null).map((_,i)=><div key={`e${i}`}/>)}
              {Array(31).fill(null).map((_,i)=>{
                const day=i+1, has=calDateNums.includes(day);
                return (
                  <div key={day} onClick={has?()=>this.setEntry(calDateNums.indexOf(day)):undefined} style={{
                    height:34,border:`1px solid ${has?"var(--soft)":"var(--line)"}`,
                    background:has?"var(--bg2)":"transparent",
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                    cursor:has?"pointer":"default",gap:3
                  }}>
                    <span style={{ fontFamily:"var(--mono)",fontSize:8,color:has?"var(--white)":"var(--dim)" }}>{day}</span>
                    {has&&<div style={{ width:3,height:3,borderRadius:"50%",background:"var(--soft)" }}/>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view==="patterns"&&(
          <div className="fi">
            <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.7,marginBottom:22 }}>
              Based on your {ENTRIES.length} entries, here's what we're noticing — to help you make better dates.
            </p>
            {PATTERNS.map((p,i)=>(
              <div key={i} className="notes-pattern">
                <Mono style={{ display: "block", marginBottom: 8 }}>{p.label}</Mono>
                <p style={{ fontFamily: "var(--serif)", fontSize: 19, fontStyle: "italic", color: "var(--white)", lineHeight: 1.4 }}>{p.insight}</p>
              </div>
            ))}
            <Rule style={{ margin:"24px 0 18px" }}/>
            <p style={{ fontFamily:"var(--serif)",fontSize:12,fontStyle:"italic",color:"var(--dim)",lineHeight:1.7 }}>Private. Never shared. Never used for matching. Just for you.</p>
          </div>
        )}
      </Screen>
    );
  }
}

export default Notes;