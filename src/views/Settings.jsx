import { useRef, useState } from 'react';
import { useAppState, useDispatch } from '../lib/StateContext.jsx';
import { PROGRAM_MAP, ALL_PROGRAMS } from '../data/programs.js';
import { exportData, importData } from '../lib/storage.js';

// Convert "Military Press" â†’ "militaryPress"
function toKey(name) {
  return name.trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('') || 'custom';
}

// Convert camelCase â†’ "Title Case" for display
function liftLabel(key) {
  const KNOWN = {
    frontSquat: 'Front Squat', deadlift: 'Deadlift',
    benchPress: 'Bench Press', barbellRow: 'Barbell Row',
  };
  return KNOWN[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

const SELECT_STYLE = {
  padding: '0.35rem 0.5rem',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text-h)',
  font: 'inherit',
  fontSize: '0.85rem',
  flexShrink: 0,
};

// â”€â”€ Cluster Builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ClusterBuilder({ state, dispatch, program }) {
  const [lifts, setLifts] = useState(() =>
    (state.clusterOverride ?? program?.cluster ?? []).map(c => ({ ...c }))
  );
  const [newName,    setNewName]    = useState('');
  const [newSession, setNewSession] = useState('all');
  const [saved,      setSaved]      = useState(false);

  function addLift() {
    if (!newName.trim()) return;
    setLifts(prev => [...prev, { name: newName.trim(), oneRmKey: toKey(newName), session: newSession }]);
    setNewName('');
    setSaved(false);
  }

  function removeLift(i) {
    setLifts(prev => prev.filter((_, idx) => idx !== i));
    setSaved(false);
  }

  function updateLift(i, field, value) {
    setLifts(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
    setSaved(false);
  }

  function saveCluster() {
    const newRMs = {};
    for (const lift of lifts) {
      if (!(lift.oneRmKey in state.oneRepMaxes)) newRMs[lift.oneRmKey] = 100;
    }
    dispatch({ type: 'SAVE_CLUSTER', cluster: lifts, newRMs });
    setSaved(true);
  }

  function resetCluster() {
    if (window.confirm('Reset lift cluster to program defaults?')) {
      dispatch({ type: 'RESET_CLUSTER' });
      setLifts((program?.cluster ?? []).map(c => ({ ...c })));
      setSaved(false);
    }
  }

  return (
    <>
      <div className="section-label">
        Lift Cluster
        {state.clusterOverride && <span style={{ marginLeft: '0.5rem', color: 'var(--accent)', fontStyle: 'italic', textTransform: 'none', fontSize: '0.75rem' }}>customized</span>}
      </div>
      <div className="card">
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--text)' }}>
          Add or remove lifts. For Fighter (A/B split) assign each lift to a session.
        </p>

        {lifts.length === 0 && (
          <div style={{ color: 'var(--text)', fontSize: '0.85rem', padding: '0.4rem 0' }}>No lifts â€” add one below.</div>
        )}

        {lifts.map((lift, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <input
              className="setting-input"
              style={{ flex: 1, minWidth: '7rem', textAlign: 'left' }}
              value={lift.name}
              onChange={e => updateLift(i, 'name', e.target.value)}
              placeholder="Lift name"
            />
            <select
              value={lift.session}
              onChange={e => updateLift(i, 'session', e.target.value)}
              style={SELECT_STYLE}
              aria-label="Session"
            >
              <option value="all">Both A+B</option>
              <option value="A">Session A</option>
              <option value="B">Session B</option>
            </select>
            <button className="btn btn-danger btn-sm" onClick={() => removeLift(i)} aria-label="Remove lift">X</button>
          </div>
        ))}

        {/* Add new lift row */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <input
            className="setting-input"
            style={{ flex: 1, minWidth: '7rem', textAlign: 'left' }}
            placeholder="Lift name (e.g. Squat)"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addLift()}
          />
          <select value={newSession} onChange={e => setNewSession(e.target.value)} style={SELECT_STYLE}>
            <option value="all">Both A+B</option>
            <option value="A">Session A</option>
            <option value="B">Session B</option>
          </select>
          <button className="btn btn-ghost btn-sm" onClick={addLift}>Add</button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={saveCluster}>
            {saved ? 'âœ“ Saved' : 'Save Cluster'}
          </button>
          {state.clusterOverride && (
            <button className="btn btn-ghost btn-sm" onClick={resetCluster}>Reset to Defaults</button>
          )}
        </div>
      </div>
    </>
  );
}

