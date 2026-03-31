// ══════════════════════════════════════════════════════════════════════════════
// LIFESTYLE — reframed as "what you want to do on dates + bucket list"

import React from 'react';
import { Mono, Screen, Chip, Btn } from "../UI";
import copy from '../../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
class ObLifestyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prof: props.state.profession || null,
      bucket: props.state.bucket || [],
      radius: props.state.radius || 5
    };
  }

  setProf = (p) => this.setState({ prof: p });

  toggle = (v) => this.setState((prevState) => ({
    bucket: prevState.bucket.includes(v)
      ? prevState.bucket.filter(x => x !== v)
      : [...prevState.bucket, v]
  }));

  setRadius = (r) => this.setState({ radius: r });

  render() {
    const { prof, bucket, radius } = this.state;
    const bucketItems = copy.components.onboarding.obLifestyle.bucketList.items;

    return (
      <Screen>
        <div className="fu d1" style={{ marginBottom:24 }}>
          <Mono>{copy.components.onboarding.obLifestyle.step}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)",margin:"14px 0 6px",lineHeight:1.1 }}>{copy.components.onboarding.obLifestyle.title}</h2>
          <p style={{ fontFamily:"var(--serif)",fontSize:14,color:"var(--mid)",fontStyle:"italic",lineHeight:1.6 }}>
            {copy.components.onboarding.obLifestyle.subtitle}
          </p>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:26,flex:1 }}>
          <div className="fu d2">
            <Mono style={{ display:"block",marginBottom:12 }}>{copy.components.onboarding.obLifestyle.profession.label}</Mono>
            <p style={{ fontFamily:"var(--serif)",fontSize:13,fontStyle:"italic",color:"var(--dim)",marginBottom:12 }}>{copy.components.onboarding.obLifestyle.profession.hint}</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {copy.components.onboarding.obLifestyle.profession.options.map(p=><Chip key={p} label={p} active={prof===p} onClick={()=>this.setProf(p)}/>)}
            </div>
          </div>

          <div className="fu d3">
            <Mono style={{ display:"block",marginBottom:4 }}>{copy.components.onboarding.obLifestyle.bucketList.label}</Mono>
            <p style={{ fontFamily:"var(--serif)",fontSize:13,fontStyle:"italic",color:"var(--dim)",marginBottom:14 }}>{copy.components.onboarding.obLifestyle.bucketList.hint}</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {bucketItems.map(c=><Chip key={c} label={c} active={bucket.includes(c)} onClick={()=>this.toggle(c)}/>)}
            </div>
          </div>

          <div className="fu d4">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
              <Mono>{copy.components.onboarding.obLifestyle.matchRadius.label}</Mono>
              <Mono style={{ color:"var(--soft)" }}>{radius} {copy.components.onboarding.obLifestyle.matchRadius.unit}</Mono>
            </div>
            <input type="range" min={1} max={25} value={radius} onChange={e=>this.setRadius(+e.target.value)}
              style={{ width:"100%",accentColor:"var(--white)",cursor:"pointer" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
              <Mono>{copy.components.onboarding.obLifestyle.matchRadius.min}</Mono><Mono>{copy.components.onboarding.obLifestyle.matchRadius.max}</Mono>
            </div>
          </div>
        </div>
        <div className="fu d5" style={{ marginTop:28 }}>
          <Btn onClick={()=>{ this.props.set({profession:prof,bucket,radius}); this.props.go("ob-photo"); }} disabled={!prof}>{copy.components.onboarding.obLifestyle.continue}</Btn>
        </div>
      </Screen>
    );
  }
}

export default ObLifestyle;