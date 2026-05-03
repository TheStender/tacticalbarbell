import { DEFAULT_ONE_RMS } from '../data/programs.js';

// ============================================================
// Storage keys
// ============================================================
const KEYS = {
  USER_STATE: 'tb_user_state',
};

// ============================================================
// Default user state
// ============================================================
function defaultState() {
  return {
    version: 1,
    currentProgramId: 'phase1-fighter',
    currentWeekNumber: 1,
    darkMode: false,          // false = follow OS, true = force dark
    clusterOverride: null,    // null = use program defaults; array = custom cluster
    oneRepMaxes: { ...DEFAULT_ONE_RMS },
    // Array of strength session logs
    // { id, date, programId, weekNumber, session, lifts: [{ name, sets: [{reps, weight, completed}] }], completedAt }
    strengthLogs: [],
    // Array of conditioning session logs
    // { id, date, programId, weekNumber, condDay, type, protocol, durationMin, notes, completedAt }
    conditioningLogs: [],
  };
}

// ============================================================
// Read / write
// ============================================================
export function loadState() {
  try {
    const raw = localStorage.getItem(KEYS.USER_STATE);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // Migrate or fill missing fields
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEYS.USER_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// ============================================================
// Strength log helpers
// ============================================================
export function logStrengthSession(state, entry) {
  const id = `str-${Date.now()}`;
  const log = { id, completedAt: new Date().toISOString(), ...entry };
  return {
    ...state,
    strengthLogs: [...state.strengthLogs, log],
  };
}

export function updateStrengthLog(state, id, updates) {
  return {
    ...state,
    strengthLogs: state.strengthLogs.map(l => l.id === id ? { ...l, ...updates } : l),
  };
}

export function deleteStrengthLog(state, id) {
  return {
    ...state,
    strengthLogs: state.strengthLogs.filter(l => l.id !== id),
  };
}

// ============================================================
// Conditioning log helpers
// ============================================================
export function logCondSession(state, entry) {
  const id = `cond-${Date.now()}`;
  const log = { id, completedAt: new Date().toISOString(), ...entry };
  return {
    ...state,
    conditioningLogs: [...state.conditioningLogs, log],
  };
}

export function deleteCondLog(state, id) {
  return {
    ...state,
    conditioningLogs: state.conditioningLogs.filter(l => l.id !== id),
  };
}

// ============================================================
// 1RM helpers
// ============================================================
export function updateOneRepMax(state, liftKey, value) {
  const rounded = Math.round(Number(value) / 5) * 5;
  return {
    ...state,
    oneRepMaxes: { ...state.oneRepMaxes, [liftKey]: rounded },
  };
}

// ============================================================
// Program progression
// ============================================================
export function advanceWeek(state) {
  return { ...state, currentWeekNumber: state.currentWeekNumber + 1 };
}

export function advanceProgram(state, nextProgramId) {
  return { ...state, currentProgramId: nextProgramId, currentWeekNumber: 1 };
}

// ============================================================
// Export / Import (cross-device sync via JSON file)
// ============================================================
export function exportData(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tb-tracker-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.oneRepMaxes || !Array.isArray(parsed.strengthLogs)) {
          reject(new Error('Invalid backup file format'));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error('Could not parse file'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsText(file);
  });
}

// ============================================================
// Query helpers
// ============================================================

// All strength sessions for a given program + week
export function getStrengthLogsForWeek(state, programId, weekNumber) {
  return state.strengthLogs.filter(
    l => l.programId === programId && l.weekNumber === weekNumber,
  );
}

// All conditioning sessions for a given program + week
export function getCondLogsForWeek(state, programId, weekNumber) {
  return state.conditioningLogs.filter(
    l => l.programId === programId && l.weekNumber === weekNumber,
  );
}

// Count completed strength sessions in a program (for benchmark tracking)
export function completedStrengthCount(state, programId) {
  return state.strengthLogs.filter(l => l.programId === programId).length;
}
