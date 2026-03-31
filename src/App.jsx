// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
import { useEffect, useState } from "react";
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
import CopyEditor from "./components/CopyEditor.jsx";
import Nav from "./components/Nav.jsx";
import G from "./styles.jsx";

const MAIN = ["home", "matches", "notes", "profile"];

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState({});
  const go = (s) => setScreen(s);
  const set = (d) => setUser((p) => ({ ...p, ...d }));

  // Hidden keyboard shortcut to access copy editor
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        go('copy-editor');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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
    "copy-editor": "copy-editor",
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
        return <Home go={go} state={user} />;
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
      case "copy-editor":
        return <CopyEditor go={go} />;
      default:
        return <Splash go={go} />;
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

      {/* Hidden copy editor access - subtle button in bottom right */}
      {screen === 'home' && (
        <button
          onClick={() => go('copy-editor')}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--bg1)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            opacity: 0.3,
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'var(--dim)',
            zIndex: 1000
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
          onMouseLeave={(e) => e.target.style.opacity = '0.3'}
          title="Copy Editor (Ctrl+Shift+C)"
        >
          ✏️
        </button>
      )}
    </div>
  );
}
