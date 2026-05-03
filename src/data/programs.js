// ============================================================
// Tactical Barbell Program Definitions
// All TB programs the user will progress through.
// Weights are NEVER stored here — they are computed at runtime
// from the user's current 1RMs using: round(1rm * pct / 5) * 5
// ============================================================

// HIC session library — referenced by id in program schedules
export const HIC_LIBRARY = {
  hic1:  { name: "Connaught Range 10-to-1s",  desc: "10 burpees, 100m sprint, count down to 1" },
  hic2:  { name: "Fast 5 Tempo Run",           desc: "5km run at 80–85% max heart rate" },
  hic3:  { name: "600m Resets",                desc: "Sprint 600m max effort, rest 3–5 min × 6" },
  hic7:  { name: "Black on Oxygen (BOO)",       desc: "60s KB swings, 800m run, 2–3 min rest × 5" },
  hic10: { name: "Short Hills",                 desc: "Hill sprint, 30–60s rest × 10" },
  hic14: { name: "Meat Eater II",               desc: "10 KB swings + 10 burpees, rest 60s × 10 for time" },
  hic16: { name: "Standard Issue Hills",        desc: "5–10 hill sprints, 1–2 min rest intervals" },
  hic17: { name: "Apex Hills",                  desc: "Hill sprint + 10 KB swings, walk down, rest 1–2 min × 5–10" },
  hic24: { name: "Devil's Trinity",             desc: "KB swings 1 min / burpees 1 min / heavy bag 1 min / rest 1 min × 5" },
  hic25: { name: "GC1",                         desc: "Burpees 3 min / rest 3 min / 2 min / rest 2 min / 1 min / rest 1 min, 1–3 rounds" },
};

// E (Endurance) session types
export const E_TYPES = {
  lss:      { name: "LSS Run",         desc: "Long Steady State — easy conversational pace" },
  ruck:     { name: "Ruck Up",          desc: "Ruck with 50 lb load" },
  bike:     { name: "Easy Bike",        desc: "Comfortable pace, do not push" },
  walkrun:  { name: "Walk/Run",         desc: "Interval run/walk protocol — see week details" },
  longrun:  { name: "Long Run",         desc: "Sustained easy effort, distance-focused" },
  tempo:    { name: "Tempo Run",        desc: "Comfortably hard, sustained pace" },
  hills:    { name: "Hill Repeats",     desc: "Controlled hill repeats at moderate effort" },
  track800: { name: "800m Repeats",     desc: "800m intervals with rest" },
};

