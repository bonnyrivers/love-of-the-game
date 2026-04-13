// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import './App.css';
import Splash from './components/Splash.tsx';
import {
  ObName,
  ObIdentity,
  ObQuiz,
  ObLifestyle,
  ObPhoto,
  ObAvail,
} from './components/Onboarding/index.ts';
import Home from './components/Home.tsx';
import Matches from './components/Matches.tsx';
import Notes from './components/Notes.tsx';
import Profile from './components/Profile.tsx';
import CheckIn from './components/CheckIn.tsx';
import PostDate from './components/PostDate.tsx';
import Lockout from './components/Lockout.tsx';
import DeepQuiz from './components/DeepQuiz.tsx';
import CopyEditor from './components/CopyEditor.tsx';
import Auth from './components/Auth.tsx';
import Nav from './components/Nav.tsx';
import G from './styles.tsx';
import HelloGraphQL from './graphql/HelloGraphQL.tsx';
import { fetchCurrentProfile, logoutUser, getStoredAuthToken } from './services/profileApi.ts';

const MAIN = ['home', 'matches', 'notes', 'profile'];

export default function App() {
  const [screen, setScreen] = useState<string>('splash');
  const [user, setUser] = useState<Record<string, any>>({});
  const [bootingSession, setBootingSession] = useState(true);
  const go = (s: string) => setScreen(s);
  const set = (d: Partial<Record<string, any>>) => setUser((p) => ({ ...p, ...d }));
  const clearUser = () => setUser({});

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    setScreen('splash');
  };

  // Auto-load returning user's profile from auth token
  useEffect(() => {
    const token = getStoredAuthToken();
    if (!token) {
      setBootingSession(false);
      return;
    }

    fetchCurrentProfile().then((profile) => {
      if (profile) {
        setUser((current) => ({ ...current, ...profile, authToken: token }));
        setScreen('home');
      }
      setBootingSession(false);
    });
  }, []);

  // Hidden keyboard shortcut to access copy editor
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        go('copy-editor');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const render = () => {
    if (bootingSession) {
      return null;
    }

    switch (screen) {
      case 'splash':
        return <Splash go={go} />;
      case 'auth-register':
        return <Auth go={go} set={set} mode="register" />;
      case 'auth-signin':
        return <Auth go={go} set={set} mode="signin" />;
      case 'ob-name':
        return <ObName go={go} state={user} set={set} />;
      case 'ob-identity':
        return <ObIdentity go={go} state={user} set={set} />;
      case 'ob-quiz':
        return <ObQuiz go={go} state={user} set={set} />;
      case 'ob-lifestyle':
        return <ObLifestyle go={go} state={user} set={set} />;
      case 'ob-photo':
        return <ObPhoto go={go} set={set} />;
      case 'ob-avail':
        return <ObAvail go={go} state={user} set={set} />;
      case 'home':
        return <Home go={go} state={user} />;
      case 'matches':
        return <Matches go={go} />;
      case 'notes':
        return <Notes go={go} />;
      case 'profile':
        return <Profile go={go} state={user} onLogout={handleLogout} />;
      case 'checkin':
        return <CheckIn go={go} />;
      case 'post-date':
        return <PostDate go={go} />;
      case 'lockout':
        return <Lockout go={go} />;
      case 'deep-quiz':
        return <DeepQuiz go={go} />;
      case 'copy-editor':
        return <CopyEditor go={go} />;
      default:
        return <Splash go={go} />;
    }
  };

  return (
    <>
      <div className="grain app-container">
        <G />
        <div key={screen} className="app-screen">
          {render()}
        </div>
        {MAIN.includes(screen) && <Nav active={screen} go={go} />}
      </div>
      <HelloGraphQL />
    </>
  );
}
