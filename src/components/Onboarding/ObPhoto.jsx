// ══════════════════════════════════════════════════════════════════════════════
// PHOTO — B&W filter on upload, live verify separate

import { Mono, Screen } from "../UI";
import { Btn } from "../UI";
import { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
const ObPhoto = ({ go, set }) => {
  const [uploaded, setUploaded] = useState(false);
  const [live,     setLive]     = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);
  const [preview,  setPreview]  = useState(null);
  const fileRef = useRef();

  const handleFile = e => {
    const f = e.target.files[0];
    if(!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    setUploaded(true);
  };

  return (
    <Screen>
      <div className="fu d1" style={{ marginBottom:24 }}>
        <Mono>5 — 6</Mono>
        <h2 style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)",margin:"14px 0 6px",lineHeight:1.1 }}>Your face.<br/>Your real one.</h2>
        <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",lineHeight:1.6 }}>
          Profile photo is shown in black & white — everyone on the same playing field.
          Live capture is for verification only, never shared.
        </p>
      </div>

      {/* Upload */}
      <div className="fu d2" style={{ marginBottom:10 }}>
        <Mono style={{ display:"block",marginBottom:10 }}>Profile photo</Mono>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }}/>
        {preview ? (
          <div style={{ position:"relative",marginBottom:10 }}>
            <img src={preview} alt="preview" className="bw-photo" style={{ width:"100%",height:220,objectFit:"cover",display:"block",border:"1px solid var(--line)" }}/>
            <button onClick={()=>{ setPreview(null); setUploaded(false); }} style={{
              position:"absolute",top:8,right:8,background:"var(--bg)",border:"1px solid var(--line2)",
              fontFamily:"var(--mono)",fontSize:7,color:"var(--dim)",letterSpacing:"0.1em",
              padding:"5px 9px",cursor:"pointer"
            }}>RETAKE</button>
            <div style={{ position:"absolute",bottom:8,left:8,background:"var(--bg)",border:"1px solid var(--line2)",fontFamily:"var(--mono)",fontSize:7,color:"var(--soft)",letterSpacing:"0.1em",padding:"4px 8px" }}>B&W · PROFILE</div>
          </div>
        ) : (
          <div onClick={()=>fileRef.current.click()} style={{
            border:"1px dashed var(--line2)",height:160,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",cursor:"pointer",gap:10,marginBottom:10,
            background:"var(--bg1)",transition:"border-color .15s"
          }}>
            <span style={{ fontSize:22,color:"var(--dim)" }}>◫</span>
            <Mono style={{ fontSize:8 }}>Choose photo</Mono>
          </div>
        )}
      </div>

      {/* Live verification */}
      <div className="fu d3" style={{ marginBottom:24 }}>
        <Mono style={{ display:"block",marginBottom:10 }}>Live verification <span style={{ color:"var(--dim)" }}>— required</span></Mono>
        <div onClick={()=>{ if(!live) setLiveOpen(o=>!o); }} style={{
          border:`1px solid ${live?"var(--soft)":"var(--line)"}`,
          padding:"18px 16px",cursor:live?"default":"pointer",
          background:live?"var(--bg2)":"transparent",transition:"all .16s",
          display:"flex",alignItems:"center",gap:14
        }}>
          <span style={{ fontSize:18,color:live?"var(--white)":"var(--dim)" }}>◉</span>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:live?"var(--white)":"var(--mid)" }}>
              {live ? "Verified — you're real." : "Take a quick selfie to confirm it's you"}
            </p>
            <p style={{ fontFamily:"var(--serif)",fontSize:12,fontStyle:"italic",color:"var(--dim)",marginTop:3 }}>Not stored. Not shown to anyone.</p>
          </div>
          {live&&<span style={{ color:"var(--white)" }}>✓</span>}
        </div>
        {liveOpen&&!live&&(
          <div className="fi" style={{
            border:"1px solid var(--line)",background:"var(--bg1)",height:170,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            marginTop:8,cursor:"pointer",position:"relative",overflow:"hidden"
          }} onClick={()=>{ setLive(true); setLiveOpen(false); }}>
            <div style={{ width:44,height:44,borderRadius:"50%",border:"1px solid var(--line2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
              <div style={{ width:10,height:10,borderRadius:"50%",background:"var(--dim)",animation:"pulse 1.5s infinite" }}/>
            </div>
            <Mono style={{ fontSize:8 }}>Tap to capture</Mono>
            {[["top:8px","left:8px","borderTop","borderLeft"],["top:8px","right:8px","borderTop","borderRight"],["bottom:8px","left:8px","borderBottom","borderLeft"],["bottom:8px","right:8px","borderBottom","borderRight"]].map(([a,b,c,d],i)=>(
              <div key={i} style={{ position:"absolute",[a.split(":")[0]]:a.split(":")[1],[b.split(":")[0]]:b.split(":")[1],width:14,height:14,[c]:"1px solid var(--dim)",[d]:"1px solid var(--dim)" }}/>
            ))}
          </div>
        )}
      </div>

      <Btn onClick={()=>{ set({photoVerified:true}); go("ob-avail"); }} disabled={!uploaded||!live}>Continue →</Btn>
    </Screen>
  );
};

export default ObPhoto;