// ============================================================
// PHASE 1 — Fighter + Walk/Run Build
// ============================================================
export const PHASE_1 = {
  id: "phase1-fighter",
  name: "Phase 1 — Fighter + Run Build",
  strengthTemplate: "Fighter",
  conditioningProtocol: "Walk/Run Build",
  sessionsPerWeek: 2,
  totalWeeks: 6,
  cluster: [
    { name: "Front Squat",   session: "A", oneRmKey: "frontSquat" },
    { name: "Bench Press",   session: "A", oneRmKey: "benchPress" },
    { name: "Deadlift",      session: "B", oneRmKey: "deadlift" },
    { name: "Barbell Row",   session: "B", oneRmKey: "barbellRow" },
  ],
  benchmarkToAdvance: "Complete all 12 strength sessions",
  nextPhase: "phase2-operator-black",
  weeks: [
    {
      weekNumber: 1,
      label: "Week 1",
      dateRange: "May 4 – 10, 2026",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 75,
      note: "Conservative start",
      sessionADate: "Monday, May 4",
      sessionBDate: "Thursday, May 7",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "1 min run / 2 min walk × 8 rounds", targetMin: 24, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace — do not push", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day — enjoy it", targetMin: null, optional: false },
      ],
    },
    {
      weekNumber: 2,
      label: "Week 2",
      dateRange: "May 11 – 17, 2026",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 80,
      note: "Building",
      sessionADate: "Monday, May 11",
      sessionBDate: "Thursday, May 14",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "1 min run / 2 min walk × 8 rounds", targetMin: 24, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day", targetMin: null, optional: false },
      ],
    },
    {
      weekNumber: 3,
      label: "Week 3",
      dateRange: "May 18 – 24, 2026",
      sets: { min: 3, max: 5 },
      reps: 3,
      intensityPct: 90,
      note: "Heavier weight, fewer reps",
      sessionADate: "Monday, May 18",
      sessionBDate: "Thursday, May 21",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "90 sec run / 90 sec walk × 10 rounds ↑ UPGRADE", targetMin: 30, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day", targetMin: null, optional: false },
      ],
    },
    {
      weekNumber: 4,
      label: "Week 4",
      dateRange: "May 25 – 31, 2026",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 75,
      note: "Reset — second wave",
      sessionADate: "Monday, May 25",
      sessionBDate: "Thursday, May 28",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "90 sec run / 90 sec walk × 10 rounds", targetMin: 30, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day", targetMin: null, optional: false },
      ],
    },
    {
      weekNumber: 5,
      label: "Week 5",
      dateRange: "June 1 – 7, 2026",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 80,
      note: "Building again",
      sessionADate: "Monday, June 1",
      sessionBDate: "Thursday, June 4",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "2 min run / 1 min walk × 10 rounds ↑ UPGRADE", targetMin: 30, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day", targetMin: null, optional: false },
      ],
    },
    {
      weekNumber: 6,
      label: "Week 6 — Peak Week",
      dateRange: "June 8 – 14, 2026",
      sets: { min: 3, max: 5 },
      reps: 3,
      intensityPct: 90,
      note: "Peak week — heaviest. Leave 1–2 reps in the tank.",
      sessionADate: "Monday, June 8",
      sessionBDate: "Thursday, June 11",
      conditioning: [
        { day: "Tue", type: "walkrun", label: "Walk/Run", protocol: "2 min run / 1 min walk × 10 rounds", targetMin: 30, optional: false },
        { day: "Wed", type: "bike",    label: "Easy Bike", protocol: "Comfortable pace", targetMin: 45, optional: true },
        { day: "Fri", type: "walkrun", label: "Bike or Walk/Run", protocol: "Your choice", targetMin: 45, optional: false },
        { day: "Sat", type: "versa",   label: "Versa / Hike / Bike", protocol: "Identity day", targetMin: null, optional: false },
      ],
    },
  ],
};

// ============================================================
// PHASE 2 — Operator + Black Protocol
// 3 strength sessions/week, HIC conditioning
// ============================================================
export const PHASE_2 = {
  id: "phase2-operator-black",
  name: "Phase 2 — Operator + Black Protocol",
  strengthTemplate: "Operator",
  conditioningProtocol: "Black",
  sessionsPerWeek: 3,
  totalWeeks: 6,
  cluster: [
    { name: "Front Squat",   session: "all", oneRmKey: "frontSquat" },
    { name: "Bench Press",   session: "all", oneRmKey: "benchPress" },
    { name: "Deadlift",      session: "all", oneRmKey: "deadlift" },
  ],
  clusterNote: "Use no more than 3 main lifts. All lifts every strength session.",
  benchmarkToAdvance: "Run 1–2 miles continuously",
  nextPhase: "phase3-gp-capacity",
  // Operator Regular: 6-week wave
  weeks: [
    {
      weekNumber: 1,
      label: "Week 1",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 70,
      note: "Conservative base",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC", hicId: "hic10", optional: false },
        { day: "Day 4", type: "hic", label: "HIC", hicId: "hic16", optional: false },
        { day: "Day 6", type: "hic", label: "HIC", hicId: "hic2",  optional: false },
      ],
    },
    {
      weekNumber: 2,
      label: "Week 2",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 80,
      note: "Building",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC", hicId: "hic7",  optional: false },
        { day: "Day 4", type: "hic", label: "HIC", hicId: "hic17", optional: false },
        { day: "Day 6", type: "lss", label: "E Run", protocol: "30–45 min easy LSS run", targetMin: 45, optional: false },
      ],
    },
    {
      weekNumber: 3,
      label: "Week 3",
      sets: { min: 3, max: 4 },
      reps: 3,
      intensityPct: 90,
      note: "Heavy — easy HIC week",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC Easy", hicId: "hic2",  optional: false },
        { day: "Day 4", type: "hic", label: "HIC Easy", hicId: "hic10", optional: false },
        { day: "Day 6", type: "hic", label: "HIC Easy", hicId: "hic16", optional: false },
      ],
    },
    {
      weekNumber: 4,
      label: "Week 4",
      sets: { min: 3, max: 5 },
      reps: 5,
      intensityPct: 75,
      note: "Reset — second wave",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC", hicId: "hic14", optional: false },
        { day: "Day 4", type: "hic", label: "HIC", hicId: "hic24", optional: false },
        { day: "Day 6", type: "lss", label: "E Run", protocol: "45–60 min easy LSS run", targetMin: 60, optional: false },
      ],
    },
    {
      weekNumber: 5,
      label: "Week 5",
      sets: { min: 3, max: 5 },
      reps: 3,
      intensityPct: 85,
      note: "Building",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC", hicId: "hic7",  optional: false },
        { day: "Day 4", type: "hic", label: "HIC", hicId: "hic17", optional: false },
        { day: "Day 6", type: "hic", label: "HIC", hicId: "hic25", optional: false },
      ],
    },
    {
      weekNumber: 6,
      label: "Week 6 — Peak",
      sets: { min: 3, max: 4 },
      reps: 2,
      intensityPct: 95,
      note: "Peak — maximum intensity, minimum HIC",
      conditioning: [
        { day: "Day 2", type: "hic", label: "HIC Easy", hicId: "hic2",  optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "hic", label: "HIC Easy", hicId: "hic10", optional: false },
      ],
    },
  ],
};

