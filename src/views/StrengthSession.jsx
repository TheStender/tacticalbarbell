import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState, useDispatch } from '../lib/StateContext.jsx';
import { PROGRAM_MAP, targetWeight } from '../data/programs.js';

export default function StrengthSession() {
  const { session } = useParams();          // 'A', 'B', or 'all'
  const navigate    = useNavigate();
  const state       = useAppState();
  const dispatch    = useDispatch();

  const program = PROGRAM_MAP[state.currentProgramId];
  const week    = program?.weeks.find(w => w.weekNumber === state.currentWeekNumber)
    ?? program?.weeks[program.weeks.length - 1];

  const lifts = (state.clusterOverride ?? program?.cluster ?? []).filter(c => {
    if (session === 'all') return true;
    return c.session === session || c.session === 'all';
  });

  const intensityPct = week?.intensityPct ?? 75;
  const targetReps   = week?.reps ?? 5;
  const maxSets      = week?.sets?.max ?? 5;

  // Build initial set state: { [liftName]: [{reps, weight, completed}] }
  const initSets = () => {
    const obj = {};
    for (const lift of lifts) {
      const w = targetWeight(state.oneRepMaxes[lift.oneRmKey] ?? 0, intensityPct);
      obj[lift.name] = Array.from({ length: maxSets }, () => ({
        reps: targetReps,
        weight: w,
        completed: false,
      }));
    }
    return obj;
  };

  const [sets, setSets] = useState(initSets);
  const [notes, setNotes]   = useState('');
  const [saved, setSaved]   = useState(false);

  if (!program || !week) {
    return <div className="view"><p>Program not found.</p></div>;
  }

  function toggleSet(liftName, setIdx) {
    setSets(prev => ({
      ...prev,
      [liftName]: prev[liftName].map((s, i) =>
        i === setIdx ? { ...s, completed: !s.completed } : s,
      ),
    }));
  }

  function updateSetField(liftName, setIdx, field, value) {
    setSets(prev => ({
      ...prev,
      [liftName]: prev[liftName].map((s, i) =>
        i === setIdx ? { ...s, [field]: value } : s,
      ),
    }));
  }

  function handleSave() {
    const entry = {
      date: new Date().toISOString().slice(0, 10),
      programId: program.id,
      weekNumber: week.weekNumber,
      session,
      notes,
      lifts: lifts.map(lift => ({
        name: lift.name,
        sets: sets[lift.name],
      })),
    };
    dispatch({ type: 'LOG_STRENGTH', entry });
    setSaved(true);
    setTimeout(() => navigate('/'), 800);
  }

  const allDone = lifts.every(lift =>
    sets[lift.name].some(s => s.completed),
  );

  return (
    <div className="view">
      <div className="view-header">
        <h1>Session {session === 'all' ? '' : session} — {week.label}</h1>
        <p>
          {maxSets} sets × {targetReps} reps @ {intensityPct}%
        </p>
      </div>

      {saved && (
        <div className="banner banner-success">Session saved! Returning…</div>
      )}

      {lifts.map(lift => {
        const tw = targetWeight(state.oneRepMaxes[lift.oneRmKey] ?? 0, intensityPct);
        return (
          <div key={lift.name} className="card lift-block">
            <div className="lift-name">{lift.name}</div>
            <div className="lift-target">
              Target: <strong>{tw} lb</strong> × {targetReps} reps
            </div>
            {sets[lift.name].map((s, i) => (
              <div key={i} className="set-row">
                <span className="set-label">Set {i + 1}</span>
                <input
                  type="checkbox"
                  className="set-check"
                  checked={s.completed}
                  onChange={() => toggleSet(lift.name, i)}
                  aria-label={`Set ${i + 1} completed`}
                />
                <input
                  type="number"
                  className="set-input"
                  value={s.weight}
                  min={0}
                  step={5}
                  onChange={e => updateSetField(lift.name, i, 'weight', Number(e.target.value))}
                  aria-label="Weight (lb)"
                />
                <span className="set-input-label">lb</span>
                <input
                  type="number"
                  className="set-input"
                  value={s.reps}
                  min={0}
                  onChange={e => updateSetField(lift.name, i, 'reps', Number(e.target.value))}
                  aria-label="Reps"
                />
                <span className="set-input-label">reps</span>
              </div>
            ))}
          </div>
        );
      })}

      {/* Notes */}
      <div className="card">
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-h)' }}>
          Notes
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          placeholder="How did it feel? Any adjustments?"
          style={{
            width: '100%',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.5rem',
            background: 'var(--bg)',
            color: 'var(--text-h)',
            font: 'inherit',
            fontSize: '0.9rem',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={handleSave}
        disabled={saved}
      >
        Save Session
      </button>

      <button
        className="btn btn-ghost btn-full"
        style={{ marginTop: '0.5rem' }}
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  );
}
