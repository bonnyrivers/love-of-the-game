// @ts-nocheck
import { useState } from 'react';
import { Screen, Mono, Rule, Btn } from '../../../src/components/UI.tsx';
import copy from '../copy.ts';
import './FieldNotes.css';

// ══════════════════════════════════════════════════════════════════════════════
// 12. FIELD NOTES
// ══════════════════════════════════════════════════════════════════════════════
const ENTRIES = [
  {
    date: 'Mar 4',
    name: 'Selin',
    venue: 'Dimes · LES',
    vibe: ['◎ Seen', '○ Hopeful'],
    great: 'Her complete lack of performance — she just talked.',
    notso: 'Felt like I was interviewing her at points.',
    free: "It's rare someone doesn't perform. I noticed.",
  },
  {
    date: 'Feb 25',
    name: 'Priya',
    venue: 'Foragers · DUMBO',
    vibe: ['◌ Calm'],
    great: "We walked to the bridge after. Didn't plan to.",
    notso: "Couldn't tell if the interest was real.",
    free: '',
  },
  {
    date: 'Feb 18',
    name: 'Zoe',
    venue: 'Café Henrie · LES',
    vibe: ['◌ Calm', '▽ Flat'],
    great: 'Two hours felt like twenty minutes.',
    notso: 'No spark, no reason.',
    free: 'Sometimes a good conversation is enough.',
  },
  {
    date: 'Feb 11',
    name: 'Maria',
    venue: 'Dimes · LES',
    vibe: ['▽ Flat'],
    great: 'She was kind.',
    notso: 'Everything felt effortful.',
    free: '',
  },
];

const PATTERNS = [
  {
    label: copy.components.fieldNotes.patterns.youFeelMostYourself,
    insight: 'walks and unhurried venues',
  },
  { label: copy.components.fieldNotes.patterns.commonThread, insight: "people who don't perform" },
  {
    label: copy.components.fieldNotes.patterns.youFeelFlat,
    insight: 'the energy is effortful from the start',
  },
  { label: copy.components.fieldNotes.patterns.datesCompleted, insight: '4  ·  100% attendance' },
  { label: copy.components.fieldNotes.patterns.mostCommonVibes, insight: 'Calm, then Hopeful' },
];

const calDateNums = [4, 11, 18, 25];

export const Notes = ({ go }) => {
  const [view, setView] = useState('list');
  const [entry, setEntry] = useState(null);

  const TabBtn = ({ id, label }) => (
    <button
      onClick={() => setView(id)}
      className={`field-notes-tab-btn${view === id ? ' active' : ''}`}
    >
      {label}
    </button>
  );

  if (entry !== null) {
    const e = ENTRIES[entry];
    return (
      <Screen className="field-notes-screen">
        <button onClick={() => setEntry(null)} className="field-notes-back-btn">
          {copy.components.fieldNotes.entryDetail.back}
        </button>
        <div className="fu d1">
          <Mono className="field-notes-entry-meta">
            {e.date} · {e.venue}
          </Mono>
          <h2 className="serif-italic field-notes-entry-name">{e.name}</h2>
          <div className="field-notes-vibe-list">
            {e.vibe.map((v) => (
              <span key={v} className="field-notes-vibe-pill">
                {v}
              </span>
            ))}
          </div>
        </div>
        {[
          [copy.components.fieldNotes.entryDetail.whatWasGreat, e.great],
          [copy.components.fieldNotes.entryDetail.whatWasNotSoGreat, e.notso],
        ].map(([l, v]) =>
          v ? (
            <div key={l} className="fu d2 field-notes-detail-block">
              <Mono className="field-notes-meta-label">{l}</Mono>
              <p className="serif-italic field-notes-detail-text">{v}</p>
            </div>
          ) : null
        )}
        {e.free && (
          <div className="fu d3 field-notes-free-block">
            <p className="serif-italic field-notes-free-text">{e.free}</p>
          </div>
        )}
      </Screen>
    );
  }

  return (
    <Screen className="field-notes-screen">
      <div className="fu d1 field-notes-header">
        <Mono>{copy.components.fieldNotes.header.sectionLabel}</Mono>
        <h2 className="field-notes-title">{copy.components.fieldNotes.header.title}</h2>
        <div className="field-notes-tabs">
          <TabBtn id="list" label={copy.components.fieldNotes.header.tabs.entries} />
          <TabBtn id="calendar" label={copy.components.fieldNotes.header.tabs.calendar} />
          <TabBtn id="patterns" label={copy.components.fieldNotes.header.tabs.patterns} />
        </div>
      </div>
      <Rule className="field-notes-rule" />

      {view === 'list' && (
        <div>
          {ENTRIES.map((e, i) => (
            <div
              key={i}
              className="fu field-notes-entry-wrap"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div onClick={() => setEntry(i)} className="field-notes-entry-card">
                <div>
                  <p className="serif-italic field-notes-card-name">{e.name}</p>
                  <Mono className="field-notes-entry-venue">
                    {e.date} · {e.venue}
                  </Mono>
                  <div className="field-notes-card-vibes">
                    {e.vibe.map((v) => (
                      <Mono key={v} className="field-notes-card-vibe">
                        {v}
                      </Mono>
                    ))}
                  </div>
                </div>
                <p className="serif-italic field-notes-card-great">{e.great.slice(0, 38)}...</p>
              </div>
            </div>
          ))}
          <div className="field-notes-new-entry">
            <Btn onClick={() => go('post-date')}>{copy.components.fieldNotes.newEntry}</Btn>
          </div>
        </div>
      )}

      {view === 'calendar' && (
        <div className="fi">
          <Mono className="field-notes-calendar-month">
            {copy.components.fieldNotes.calendar.monthYear}
          </Mono>
          <div className="field-notes-calendar-grid">
            {copy.components.fieldNotes.calendar.weekDays.map((d) => (
              <div key={d} className="field-notes-calendar-day-label">
                {d}
              </div>
            ))}
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div key={`e${i}`} />
              ))}
            {Array(31)
              .fill(null)
              .map((_, i) => {
                const day = i + 1;
                const has = calDateNums.includes(day);
                return (
                  <div
                    key={day}
                    onClick={has ? () => setEntry(calDateNums.indexOf(day)) : undefined}
                    className={`field-notes-calendar-day${has ? ' has-entry' : ''}`}
                  >
                    <span className="field-notes-calendar-day-number">{day}</span>
                    {has && <div className="field-notes-calendar-dot" />}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {view === 'patterns' && (
        <div className="fi">
          <p className="serif-italic field-notes-patterns-intro">
            {copy.components.fieldNotes.patterns.intro.replace('{count}', ENTRIES.length)}
          </p>
          {PATTERNS.map((p, i) => (
            <div key={i} className="field-notes-pattern-block">
              <Mono className="field-notes-meta-label">{p.label}</Mono>
              <p className="serif-italic field-notes-pattern-insight">{p.insight}</p>
            </div>
          ))}
          <Rule className="field-notes-patterns-rule" />
          <p className="serif-italic field-notes-patterns-privacy">
            {copy.components.fieldNotes.patterns.privacy}
          </p>
        </div>
      )}
    </Screen>
  );
};

export default Notes;
