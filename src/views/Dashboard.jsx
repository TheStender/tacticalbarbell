import { Link } from 'react-router-dom';
import { useAppState } from '../lib/StateContext.jsx';
import {
  PROGRAM_MAP,
  HIC_LIBRARY,
  targetWeight,
} from '../data/programs.js';
import {
  getStrengthLogsForWeek,
  getCondLogsForWeek,
  completedStrengthCount,
} from '../lib/storage.js';

function tagClass(type) {
  const map = { walkrun: 'tag-walkrun', lss: 'tag-lss', hic: 'tag-hic',
    bike: 'tag-bike', ruck: 'tag-ruck', versa: 'tag-versa',
    tempo: 'tag-lss', longrun: 'tag-lss', hills: 'tag-lss', track800: 'tag-lss' };
  return `tag ${map[type] ?? 'tag-lss'}`;
}

const DAY_ORDER = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };
function daySortKey(dayStr) {
  if (!dayStr) return 99;
  const lower = dayStr.toLowerCase();
  for (const [abbr, order] of Object.entries(DAY_ORDER)) {
    if (lower.startsWith(abbr)) return order;
  }
  return 99;
}

export default function Dashboard() {
  const state = useAppState();
  const program = PROGRAM_MAP[state.currentProgramId];
  if (!program) return <div className="view"><p>No active program.</p></div>;

  const week = program.weeks.find(w => w.weekNumber === state.currentWeekNumber)
    ?? program.weeks[program.weeks.length - 1];

  const effectiveCluster = state.clusterOverride ?? program.cluster;

  const strengthLogs = getStrengthLogsForWeek(state, program.id, week.weekNumber);
  const condLogs     = getCondLogsForWeek(state, program.id, week.weekNumber);
  const totalDone    = completedStrengthCount(state, program.id);

  // Sessions for Fighter template (A = Mon, B = Thu)
  const sessions = program.strengthTemplate === 'Fighter'
    ? [
        { key: 'A', label: 'Session A', day: week.sessionADate ?? 'Monday', lifts: effectiveCluster.filter(c => c.session === 'A' || c.session === 'all') },
        { key: 'B', label: 'Session B', day: week.sessionBDate ?? 'Thursday', lifts: effectiveCluster.filter(c => c.session === 'B' || c.session === 'all') },
      ]
    : [
        { key: 'all', label: 'Strength Session', day: null, lifts: effectiveCluster },
      ];

  const intensityPct = week.intensityPct;
  const reps         = week.reps;
  const sets         = week.sets;

  // Check which sessions are already logged this week
  const loggedSessions = new Set(strengthLogs.map(l => l.session));

  // Benchmark progress for Fighter (12 sessions = advance)
  const isFighter = program.strengthTemplate === 'Fighter';

  return (
    <div className="view">
      {/* Header */}
      <div className="view-header">
        <div className="phase-badge">{program.name}</div>
        <h1>{week.label}</h1>
        <p>{week.dateRange ?? `Week ${week.weekNumber} of ${program.totalWeeks}`}</p>
      </div>

      {/* Week intensity summary */}
      <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-h)' }}>{intensityPct}%</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text)' }}>INTENSITY</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-h)' }}>
            {sets.min === sets.max ? sets.min : `${sets.min}–${sets.max}`}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text)' }}>SETS</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-h)' }}>{reps}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text)' }}>REPS</div>
        </div>
        {week.note && (
          <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text)', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
            {week.note}
          </div>
        )}
      </div>

      {/* Benchmark progress */}
      {isFighter && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)' }}>
              Benchmark Progress
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{totalDone} / 12</span>
          </div>
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${Math.min(totalDone / 12 * 100, 100)}%` }} />
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text)' }}>{program.benchmarkToAdvance}</p>
        </div>
      )}

      {/* Weekly schedule — chronological */}
      <div className="section-label">This Week</div>
      {[
        ...sessions.map(({ key, label, day, lifts }) => ({
          sortKey: daySortKey(day),
          type: 'strength',
          key,
          label,
          day,
          lifts,
        })),
        ...week.conditioning.map((c, i) => ({
          sortKey: daySortKey(c.day),
          type: 'cond',
          condIndex: i,
          cond: c,
        })),
      ]
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(item => {
          if (item.type === 'strength') {
            const { key, label, day, lifts } = item;
            const done = loggedSessions.has(key);
            return (
              <div key={`s-${key}`} className="card">
                <div className="card-header">
                  <div>
                    {day && <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginBottom: '0.15rem' }}>{day}</div>}
                    <span className="card-title">{label}</span>
                  </div>
                  {done
                    ? <span className="tag tag-done">✓ Done</span>
                    : <span className="tag tag-strength">Strength</span>}
                </div>
                <div className="card-sub">
                  {lifts.map(l => {
                    const w = targetWeight(state.oneRepMaxes[l.oneRmKey] ?? 0, intensityPct);
                    return (
                      <div key={l.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                        <span>{l.name}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-h)' }}>{w} lb</span>
                      </div>
                    );
                  })}
                </div>
                {!done && (
                  <Link to={`/session/strength/${key}`} className="btn btn-primary btn-full" style={{ marginTop: '0.75rem' }}>
                    Log Session
                  </Link>
                )}
              </div>
            );
          } else {
            const { condIndex, cond: c } = item;
            const loggedCond = condLogs.find(l => l.condDay === c.day);
            const hic = c.hicId ? HIC_LIBRARY[c.hicId] : null;
            return (
              <div key={`c-${condIndex}`} className="card">
                <div className="card-header">
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-h)' }}>{c.day}</span>
                      <span className={tagClass(c.type)}>{c.label}</span>
                      {c.optional && <span style={{ fontSize: '0.7rem', color: 'var(--text)' }}>optional</span>}
                    </div>
                    <div className="card-sub">{hic ? hic.desc : c.protocol}</div>
                    {c.targetMin && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginTop: '0.15rem' }}>
                        ~{c.targetMin} min
                      </div>
                    )}
                  </div>
                  {loggedCond && <span className="tag tag-done">✓</span>}
                </div>
                {!loggedCond && (
                  <Link to={`/session/cond/${condIndex}`} className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }}>
                    Log
                  </Link>
                )}
              </div>
            );
          }
        })}
    </div>
  );
}
