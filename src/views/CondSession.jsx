import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState, useDispatch } from '../lib/StateContext.jsx';
import { PROGRAM_MAP, HIC_LIBRARY } from '../data/programs.js';

export default function CondSession() {
  const { condIndex } = useParams();
  const navigate      = useNavigate();
  const state         = useAppState();
  const dispatch      = useDispatch();

  const program = PROGRAM_MAP[state.currentProgramId];
  const week    = program?.weeks.find(w => w.weekNumber === state.currentWeekNumber)
    ?? program?.weeks[program?.weeks.length - 1];

  const cond = week?.conditioning[Number(condIndex)];

  const [durationMin, setDurationMin] = useState(cond?.targetMin ?? '');
  const [notes,       setNotes]       = useState('');
  const [saved,       setSaved]       = useState(false);

  if (!program || !week || !cond) {
    return <div className="view"><p>Session not found.</p></div>;
  }

  const hic = cond.hicId ? HIC_LIBRARY[cond.hicId] : null;

  function handleSave() {
    dispatch({
      type: 'LOG_COND',
      entry: {
        date: new Date().toISOString().slice(0, 10),
        programId: program.id,
        weekNumber: week.weekNumber,
        condDay: cond.day,
        type: cond.type,
        label: cond.label,
        protocol: cond.protocol ?? hic?.desc,
        durationMin: Number(durationMin),
        notes,
      },
    });
    setSaved(true);
    setTimeout(() => navigate('/'), 800);
  }

  return (
    <div className="view">
      <div className="view-header">
        <h1>{cond.label}</h1>
        <p>{cond.day} — {week.label}</p>
      </div>

      {saved && (
        <div className="banner banner-success">Logged! Returning…</div>
      )}

      {/* Protocol detail */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: '0.5rem' }}>Protocol</div>
        {hic && (
          <div style={{ marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-h)', fontSize: '0.95rem' }}>
            {hic.name}
          </div>
        )}
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>
          {hic ? hic.desc : cond.protocol}
        </p>
        {cond.targetMin && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text)' }}>
            Target duration: ~{cond.targetMin} minutes
          </div>
        )}
      </div>

      {/* Duration input */}
      <div className="card">
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-h)' }}>
          Actual Duration (minutes)
        </label>
        <input
          type="number"
          className="setting-input"
          value={durationMin}
          min={0}
          onChange={e => setDurationMin(e.target.value)}
          placeholder="0"
          style={{ fontSize: '1.2rem', width: '7rem' }}
        />
      </div>

      {/* Notes */}
      <div className="card">
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-h)' }}>
          Notes
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          placeholder="How did it go?"
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
        Save
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
