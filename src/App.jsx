import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StateProvider, useAppState } from './lib/StateContext.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './views/Dashboard.jsx';
import StrengthSession from './views/StrengthSession.jsx';
import CondSession from './views/CondSession.jsx';
import History from './views/History.jsx';
import Settings from './views/Settings.jsx';
import './App.css';

function DarkModeEffect() {
  const state = useAppState();
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);
  return null;
}

function App() {
  return (
    <StateProvider>
      <DarkModeEffect />
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/session/strength/:session" element={<StrengthSession />} />
            <Route path="/session/cond/:condIndex" element={<CondSession />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <NavBar />
        </div>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
