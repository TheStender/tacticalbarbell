import { useAppState, useDispatch } from '../lib/StateContext.jsx';

function formatDate(isoDate) {
  if (!isoDate) return '';
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function StrengthEntry({ log, dispatch }) {
  const totalSets = log.lifts?.reduce((n, l) => n + l.sets.filter(s => s.completed).length, 0) ?? 0;

  return (
    <div className="history-item">
      <div className="history-date">{formatDate(log.date)}</div>
      <div className="history-title">
        Session {log.session === 'all' ? '' : log.session} — Week {log.weekNumber}
        {' '}<span className="tag tag-strength">Strength</span>
      </div>
      <div className="history-detail">
        {log.lifts?.map(l => l.name).join(' · ')}
        {' '}&bull; {totalSets} sets completed
      </div>
      {log.notes && <div className="history-detail" style={{ fontStyle: 'italic' }}>"{log.notes}"</div>}
      <button
        className="btn btn-danger btn-sm"
        style={{ marginTop: '0.35rem', alignSelf: 'flex-start' }}
        onClick={() => {
          if (window.confirm('Delete this log?')) {
            dispatch({ type: 'DELETE_STRENGTH', id: log.id });
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

function CondEntry({ log, dispatch }) {
  return (
    <div className="history-item">
      <div className="history-date">{formatDate(log.date)}</div>
      <div className="history-title">
        {log.label} — Week {log.weekNumber}
        {' '}<span className={`tag tag-${log.type}`}>{log.type.toUpperCase()}</span>
      </div>
      <div className="history-detail">{log.protocol}</div>
      {log.durationMin > 0 && (
        <div className="history-detail">{log.durationMin} minutes</div>
      )}
      {log.notes && <div className="history-detail" style={{ fontStyle: 'italic' }}>"{log.notes}"</div>}
      <button
        className="btn btn-danger btn-sm"
        style={{ marginTop: '0.35rem', alignSelf: 'flex-start' }}
        onClick={() => {
          if (window.confirm('Delete this log?')) {
            dispatch({ type: 'DELETE_COND', id: log.id });
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default function History() {
  const state    = useAppState();
  const dispatch = useDispatch();

  // Merge and sort all logs newest-first
  const allLogs = [
    ...state.strengthLogs.map(l => ({ ...l, _kind: 'strength' })),
    ...state.conditioningLogs.map(l => ({ ...l, _kind: 'cond' })),
  ].sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''));

  return (
    <div className="view">
      <div className="view-header">
        <h1>History</h1>
        <p>{allLogs.length} sessions logged</p>
      </div>

      {allLogs.length === 0 ? (
        <div className="empty-state">
          <div className="em">📋</div>
          <p style={{ fontWeight: 600, color: 'var(--text-h)' }}>Nothing logged yet</p>
          <p>Head to Today and log your first session.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: '0 1rem' }}>
          {allLogs.map(log =>
            log._kind === 'strength'
              ? <StrengthEntry key={log.id} log={log} dispatch={dispatch} />
              : <CondEntry     key={log.id} log={log} dispatch={dispatch} />,
          )}
        </div>
      )}
    </div>
  );
}