// ============================================================
// PHASE 3 — Green Protocol: Capacity (12 weeks)
// Operator strength + daily E runs, building aerobic base
// Benchmark: 6-mile run in under 60 minutes
// ============================================================
export const PHASE_3 = {
  id: "phase3-gp-capacity",
  name: "Phase 3 — Green Protocol: Capacity",
  strengthTemplate: "Operator",
  conditioningProtocol: "Green (Capacity)",
  sessionsPerWeek: 3,
  totalWeeks: 12,
  cluster: [
    { name: "Front Squat",   session: "all", oneRmKey: "frontSquat" },
    { name: "Bench Press",   session: "all", oneRmKey: "benchPress" },
    { name: "Deadlift",      session: "all", oneRmKey: "deadlift" },
  ],
  benchmarkToAdvance: "6-mile run in under 60 minutes",
  nextPhase: "phase4-gp-velocity",
  weeks: [
    // Weeks 1–3: Operator + 30–60 min E daily, 60–90 min Saturday
    ...[ {wk:1,intensityPct:70,reps:5,sets:{min:3,max:5},note:"Base building"},
         {wk:2,intensityPct:80,reps:5,sets:{min:3,max:5},note:"Building"},
         {wk:3,intensityPct:90,reps:3,sets:{min:3,max:4},note:"Heavy week"} ].map(w => ({
      weekNumber: w.wk,
      label: `Week ${w.wk}`,
      sets: w.sets,
      reps: w.reps,
      intensityPct: w.intensityPct,
      note: w.note,
      conditioning: [
        { day: "Day 2", type: "lss", label: "E Run", protocol: "30–60 min easy", targetMin: 45, optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "30–60 min easy", targetMin: 45, optional: false },
        { day: "Day 6", type: "lss", label: "Long E Run", protocol: "60–90 min easy", targetMin: 75, optional: false },
      ],
    })),
    // Week 4: Deload
    {
      weekNumber: 4,
      label: "Week 4 — Deload",
      sets: { min: 2, max: 3 },
      reps: 5,
      intensityPct: 60,
      note: "Deload — easy week, reduce volume",
      conditioning: [
        { day: "Day 2", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
      ],
    },
    // Weeks 5–7: Operator + 60–90 min E, 90–120 min Saturday
    ...[ {wk:5,intensityPct:70,reps:5,sets:{min:3,max:5},note:"Second wave base"},
         {wk:6,intensityPct:80,reps:5,sets:{min:3,max:5},note:"Building"},
         {wk:7,intensityPct:90,reps:3,sets:{min:3,max:4},note:"Heavy week"} ].map(w => ({
      weekNumber: w.wk,
      label: `Week ${w.wk}`,
      sets: w.sets,
      reps: w.reps,
      intensityPct: w.intensityPct,
      note: w.note,
      conditioning: [
        { day: "Day 2", type: "lss", label: "E Run", protocol: "60–90 min easy", targetMin: 75, optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "60–90 min easy", targetMin: 75, optional: false },
        { day: "Day 6", type: "lss", label: "Long E Run", protocol: "90–120 min easy", targetMin: 105, optional: false },
      ],
    })),
    // Week 8: Deload
    {
      weekNumber: 8,
      label: "Week 8 — Deload",
      sets: { min: 2, max: 3 },
      reps: 5,
      intensityPct: 60,
      note: "Deload",
      conditioning: [
        { day: "Day 2", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "lss", label: "E Run", protocol: "30 min easy", targetMin: 30, optional: false },
      ],
    },
    // Weeks 9–11: Operator + 60–120 min E, 120+ min Saturday
    ...[ {wk:9,intensityPct:70,reps:5,sets:{min:3,max:5},note:"Third wave base"},
         {wk:10,intensityPct:80,reps:5,sets:{min:3,max:5},note:"Building"},
         {wk:11,intensityPct:90,reps:3,sets:{min:3,max:4},note:"Heavy week"} ].map(w => ({
      weekNumber: w.wk,
      label: `Week ${w.wk}`,
      sets: w.sets,
      reps: w.reps,
      intensityPct: w.intensityPct,
      note: w.note,
      conditioning: [
        { day: "Day 2", type: "lss", label: "E Run", protocol: "60–120 min easy", targetMin: 90, optional: false },
        { day: "Day 4", type: "lss", label: "E Run", protocol: "60–120 min easy", targetMin: 90, optional: false },
        { day: "Day 6", type: "lss", label: "Long E Run", protocol: "120+ min easy", targetMin: 120, optional: false },
      ],
    })),
    // Week 12: Test week
    {
      weekNumber: 12,
      label: "Week 12 — Test Week",
      sets: { min: 0, max: 0 },
      reps: 0,
      intensityPct: 0,
      note: "Benchmark test — 6-mile run. No strength this week.",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run", protocol: "30 min very easy", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run", protocol: "30 min very easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "lss", label: "6-MILE BENCHMARK TEST", protocol: "Run 6 miles — record time", targetMin: 60, optional: false },
      ],
    },
  ],
};

