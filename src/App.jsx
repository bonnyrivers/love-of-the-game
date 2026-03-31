// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import Splash from "./components/Splash.jsx";
import { ObName, ObIdentity, ObQuiz, ObLifestyle, ObPhoto, ObAvail } from "./components/Onboarding/index.js";
import Home from "./components/Home.jsx";
import Matches from "./components/Matches.jsx";
import Notes from "./components/Notes.jsx";
import Profile from "./components/Profile.jsx";
import CheckIn from "./components/CheckIn.jsx";
import PostDate from "./components/PostDate.jsx";
import Lockout from "./components/Lockout.jsx";
import DeepQuiz from "./components/DeepQuiz.jsx";
import Nav from "./components/Nav.jsx";
import G from "./styles.jsx";

const MAIN = ["home", "matches", "notes", "profile"];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState({});
  const go = (s) => setScreen(s);
  const set = (d) => setUser((p) => ({ ...p, ...d }));

  const S = {
    splash: "splash",
    "ob-name": "ob-name",
    "ob-identity": "ob-identity",
    "ob-quiz": "ob-quiz",
    "ob-lifestyle": "ob-lifestyle",
    "ob-photo": "ob-photo",
    "ob-avail": "ob-avail",
    home: "home",
    matches: "matches",
    notes: "notes",
    profile: "profile",
    checkin: "checkin",
    "post-date": "post-date",
    lockout: "lockout",
    "deep-quiz": "deep-quiz",
  };

  const render = () => {
    switch (screen) {
      case "splash":
        return <Splash go={go} />;
      case "ob-name":
        return <ObName go={go} state={user} set={set} />;
      case "ob-identity":
        return <ObIdentity go={go} state={user} set={set} />;
      case "ob-quiz":
        return <ObQuiz go={go} state={user} set={set} />;
      case "ob-lifestyle":
        return <ObLifestyle go={go} state={user} set={set} />;
      case "ob-photo":
        return <ObPhoto go={go} set={set} />;
      case "ob-avail":
        return <ObAvail go={go} state={user} set={set} />;
      case "home":
        return <Home go={go} state={{name: "Bonny"}} />;
      case "matches":
        return <Matches go={go} />;
      case "notes":
        return <Notes go={go} />;
      case "profile":
        return <Profile go={go} state={user} />;
      case "checkin":
        return <CheckIn go={go} />;
      case "post-date":
        return <PostDate go={go} />;
      case "lockout":
        return <Lockout go={go} />;
      case "deep-quiz":
        return <DeepQuiz go={go} />;
      default:
        return <Home go={go} state={{name: "Bonny"}} />;
    }
  };

  return (
    <div
      className="grain"
      style={{ background: "var(--bg)", minHeight: "100dvh" }}
    >
      <G />
      <div key={screen} style={{ animation: "fadeIn .3s ease both" }}>
        {render()}
      </div>
      {MAIN.includes(screen) && <Nav active={screen} go={go} />}
    </div>
  );
}
