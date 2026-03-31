import React from 'react';
import { Mono, Screen, Btn } from "./UI";
import copy from '../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
// CHECK-IN
// ══════════════════════════════════════════════════════════════════════════════
class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "idle",
      self: null
    };
  }

  setStatus = (s) => this.setState({ status: s });

  setSelf = (s) => this.setState({ self: s });

  render() {
    const { status, self } = this.state;

    return (
      <Screen style={{ justifyContent:"center" }}>
        <div className="fu d1" style={{ marginBottom:28,textAlign:"center" }}>
          <Mono style={{ display:"block",marginBottom:14 }}>{copy.components.checkIn.header.replace('{name}', 'Selin').replace('{venue}', 'Dimes')}</Mono>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:34,fontStyle:"italic",fontWeight:400,color:"var(--white)",lineHeight:1.1 }}>{copy.components.checkIn.title}</h2>
        </div>

        {status==="idle"&&(
          <div className="fu d2">
            <div style={{ border:"1px solid var(--line)",padding:"14px 16px",background:"var(--bg1)",marginBottom:20,textAlign:"center" }}>
              <Mono style={{ lineHeight:1.9,display:"block" }}>{copy.components.checkIn.status.idle.pulse}<br/><span style={{ color:"var(--mid)" }}>{copy.components.checkIn.status.idle.privacy}</span></Mono>
            </div>
            <Btn onClick={()=>{ this.setStatus("checking"); setTimeout(()=>this.setStatus("unconfirmed"),2000); }}>{copy.components.checkIn.status.idle.here}</Btn>
            <Btn ghost style={{ marginTop:10 }} onClick={()=>this.setStatus("no-show")}>{copy.components.checkIn.status.idle.cantMakeIt}</Btn>
          </div>
        )}

        {status==="checking"&&(
          <div className="fi" style={{ textAlign:"center",padding:"28px 0" }}>
            <div style={{ width:44,height:44,borderRadius:"50%",border:"1px solid var(--line2)",margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:10,height:10,borderRadius:"50%",background:"var(--dim)",animation:"pulse 1s infinite" }}/>
            </div>
            <Mono>{copy.components.checkIn.status.checking}</Mono>
          </div>
        )}

        {status==="unconfirmed"&&(
          <div className="fi">
            <div style={{ border:"1px solid var(--line2)",padding:"14px 16px",background:"var(--bg1)",marginBottom:18 }}>
              <Mono style={{ display:"block",marginBottom:7,color:"#8b7030" }}>{copy.components.checkIn.status.unconfirmed.title}</Mono>
              <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.6 }}>{copy.components.checkIn.status.unconfirmed.message}</p>
            </div>
            <p style={{ fontFamily:"var(--serif)",fontSize:16,fontStyle:"italic",color:"var(--soft)",marginBottom:16,lineHeight:1.5 }}>{copy.components.checkIn.status.unconfirmed.question}</p>
            {[[copy.components.checkIn.status.unconfirmed.yes,"yes"],[copy.components.checkIn.status.unconfirmed.no,"no"]].map(([l,v])=>(
              <button key={v} onClick={()=>this.setSelf(v)} style={{
                display:"block",width:"100%",
                border:`1px solid ${self===v?"var(--soft)":"var(--line)"}`,
                background:self===v?"var(--bg2)":"transparent",
                color:self===v?"var(--white)":"var(--mid)",
                fontFamily:"var(--serif)",fontSize:17,fontStyle:"italic",
                padding:"14px 16px",cursor:"pointer",marginBottom:9,textAlign:"left",transition:"all .14s"
              }}>{l}</button>
            ))}
            {self&&<Btn style={{ marginTop:8 }} onClick={()=>this.props.go(self==="yes"?"post-date":"home")}>
              {self==="yes"?copy.components.checkIn.status.unconfirmed.fieldNote:copy.components.checkIn.status.unconfirmed.submit}
            </Btn>}
          </div>
        )}

        {status==="no-show"&&(
          <div className="fi">
            <div style={{ border:"1px solid var(--line)",padding:"16px",background:"var(--bg1)",marginBottom:18 }}>
              <Mono style={{ display:"block",marginBottom:7 }}>{copy.components.checkIn.status.noShow.title}</Mono>
              <p style={{ fontFamily:"var(--serif)",fontSize:15,fontStyle:"italic",color:"var(--mid)",lineHeight:1.6 }}>{copy.components.checkIn.status.noShow.message}</p>
            </div>
            <Btn onClick={()=>this.props.go("home")}>{copy.components.checkIn.status.noShow.submit}</Btn>
            <Btn ghost style={{ marginTop:10 }} onClick={()=>this.props.go("home")}>{copy.components.checkIn.status.noShow.justDidntGo}</Btn>
          </div>
        )}
      </Screen>
    );
  }
}

export default CheckIn;