// ============================================================
// PHASE 4 — Green Protocol: Velocity (17 weeks)
// Fighter strength + serious running progression
// Benchmark: 20-mile off-road run in 8 hours
// ============================================================
export const PHASE_4 = {
  id: "phase4-gp-velocity",
  name: "Phase 4 — Green Protocol: Velocity",
  strengthTemplate: "Fighter",
  conditioningProtocol: "Green (Velocity)",
  sessionsPerWeek: 2,
  totalWeeks: 17,
  cluster: [
    { name: "Front Squat",   session: "A", oneRmKey: "frontSquat" },
    { name: "Bench Press",   session: "A", oneRmKey: "benchPress" },
    { name: "Deadlift",      session: "B", oneRmKey: "deadlift" },
    { name: "Barbell Row",   session: "B", oneRmKey: "barbellRow" },
  ],
  benchmarkToAdvance: "20-mile off-road run in 8 hours (or 27 miles in 11 hours)",
  nextPhase: "phase5-gp-outcome",
  weeks: [
    {
      weekNumber: 1, label: "Week 1",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 75, note: "Fighter wave 1",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",       protocol: "5 miles easy trail/road", targetMin: 55,  optional: false },
        { day: "Day 3", type: "tempo",   label: "Tempo Run",  protocol: "3–5 miles at comfortably hard pace", targetMin: 35, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",       protocol: "3 miles easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",   protocol: "8 miles easy", targetMin: 90, optional: false },
      ],
    },
    {
      weekNumber: 2, label: "Week 2",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 80, note: "Building",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "6 miles easy", targetMin: 65, optional: false },
        { day: "Day 3", type: "hills",   label: "Hill Repeats", protocol: "8–10 × hill sprint, moderate effort", targetMin: 40, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "3 miles easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "9 miles easy", targetMin: 100, optional: false },
      ],
    },
    {
      weekNumber: 3, label: "Week 3",
      sets: { min: 3, max: 5 }, reps: 3, intensityPct: 90, note: "Heavy / speed work",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "6 miles easy", targetMin: 65, optional: false },
        { day: "Day 3", type: "track800",label: "800m Repeats", protocol: "3–5 × 800m with rest", targetMin: 40, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "3 miles easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "9 miles easy", targetMin: 100, optional: false },
      ],
    },
    {
      weekNumber: 4, label: "Week 4 — Deload",
      sets: { min: 2, max: 3 }, reps: 5, intensityPct: 60, note: "Deload",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
      ],
    },
    {
      weekNumber: 5, label: "Week 5",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 75, note: "Second wave",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",       protocol: "6 miles easy", targetMin: 65, optional: false },
        { day: "Day 3", type: "tempo",   label: "Tempo Run",  protocol: "3–5 miles tempo", targetMin: 35, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",       protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",   protocol: "11 miles easy", targetMin: 120, optional: false },
      ],
    },
    {
      weekNumber: 6, label: "Week 6",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 80, note: "Building",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "hills",   label: "Hill Repeats", protocol: "8–10 × hill repeats", targetMin: 45, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "12 miles easy", targetMin: 130, optional: false },
      ],
    },
    {
      weekNumber: 7, label: "Week 7",
      sets: { min: 3, max: 5 }, reps: 3, intensityPct: 90, note: "Heavy / speed",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "track800",label: "800m Repeats", protocol: "5 × 800m", targetMin: 45, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "12 miles easy", targetMin: 130, optional: false },
      ],
    },
    {
      weekNumber: 8, label: "Week 8 — Deload",
      sets: { min: 2, max: 3 }, reps: 5, intensityPct: 60, note: "Deload",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
        { day: "Day 6", type: "lss", label: "Easy Run", protocol: "3 miles very easy", targetMin: 30, optional: false },
      ],
    },
    // Weeks 9–17: progressively longer long runs up to back-to-back long runs
    {
      weekNumber: 9, label: "Week 9",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 75, note: "Third wave",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",       protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "tempo",   label: "Tempo Run",  protocol: "4–5 miles tempo", targetMin: 40, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",       protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",   protocol: "13 miles easy", targetMin: 140, optional: false },
      ],
    },
    {
      weekNumber: 10, label: "Week 10",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 80, note: "Building",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "hills",   label: "Hill Repeats", protocol: "10 × hill repeats", targetMin: 50, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "5 miles easy", targetMin: 50, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "14 miles easy", targetMin: 150, optional: false },
      ],
    },
    {
      weekNumber: 11, label: "Week 11",
      sets: { min: 3, max: 5 }, reps: 3, intensityPct: 90, note: "Heavy / speed",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "track800",label: "800m Repeats", protocol: "5–6 × 800m", targetMin: 50, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "5 miles easy", targetMin: 50, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "15 miles easy", targetMin: 165, optional: false },
      ],
    },
    {
      weekNumber: 12, label: "Week 12 — Deload",
      sets: { min: 2, max: 3 }, reps: 5, intensityPct: 60, note: "Deload",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
      ],
    },
    {
      weekNumber: 13, label: "Week 13",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 75, note: "Fourth wave — back-to-back long runs approaching",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",       protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "tempo",   label: "Tempo Run",  protocol: "5 miles tempo", targetMin: 45, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",       protocol: "5 miles easy", targetMin: 50, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",   protocol: "16 miles easy", targetMin: 175, optional: false },
      ],
    },
    {
      weekNumber: 14, label: "Week 14",
      sets: { min: 3, max: 5 }, reps: 5, intensityPct: 80, note: "Building",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "hills",   label: "Hill Repeats", protocol: "10–12 × hill repeats", targetMin: 55, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "5 miles easy", targetMin: 50, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "17 miles easy", targetMin: 185, optional: false },
      ],
    },
    {
      weekNumber: 15, label: "Week 15",
      sets: { min: 3, max: 5 }, reps: 3, intensityPct: 90, note: "Heavy / speed",
      conditioning: [
        { day: "Day 2", type: "lss",     label: "LSS",         protocol: "8 miles easy", targetMin: 85, optional: false },
        { day: "Day 3", type: "track800",label: "800m Repeats", protocol: "6 × 800m", targetMin: 55, optional: false },
        { day: "Day 5", type: "lss",     label: "LSS",         protocol: "5 miles easy", targetMin: 50, optional: false },
        { day: "Day 6", type: "longrun", label: "Long Run",     protocol: "18 miles easy", targetMin: 195, optional: false },
      ],
    },
    {
      weekNumber: 16, label: "Week 16 — Deload",
      sets: { min: 2, max: 3 }, reps: 5, intensityPct: 60, note: "Deload — taper begins",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
        { day: "Day 6", type: "lss", label: "Easy Run", protocol: "4 miles easy", targetMin: 40, optional: false },
      ],
    },
    {
      weekNumber: 17, label: "Week 17 — BENCHMARK",
      sets: { min: 0, max: 0 }, reps: 0, intensityPct: 0,
      note: "Benchmark attempt — 20-mile off-road run. No strength this week.",
      conditioning: [
        { day: "Day 2", type: "lss", label: "Easy Run",          protocol: "3 miles shakeout", targetMin: 30, optional: false },
        { day: "Day 4", type: "lss", label: "Easy Run",          protocol: "2 miles shakeout", targetMin: 20, optional: false },
        { day: "Day 6", type: "longrun", label: "20-MILE BENCHMARK", protocol: "20-mile off-road run — target 8 hours or less", targetMin: 480, optional: false },
      ],
    },
  ],
};

