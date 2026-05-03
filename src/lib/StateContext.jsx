import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  loadState,
  saveState,
  logStrengthSession,
  updateStrengthLog,
  deleteStrengthLog,
  logCondSession,
  deleteCondLog,
  updateOneRepMax,
  advanceWeek,
  advanceProgram,
} from './storage.js';

// ============================================================
// Context
// ============================================================
const StateContext = createContext(null);
const DispatchContext = createContext(null);

// ============================================================
// Reducer
// ============================================================
function reducer(state, action) {
  switch (action.type) {
    case 'LOG_STRENGTH':
      return logStrengthSession(state, action.entry);
    case 'UPDATE_STRENGTH':
      return updateStrengthLog(state, action.id, action.updates);
    case 'DELETE_STRENGTH':
      return deleteStrengthLog(state, action.id);
    case 'LOG_COND':
      return logCondSession(state, action.entry);
    case 'DELETE_COND':
      return deleteCondLog(state, action.id);
    case 'UPDATE_1RM':
      return updateOneRepMax(state, action.liftKey, action.value);
    case 'ADVANCE_WEEK':
      return advanceWeek(state);
    case 'ADVANCE_PROGRAM':
      return advanceProgram(state, action.nextProgramId);
    case 'SET_WEEK':
      return { ...state, currentWeekNumber: action.weekNumber };
    case 'SET_PROGRAM':
      return { ...state, currentProgramId: action.programId, currentWeekNumber: 1 };
    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode };
    case 'SAVE_CLUSTER':
      // action.cluster = [{name, oneRmKey, session}], action.newRMs = {key: defaultVal}
      return {
        ...state,
        clusterOverride: action.cluster,
        oneRepMaxes: { ...state.oneRepMaxes, ...action.newRMs },
      };
    case 'RESET_CLUSTER':
      return { ...state, clusterOverride: null };
    case 'IMPORT':
      return action.data;
    default:
      return state;
  }
}

// ============================================================
// Provider
// ============================================================
export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Persist on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// ============================================================
// Hooks
// ============================================================
export function useAppState() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}
