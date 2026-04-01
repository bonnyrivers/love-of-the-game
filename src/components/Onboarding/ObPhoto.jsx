// ══════════════════════════════════════════════════════════════════════════════
// PHOTO — B&W filter on upload, live verify separate

import { Mono, Screen } from "../UI";
import { Btn } from "../UI";
import { useState, useRef } from "react";
import copy from '../../copy.js';
import './ObPhoto.css';

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
        <Mono>{copy.components.onboarding.obPhoto.step}</Mono>
        <h2 className="ob-photo-h2">{copy.components.onboarding.obPhoto.title}<br/>{copy.components.onboarding.obPhoto.subtitle}</h2>
        <p className="ob-photo-p-description">
          {copy.components.onboarding.obPhoto.description}
        </p>
      </div>

      {/* Upload */}
      <div className="fu d2" style={{ marginBottom:10 }}>
        <Mono style={{ display:"block",marginBottom:10 }}>{copy.components.onboarding.obPhoto.profilePhoto.label}</Mono>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }}/>
        {preview ? (
          <div style={{ position:"relative",marginBottom:10 }}>
            <img src={preview} alt="preview" className="bw-photo" style={{ width:"100%",height:220,objectFit:"cover",display:"block",border:"1px solid var(--line)" }}/>
            <button onClick={()=>{ setPreview(null); setUploaded(false); }} className="ob-photo-btn-retake">{copy.components.onboarding.obPhoto.profilePhoto.retake}</button>
            <div className="ob-photo-badge">{copy.components.onboarding.obPhoto.profilePhoto.badge}</div>
          </div>
        ) : (
          <div onClick={()=>fileRef.current.click()} className="ob-photo-upload-area">
            <span className="ob-photo-span-upload-icon">◫</span>
            <Mono style={{ fontSize:8 }}>{copy.components.onboarding.obPhoto.profilePhoto.choose}</Mono>
          </div>
        )}
      </div>

      {/* Live verification */}
      <div className="fu d3" style={{ marginBottom:24 }}>
        <Mono style={{ display:"block",marginBottom:10 }}>{copy.components.onboarding.obPhoto.liveVerification.label} <span className="ob-photo-span-required">{copy.components.onboarding.obPhoto.liveVerification.required}</span></Mono>
        <div onClick={()=>{ if(!live) setLiveOpen(o=>!o); }} className={`ob-photo-live-area ${live ? 'selected' : ''}`}>
          <span className={`ob-photo-span-live-icon ${live ? 'selected' : ''}`}>◉</span>
          <div className="ob-photo-div-live-content">
            <p className={`ob-photo-p-live-text ${live ? 'selected' : ''}`}>
              {live ? copy.components.onboarding.obPhoto.liveVerification.verified : copy.components.onboarding.obPhoto.liveVerification.prompt}
            </p>
            <p className="ob-photo-p-privacy">{copy.components.onboarding.obPhoto.liveVerification.privacy}</p>
          </div>
          {live&&<span className="ob-photo-span-checkmark">✓</span>}
        </div>
        {liveOpen&&!live&&(
          <div className="fi ob-photo-capture-area" onClick={()=>{ setLive(true); setLiveOpen(false); }}>
            <div className="ob-photo-pulse-container">
              <div className="ob-photo-pulse-circle"/>
            </div>
            <Mono style={{ fontSize:8 }}>{copy.components.onboarding.obPhoto.liveVerification.capture}</Mono>
            {[["top:8px","left:8px","borderTop","borderLeft"],["top:8px","right:8px","borderTop","borderRight"],["bottom:8px","left:8px","borderBottom","borderLeft"],["bottom:8px","right:8px","borderBottom","borderRight"]].map(([a,b,c,d],i)=>(
              <div key={i} className="ob-photo-corner-indicator" style={{ position:"absolute",[a.split(":")[0]]:a.split(":")[1],[b.split(":")[0]]:b.split(":")[1],width:14,height:14,[c]:"1px solid var(--dim)",[d]:"1px solid var(--dim)" }}/>
            ))}
          </div>
        )}
      </div>

      <Btn onClick={()=>{ set({photoVerified:true}); go("ob-avail"); }} disabled={!uploaded||!live}>{copy.components.onboarding.obPhoto.continue}</Btn>
    </Screen>
  );
};

export default ObPhoto;