// â”€â”€ Main Settings view â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Settings() {
  const state    = useAppState();
  const dispatch = useDispatch();
  const fileRef  = useRef();

  const program    = PROGRAM_MAP[state.currentProgramId];
  const totalWeeks = program?.totalWeeks ?? 1;

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    importData(file)
      .then(data => {
        if (window.confirm('Replace all data with this backup?')) {
          dispatch({ type: 'IMPORT', data });
        }
      })
      .catch(err => alert(`Import failed: ${err.message}`));
    e.target.value = '';
  }

  return (
    <div className="view">
      <div className="view-header">
        <h1>Settings</h1>
        <p>1RMs, cluster, program, data</p>
      </div>

      {/* â”€â”€ Appearance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="section-label">Appearance</div>
      <div className="card">
        <div className="setting-row">
          <div>
            <div className="setting-label">Dark Mode</div>
            <div className="setting-sub">{state.darkMode ? 'On (forced)' : 'Off (follows device)'}</div>
          </div>
          <button
            className={`btn btn-sm ${state.darkMode ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
          >
            {state.darkMode ? 'Dark ON' : 'Dark OFF'}
          </button>
        </div>
      </div>

      {/* â”€â”€ 1RMs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="section-label">One-Rep Maxes</div>
      <div className="card">
        {Object.entries(state.oneRepMaxes).map(([key, val]) => (
          <div key={key} className="setting-row">
            <div>
              <div className="setting-label">{liftLabel(key)}</div>
              <div className="setting-sub">
                75%: {Math.round(val * 0.75 / 5) * 5} lb &nbsp;|&nbsp;
                80%: {Math.round(val * 0.80 / 5) * 5} lb &nbsp;|&nbsp;
                90%: {Math.round(val * 0.90 / 5) * 5} lb
              </div>
            </div>
            <input
              type="number"
              className="setting-input"
              value={val}
              min={0}
              step={5}
              onChange={e => dispatch({ type: 'UPDATE_1RM', liftKey: key, value: e.target.value })}
              aria-label={`${liftLabel(key)} 1RM`}
            />
          </div>
        ))}
      </div>

      {/* â”€â”€ Cluster Builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ClusterBuilder state={state} dispatch={dispatch} program={program} />

      {/* â”€â”€ Program / Week â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="section-label">Program &amp; Week</div>
      <div className="card">
        {/* Program selector */}
        <div className="setting-row">
          <div>
            <div className="setting-label">Template</div>
            <div className="setting-sub">{program?.strengthTemplate} + {program?.conditioningProtocol}</div>
          </div>
          <select
            value={state.currentProgramId}
            onChange={e => {
              if (window.confirm('Switch program? Week resets to 1.')) {
                dispatch({ type: 'SET_PROGRAM', programId: e.target.value });
              }
            }}
            style={SELECT_STYLE}
          >
            {ALL_PROGRAMS.map(p => (
              <option key={p.id} value={p.id}>
                {p.strengthTemplate} + {p.conditioningProtocol}
              </option>
            ))}
          </select>
        </div>

        {/* Week selector */}
        <div className="setting-row">
          <div>
            <div className="setting-label">Current Week</div>
            <div className="setting-sub">{state.currentWeekNumber} of {totalWeeks}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <button
              className="btn btn-ghost btn-sm"
              disabled={state.currentWeekNumber <= 1}
              onClick={() => dispatch({ type: 'SET_WEEK', weekNumber: state.currentWeekNumber - 1 })}
            >Prev</button>
            <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 700, color: 'var(--text-h)' }}>
              {state.currentWeekNumber}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              disabled={state.currentWeekNumber >= totalWeeks}
              onClick={() => dispatch({ type: 'SET_WEEK', weekNumber: state.currentWeekNumber + 1 })}
            >Next</button>
          </div>
        </div>

        {/* Advance to next program */}
        {program?.nextPhase && (
          <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-label" style={{ marginBottom: '0.25rem' }}>Advance to Next Phase</div>
            <div className="setting-sub" style={{ marginBottom: '0.5rem' }}>
              Next: {PROGRAM_MAP[program.nextPhase]?.name}
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                if (window.confirm(`Advance to ${PROGRAM_MAP[program.nextPhase]?.name}?`)) {
                  dispatch({ type: 'ADVANCE_PROGRAM', nextProgramId: program.nextPhase });
                }
              }}
            >
              Advance Phase &rarr;
            </button>
          </div>
        )}
      </div>

      {/* â”€â”€ Export / Import â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="section-label">Data</div>
      <div className="card">
        <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div>
            <div className="setting-label">Export Backup</div>
            <div className="setting-sub">Download a JSON file with all your data</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => exportData(state)}>
            Export JSON
          </button>
        </div>
        <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div>
            <div className="setting-label">Import Backup</div>
            <div className="setting-sub">Overwrites all current data.</div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleImport}
          />
          <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current.click()}>
            Import JSON
          </button>
        </div>
      </div>
    </div>
  );
}
