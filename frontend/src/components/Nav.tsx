// @ts-nocheck
import React from 'react';
import { Mono } from './UI.tsx';
import copy from '../copy.ts';
import './Nav.css';

// ─── NAV ──────────────────────────────────────────────────────────────────────
class Nav extends React.Component<{
  active: string;
  go: (s: string) => void;
}> {
  render() {
    const { active, go } = this.props;
    return (
      <div className="nav-bar">
        {[
          { id: 'home', sym: '◈', label: copy.components.nav.today },
          { id: 'matches', sym: '◎', label: copy.components.nav.matches },
          { id: 'notes', sym: '◫', label: copy.components.nav.fieldNotes },
          { id: 'profile', sym: '◻', label: copy.components.nav.you },
        ].map(({ id, sym, label }) => (
          <button key={id} onClick={() => go(id)} className="nav-btn">
            <span
              className="nav-icon"
              style={{ color: active === id ? 'var(--white)' : 'var(--dim)' }}
            >
              {sym}
            </span>
            <Mono
              className="nav-label"
              style={{ color: active === id ? 'var(--soft)' : 'var(--dim)' }}
            >
              {label}
            </Mono>
          </button>
        ))}
      </div>
    );
  }
}

export default Nav;
