import { useState } from "react";
import { Screen, Mono, Rule, Btn } from "../../../src/components/UI.jsx";
import copy from '../copy.js';

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
  { label:copy.components.fieldNotes.patterns.youFeelMostYourself,        insight:"walks and unhurried venues"            },
  { label:copy.components.fieldNotes.patterns.commonThread,     insight:"people who don't perform"              },
  { label:copy.components.fieldNotes.patterns.youFeelFlat,                  insight:"the energy is effortful from the start" },
  { label:copy.components.fieldNotes.patterns.datesCompleted,                     insight:"4  ·  100% attendance"                 },
  { label:copy.components.fieldNotes.patterns.mostCommonVibes,      insight:"Calm, then Hopeful"                    },
];

const calDateNums = [4,11,18,25];

export const Notes = ({ go }) => {
  const [view,  setView]  = useState("list");
  const [entry, setEntry] = useState(null);

  const TabBtn = ({ id, label }) => (
    <button onClick={()=>setView(id)} style={{
      background:"transparent",border:"none",cursor:"pointer",
      fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.14em",textTransform:"uppercase",
      color:view===id?"var(--white)":"var(--dim)",
      borderBottom:`1px solid ${view===id?"var(--soft)":"transparent"}`,
      padding:"8px 0",transition:"all .14s"
    }}>{label}</button>
  );

  if(entry!==null) {
    const e = ENTRIES[entry];
    return (
      <Screen style={{ paddingBottom:90 }}>
        <button onClick={()=>setEntry(null)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:8,color:"var(--dim)",letterSpacing:"0.1em",marginBottom:26,padding:0,textAlign:"left" }}>{copy.components.fieldNotes.entryDetail.back}</button>
        <div className="fu d1">
          <Mono style={{ display:"block",marginBottom:8 }}>{e.date} · {e.venue}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:44,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1,marginBottom:14 }}>{e.name}</h2>
          <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:24 }}>
            {e.vibe.map(v=><span key={v} style={{ border:"1px solid var(--line)",fontFamily:"var(--mono)",fontSize:8,color:"var(--soft)",letterSpacing:"0.1em",padding:"5px 10px" }}>{v}</span>)}
          </div>
        </div>
        {[ [copy.components.fieldNotes.entryDetail.whatWasGreat,e.great], [copy.components.fieldNotes.entryDetail.whatWasNotSoGreat,e.notso] ].map(([l,v])=>v?(
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
        <Mono>{copy.components.fieldNotes.header.sectionLabel}</Mono>
        <h2 style={{ margin:"12px 0 16px" }}>{copy.components.fieldNotes.header.title}</h2>
        <div style={{ display:"flex",gap:24 }}>
          <TabBtn id="list" label={copy.components.fieldNotes.header.tabs.entries}/>
          <TabBtn id="calendar" label={copy.components.fieldNotes.header.tabs.calendar}/>
          <TabBtn id="patterns" label={copy.components.fieldNotes.header.tabs.patterns}/>
        </div>
      </div>
      <Rule style={{ marginBottom:18 }}/>

      {view==="list"&&(
        <div>
          {ENTRIES.map((e,i)=>(
            <div key={i} className="fu" style={{ animationDelay:`${i*.07}s`,marginBottom:9 }}>
              <div onClick={()=>setEntry(i)} style={{
                border:"1px solid var(--line)",padding:"15px 14px",cursor:"pointer",
                background:"var(--bg1)",display:"flex",justifyContent:"space-between",alignItems:"center"
              }}>
                <div>
                  <p style={{ fontFamily:"var(--serif)",fontSize:22,fontStyle:"italic",color:"var(--white)",marginBottom:5 }}>{e.name}</p>
                  <Mono style={{ display:"block",marginBottom:6 }}>{e.date} · {e.venue}</Mono>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {e.vibe.map(v=><Mono key={v} style={{ fontSize:7,color:"var(--soft)" }}>{v}</Mono>)}
                  </div>
                </div>
                <p style={{ fontFamily:"var(--serif)",fontSize:12,fontStyle:"italic",color:"var(--dim)",maxWidth:120,textAlign:"right",lineHeight:1.5 }}>{e.great.slice(0,38)}…</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop:14 }}>
            <Btn onClick={()=>go("post-date")}>{copy.components.fieldNotes.newEntry}</Btn>
          </div>
        </div>
      )}

      {view==="calendar"&&(
        <div className="fi">
          <Mono style={{ display:"block",marginBottom:14 }}>{copy.components.fieldNotes.calendar.monthYear}</Mono>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:22 }}>
            {copy.components.fieldNotes.calendar.weekDays.map(d=>(
              <div key={d} style={{ fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",textAlign:"center",paddingBottom:5 }}>{d}</div>
            ))}
            {Array(6).fill(null).map((_,i)=><div key={`e${i}`}/>)}
            {Array(31).fill(null).map((_,i)=>{
              const day=i+1, has=calDateNums.includes(day);
              return (
                <div key={day} onClick={has?()=>setEntry(calDateNums.indexOf(day)):undefined} style={{
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
            {copy.components.fieldNotes.patterns.intro.replace('{count}', ENTRIES.length)}
          </p>
          {PATTERNS.map((p,i)=>(
            <div key={i} style={{ borderLeft:"1px solid var(--line2)",paddingLeft:14,marginBottom:24 }}>
              <Mono style={{ display:"block",marginBottom:8 }}>{p.label}</Mono>
              <p style={{ fontFamily:"var(--serif)",fontSize:19,fontStyle:"italic",color:"var(--white)",lineHeight:1.4 }}>{p.insight}</p>
            </div>
          ))}
          <Rule style={{ margin:"24px 0 18px" }}/>
          <p style={{ fontFamily:"var(--serif)",fontSize:12,fontStyle:"italic",color:"var(--dim)",lineHeight:1.7 }}>{copy.components.fieldNotes.patterns.privacy}</p>
        </div>
      )}
    </Screen>
  );
};

export default Notes;