// ============================================================
// PHASE 5 — Green Protocol: Outcome (17 weeks)
// Fighter strength + rucking focus
// Benchmark: 20-mile ruck with 50 lbs
// ============================================================
export const PHASE_5 = {
  id: "phase5-gp-outcome",
  name: "Phase 5 — Green Protocol: Outcome",
  strengthTemplate: "Fighter",
  conditioningProtocol: "Green (Outcome)",
  sessionsPerWeek: 2,
  totalWeeks: 17,
  cluster: [
    { name: "Front Squat",   session: "A", oneRmKey: "frontSquat" },
    { name: "Bench Press",   session: "A", oneRmKey: "benchPress" },
    { name: "Deadlift",      session: "B", oneRmKey: "deadlift" },
    { name: "Barbell Row",   session: "B", oneRmKey: "barbellRow" },
  ],
  benchmarkToAdvance: "20-mile ruck with 50 lbs",
  nextPhase: null,
  weeks: [
    // Weeks 1–3
    ...[ {wk:1,pct:75,reps:5,sets:{min:3,max:5},note:"Base ruck building"},
         {wk:2,pct:80,reps:5,sets:{min:3,max:5},note:"Building"},
         {wk:3,pct:90,reps:3,sets:{min:3,max:5},note:"Heavy"} ].map(w => ({
      weekNumber: w.wk, label: `Week ${w.wk}`,
      sets: w.sets, reps: w.reps, intensityPct: w.pct, note: w.note,
      conditioning: [
        { day: "Day 2", type: "lss",  label: "LSS Run",  protocol: "30–45 min easy run", targetMin: 40, optional: false },
        { day: "Day 4", type: "ruck", label: "Ruck",     protocol: `Ruck ${4 + w.wk} miles with 50 lb pack`, targetMin: (4 + w.wk) * 20, optional: false },
        { day: "Day 6", type: "lss",  label: "Long Run", protocol: "45–60 min easy run", targetMin: 55, optional: false },
      ],
    })),
    // Week 4: Deload
    {
      weekNumber: 4, label: "Week 4 — Deload",
      sets: { min: 2, max: 3 }, reps: 5, intensityPct: 60, note: "Deload",
      conditioning: [
        { day: "Day 2", type: "lss",  label: "Easy Run", protocol: "20 min easy", targetMin: 20, optional: false },
        { day: "Day 4", type: "ruck", label: "Easy Ruck", protocol: "3 miles easy ruck with 50 lb", targetMin: 60, optional: false },
        { day: "Day 6", type: "lss",  label: "Easy Run", protocol: "20 min easy", targetMin: 20, optional: false },
      ],
    },
    // Weeks 5–16 follow similar pattern with progressively longer rucks
    ...Array.from({length: 12}, (_, i) => {
      const wk = 5 + i;
      const isDeload = [8, 12, 16].includes(wk);
      const wave = Math.floor((wk - 5) / 4);
      const pcts = [75, 80, 90];
      const repsArr = [5, 5, 3];
      const wavePos = (wk - 5) % 4;
      const ruckMiles = Math.min(4 + wk, 18);
      return {
        weekNumber: wk,
        label: isDeload ? `Week ${wk} — Deload` : `Week ${wk}`,
        sets: isDeload ? { min: 2, max: 3 } : { min: 3, max: 5 },
        reps: isDeload ? 5 : (repsArr[wavePos] ?? 5),
        intensityPct: isDeload ? 60 : (pcts[wavePos] ?? 75),
        note: isDeload ? "Deload" : ["Base", "Building", "Heavy", ""][wavePos],
        conditioning: isDeload
          ? [
              { day: "Day 2", type: "lss",  label: "Easy Run",  protocol: "20 min easy", targetMin: 20, optional: false },
              { day: "Day 4", type: "ruck", label: "Easy Ruck", protocol: "3 miles easy ruck with 50 lb", targetMin: 60, optional: false },
              { day: "Day 6", type: "lss",  label: "Easy Run",  protocol: "20 min easy", targetMin: 20, optional: false },
            ]
          : [
              { day: "Day 2", type: "lss",  label: "LSS Run",  protocol: "30–45 min easy run", targetMin: 40, optional: false },
              { day: "Day 4", type: "ruck", label: "Ruck",     protocol: `Ruck ${ruckMiles} miles with 50 lb pack`, targetMin: ruckMiles * 20, optional: false },
              { day: "Day 6", type: "lss",  label: "Long Run", protocol: "45–60 min easy run", targetMin: 55, optional: false },
            ],
      };
    }),
    // Week 17: Benchmark
    {
      weekNumber: 17, label: "Week 17 — BENCHMARK",
      sets: { min: 0, max: 0 }, reps: 0, intensityPct: 0,
      note: "Benchmark — 20-mile ruck with 50 lbs. No strength this week.",
      conditioning: [
        { day: "Day 2", type: "lss",  label: "Easy Run",         protocol: "2 miles easy shakeout", targetMin: 20, optional: false },
        { day: "Day 4", type: "ruck", label: "Short Ruck",        protocol: "3 miles with 50 lb — legs-and-pack check", targetMin: 60, optional: false },
        { day: "Day 6", type: "ruck", label: "20-MILE RUCK BENCHMARK", protocol: "20-mile ruck with 50 lb pack — go", targetMin: 480, optional: false },
      ],
    },
  ],
};

// ============================================================
// All programs in order
// ============================================================
export const ALL_PROGRAMS = [PHASE_1, PHASE_2, PHASE_3, PHASE_4, PHASE_5];

export const PROGRAM_MAP = Object.fromEntries(ALL_PROGRAMS.map(p => [p.id, p]));

// Default 1RMs from the plan
export const DEFAULT_ONE_RMS = {
  frontSquat:  125,
  deadlift:    200,
  benchPress:  150,
  barbellRow:  120,
};

// Compute target weight from 1RM, rounded to nearest 5 lb
export function targetWeight(oneRm, intensityPct) {
  return Math.round((oneRm * intensityPct / 100) / 5) * 5;
}
