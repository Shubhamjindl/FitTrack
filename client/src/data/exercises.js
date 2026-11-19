/**
 * Curated list of 43 foundational exercises across 5 core categories:
 * - Strength (Gym & Weights - 21 exercises)
 * - Bodyweight (Calisthenics & Core - 7 exercises)
 * - Yoga (Asanas & Flexibility - 5 exercises)
 * - Cardio (Running, Cycling & Conditioning - 4 exercises)
 * - Hybrid & Sports (Sports & Cross-Training - 6 exercises)
 */

export const EXERCISE_DATABASE = [
  // ── 1. STRENGTH (Gym & Weights) ──────────────────────────────
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Chest, Triceps, Shoulders',
    equipment: 'Barbell & Bench',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 60,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="8" y="38" width="48" height="6" rx="2" fill="currentColor" fill-opacity="0.18"/><line x1="16" y1="44" x2="16" y2="54"/><line x1="48" y1="44" x2="48" y2="54"/><circle cx="16" cy="32" r="4" fill="currentColor"/><line x1="20" y1="34" x2="40" y2="34" stroke-width="3.5"/><polyline points="40,34 46,44 48,54"/><polyline points="26,34 26,20 22,14"/><polyline points="32,34 32,20 36,14"/><line x1="12" y1="14" x2="46" y2="14" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Quads, Glutes, Hamstrings',
    equipment: 'Barbell & Squat Rack',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 8,
    defaultWeight: 80,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="30" cy="16" r="4" fill="currentColor"/><line x1="30" y1="20" x2="26" y2="36" stroke-width="3.5"/><polyline points="26,36 16,42 22,54" stroke-width="3"/><line x1="12" y1="21" x2="48" y2="21" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Back, Legs, Hamstrings, Glutes',
    equipment: 'Barbell & Plates',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 6,
    defaultWeight: 90,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="34" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="26" y2="38" stroke-width="3.5"/><polyline points="26,38 20,44 24,54" stroke-width="3"/><line x1="28" y1="24" x2="26" y2="44"/><line x1="10" y1="44" x2="46" y2="44" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'overhead-shoulder-press',
    name: 'Overhead Shoulder Press',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Shoulders, Triceps, Upper Chest',
    equipment: 'Barbell or Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 40,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="22" r="4" fill="currentColor"/><line x1="32" y1="26" x2="32" y2="42" stroke-width="3.5"/><polyline points="32,42 26,56"/><polyline points="32,42 38,56"/><polyline points="32,30 24,22 22,12"/><polyline points="32,30 40,22 42,12"/><line x1="14" y1="12" x2="50" y2="12" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'dumbbell-bicep-curl',
    name: 'Dumbbell Bicep Curl',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Arms, Biceps, Forearms',
    equipment: 'Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 14,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="16" r="4" fill="currentColor"/><line x1="32" y1="20" x2="32" y2="38" stroke-width="3"/><polyline points="32,38 28,48 26,56"/><polyline points="32,38 36,48 38,56"/><polyline points="32,24 24,28 22,20"/><circle cx="22" cy="18" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Back, Lats, Biceps',
    equipment: 'Cable Machine',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 50,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="18" y="38" width="28" height="18" rx="2" fill="currentColor" fill-opacity="0.18"/><circle cx="32" cy="22" r="4" fill="currentColor"/><line x1="32" y1="26" x2="32" y2="40" stroke-width="3"/><polyline points="32,30 22,20 18,16"/><polyline points="32,30 42,20 46,16"/><line x1="12" y1="16" x2="52" y2="16" stroke="#10b981" stroke-width="3"/><line x1="32" y1="8" x2="32" y2="16" stroke="#10b981"/></svg>`,
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Chest, Upper Chest, Shoulders, Triceps',
    equipment: 'Incline Bench & Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 22,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="48" x2="44" y2="28" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="24" r="4" fill="currentColor"/><line x1="28" y1="28" x2="38" y2="40" stroke-width="3.5"/><line x1="18" y1="18" x2="26" y2="28"/><circle cx="16" cy="16" r="2.5" fill="#10b981"/><line x1="32" y1="20" x2="40" y2="30"/><circle cx="42" cy="18" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'cable-chest-flyes',
    name: 'Cable Chest Flyes',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Chest, Pectoralis Major',
    equipment: 'Cable Crossover Machine',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 15,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="40" stroke-width="3.5"/><polyline points="32,40 26,54"/><polyline points="32,40 38,54"/><path d="M12 20 Q 24 28 30 30" stroke="#10b981" stroke-width="2.5"/><path d="M52 20 Q 40 28 34 30" stroke="#10b981" stroke-width="2.5"/><circle cx="12" cy="20" r="2.5" fill="#10b981"/><circle cx="52" cy="20" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent Over Row',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Back, Lats, Rhomboids, Biceps',
    equipment: 'Barbell & Plates',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 8,
    defaultWeight: 55,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="22" cy="22" r="4" fill="currentColor"/><line x1="24" y1="26" x2="38" y2="34" stroke-width="3.5"/><polyline points="38,34 34,44 40,54" stroke-width="3"/><polyline points="28,28 32,38 32,46"/><line x1="16" y1="46" x2="48" y2="46" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Back, Lats, Rhomboids, Biceps',
    equipment: 'Low Cable Row Machine',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 50,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="10" y="44" width="22" height="6" rx="2" fill="currentColor" fill-opacity="0.18"/><circle cx="22" cy="24" r="4" fill="currentColor"/><line x1="22" y1="28" x2="22" y2="44" stroke-width="3.5"/><polyline points="22,44 32,44 42,44"/><line x1="22" y1="32" x2="34" y2="34"/><line x1="34" y1="34" x2="52" y2="34" stroke="#10b981" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'lateral-dumbbell-raise',
    name: 'Lateral Dumbbell Raise',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Shoulders, Lateral Deltoids',
    equipment: 'Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 10,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke-width="3.5"/><polyline points="32,42 26,56"/><polyline points="32,42 38,56"/><line x1="14" y1="28" x2="50" y2="28" stroke="#10b981" stroke-width="3"/><circle cx="12" cy="28" r="2.5" fill="#10b981"/><circle cx="52" cy="28" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'triceps-rope-pushdown',
    name: 'Triceps Rope Pushdown',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Arms, Triceps',
    equipment: 'Cable Machine & Rope',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 22,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="18" r="4" fill="currentColor"/><line x1="28" y1="22" x2="28" y2="42" stroke-width="3.5"/><polyline points="28,42 24,56"/><polyline points="28,42 32,56"/><polyline points="28,26 36,32 38,44"/><line x1="42" y1="12" x2="38" y2="44" stroke="#10b981" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Quads, Glutes, Hamstrings',
    equipment: 'Leg Press Machine',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 140,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="52" x2="48" y2="28" stroke="currentColor" stroke-width="3"/><circle cx="20" cy="40" r="4" fill="currentColor"/><polyline points="24,42 32,38 42,26" stroke-width="3.5"/><line x1="38" y1="20" x2="48" y2="34" stroke="#10b981" stroke-width="4"/></svg>`,
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Hamstrings, Glutes, Back',
    equipment: 'Barbell or Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 65,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="20" r="4" fill="currentColor"/><line x1="26" y1="24" x2="38" y2="34" stroke-width="3.5"/><polyline points="38,34 38,46 38,54" stroke-width="3"/><line x1="30" y1="26" x2="36" y2="42"/><line x1="22" y1="42" x2="50" y2="42" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Leg Curl',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Hamstrings, Calves',
    equipment: 'Lying Leg Curl Machine',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 35,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="10" y="38" width="44" height="6" rx="2" fill="currentColor" fill-opacity="0.18"/><circle cx="18" cy="30" r="4" fill="currentColor"/><line x1="22" y1="34" x2="38" y2="34" stroke-width="3.5"/><polyline points="38,34 46,26 44,18" stroke-width="3"/><circle cx="44" cy="18" r="3" fill="#10b981"/></svg>`,
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Calves',
    equipment: 'Calf Machine or Dumbbells',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 15,
    defaultWeight: 45,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="16" r="4" fill="currentColor"/><line x1="32" y1="20" x2="32" y2="38" stroke-width="3.5"/><polyline points="32,38 28,48 30,54"/><polyline points="32,38 36,48 34,54"/><line x1="18" y1="56" x2="46" y2="56" stroke="currentColor" stroke-width="3"/><polyline points="28,54 32,50 34,54" stroke="#10b981" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'conventional-deadlift',
    name: 'Conventional Deadlift',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Back, Legs, Glutes, Hamstrings',
    equipment: 'Barbell & Plates',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 6,
    defaultWeight: 100,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="34" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="26" y2="38" stroke-width="3.5"/><polyline points="26,38 20,44 24,54" stroke-width="3"/><line x1="28" y1="24" x2="26" y2="44"/><line x1="10" y1="44" x2="46" y2="44" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: ['Strength', 'Bodyweight'],
    categoryLabel: 'Strength & Weights',
    muscles: 'Legs, Quads, Glutes, Hamstrings',
    equipment: 'Dumbbells or Bodyweight',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 16,
    unit: 'kg',
    repsLabel: 'Reps per Leg',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="14" r="4" fill="currentColor"/><line x1="32" y1="18" x2="28" y2="34" stroke-width="3.5"/><polyline points="28,34 16,42 18,54" stroke-width="3"/><polyline points="28,34 38,40 44,52" stroke-width="3"/><line x1="26" y1="26" x2="24" y2="38"/><circle cx="24" cy="38" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Curl',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Arms, Biceps, Forearms',
    equipment: 'Incline Bench & Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 12,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="14" y1="46" x2="42" y2="28" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="22" r="4" fill="currentColor"/><line x1="28" y1="26" x2="36" y2="38" stroke-width="3"/><polyline points="28,28 20,34 22,26"/><circle cx="22" cy="24" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'barbell-bicep-curl',
    name: 'Barbell Bicep Curl',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Arms, Biceps, Forearms',
    equipment: 'Barbell or EZ Bar',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 30,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="16" r="4" fill="currentColor"/><line x1="32" y1="20" x2="32" y2="38" stroke-width="3"/><polyline points="32,38 28,54"/><polyline points="32,38 36,54"/><polyline points="32,24 24,28 24,20"/><polyline points="32,24 40,28 40,20"/><line x1="16" y1="20" x2="48" y2="20" stroke="#10b981" stroke-width="3"/></svg>`,
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Chest, Pectoralis, Shoulders',
    equipment: 'Flat Bench & Dumbbells',
    mode: 'weight',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 14,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="12" y="38" width="40" height="6" rx="2" fill="currentColor" fill-opacity="0.18"/><circle cx="20" cy="34" r="4" fill="currentColor"/><line x1="24" y1="34" x2="44" y2="34" stroke-width="3.5"/><path d="M16 22 Q 28 28 32 34" stroke="#10b981" stroke-width="2.5"/><path d="M48 22 Q 36 28 32 34" stroke="#10b981" stroke-width="2.5"/><circle cx="16" cy="22" r="2.5" fill="#10b981"/><circle cx="48" cy="22" r="2.5" fill="#10b981"/></svg>`,
  },
  {
    id: 'overhead-barbell-press',
    name: 'Overhead Barbell Press',
    category: 'Strength',
    categoryLabel: 'Strength & Weights',
    muscles: 'Shoulders, Triceps, Core',
    equipment: 'Barbell',
    mode: 'weight',
    defaultSets: 4,
    defaultReps: 8,
    defaultWeight: 45,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="22" r="4" fill="currentColor"/><line x1="32" y1="26" x2="32" y2="42" stroke-width="3.5"/><polyline points="32,42 26,56"/><polyline points="32,42 38,56"/><polyline points="32,30 24,22 22,12"/><polyline points="32,30 40,22 42,12"/><line x1="14" y1="12" x2="50" y2="12" stroke="#10b981" stroke-width="3"/></svg>`,
  },

  // ── 2. BODYWEIGHT (Calisthenics & Core) ────────────────────────
  {
    id: 'standard-pushups',
    name: 'Standard Push-ups',
    category: ['Bodyweight', 'Strength'],
    categoryLabel: 'Bodyweight & Strength',
    muscles: 'Chest, Triceps, Shoulders, Core',
    equipment: 'Floor / Bodyweight',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'Added Wt (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="48" cy="30" r="4" fill="currentColor"/><line x1="44" y1="32" x2="18" y2="42" stroke-width="3.5"/><polyline points="18,42 16,50"/><polyline points="40,34 38,44 42,48"/></svg>`,
  },
  {
    id: 'pullups',
    name: 'Pull-ups',
    category: ['Bodyweight', 'Strength'],
    categoryLabel: 'Bodyweight & Strength',
    muscles: 'Back, Lats, Biceps',
    equipment: 'Pull-up Bar',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'Added Wt (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="8" y1="12" x2="56" y2="12" stroke="currentColor" stroke-width="3"/><polyline points="20,12 24,22 28,26"/><polyline points="44,12 40,22 36,26"/><circle cx="32" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke-width="3"/><polyline points="32,42 30,52 34,54"/></svg>`,
  },
  {
    id: 'parallel-bar-dips',
    name: 'Parallel Bar Dips',
    category: ['Bodyweight', 'Strength'],
    categoryLabel: 'Bodyweight & Strength',
    muscles: 'Chest, Triceps, Anterior Deltoid',
    equipment: 'Dip Bars',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'Added Wt (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="28" x2="22" y2="28" stroke="currentColor" stroke-width="3"/><line x1="42" y1="28" x2="52" y2="28" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="38" stroke-width="3.5"/><polyline points="32,26 22,28"/><polyline points="32,26 42,28"/><polyline points="32,38 28,48 30,54"/><polyline points="32,38 36,48 34,54"/></svg>`,
  },
  {
    id: 'bodyweight-squats',
    name: 'Bodyweight Squats',
    category: 'Bodyweight',
    categoryLabel: 'Bodyweight & Calisthenics',
    muscles: 'Legs, Quads, Glutes, Calves',
    equipment: 'Floor / Bodyweight',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 20,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'Added Wt (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="14" r="4" fill="currentColor"/><line x1="32" y1="18" x2="28" y2="34" stroke-width="3.5"/><polyline points="28,34 18,40 22,54" stroke-width="3"/><polyline points="32,22 22,26 20,32"/><polyline points="32,22 42,26 44,32"/></svg>`,
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'Bodyweight',
    categoryLabel: 'Bodyweight & Calisthenics',
    muscles: 'Core, Abdominals, Hip Flexors',
    equipment: 'Pull-up Bar',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'Added Wt (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="12" x2="52" y2="12" stroke="currentColor" stroke-width="3"/><polyline points="24,12 28,22 30,26"/><polyline points="40,12 36,22 34,26"/><circle cx="32" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="38" stroke-width="3.5"/><line x1="32" y1="38" x2="48" y2="38" stroke="#0ea5e9" stroke-width="3.5"/></svg>`,
  },
  {
    id: 'forearm-plank',
    name: 'Forearm Core Plank',
    category: 'Bodyweight',
    categoryLabel: 'Bodyweight & Calisthenics',
    muscles: 'Core, Abdominals, Lower Back, Shoulders',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 45,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'Extra (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="46" cy="34" r="4" fill="currentColor"/><line x1="42" y1="36" x2="16" y2="38" stroke-width="3.5"/><polyline points="16,38 14,46"/><polyline points="40,38 40,46 44,46"/></svg>`,
  },

  // ── 3. YOGA (Asanas & Flexibility) ───────────────────────────
  {
    id: 'surya-namaskar',
    name: 'Surya Namaskar',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Full Body, Spine, Core, Hamstrings',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 5,
    defaultReps: 1,
    defaultWeight: 0,
    unit: 'cycles',
    repsLabel: 'Cycles / Rounds',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="14" r="4" fill="currentColor"/><line x1="32" y1="18" x2="32" y2="38" stroke-width="3"/><polyline points="32,38 28,48 26,56"/><polyline points="32,38 36,48 38,56"/><polyline points="32,22 26,16 32,8 38,16 32,22" stroke="#8b5cf6"/></svg>`,
  },
  {
    id: 'adho-mukha-svanasana',
    name: 'Downward Dog',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Back, Hamstrings, Calves, Shoulders',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 45,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="16" cy="46" r="4" fill="currentColor"/><polyline points="18,44 32,22 48,50" stroke-width="3.5"/><line x1="16" y1="46" x2="14" y2="52"/></svg>`,
  },
  {
    id: 'virabhadrasana-ii',
    name: 'Warrior II Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Legs, Hips, Quads, Balance',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold per side (s)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="30" cy="16" r="4" fill="currentColor"/><line x1="30" y1="20" x2="30" y2="38" stroke-width="3"/><polyline points="30,38 20,44 18,54"/><polyline points="30,38 42,42 46,54"/><line x1="10" y1="24" x2="52" y2="24" stroke="#8b5cf6" stroke-width="3"/></svg>`,
  },
  {
    id: 'bhujangasana',
    name: 'Cobra Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Back, Spine, Chest, Core',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="48" cy="22" r="4" fill="currentColor"/><path d="M46,26 Q36,32 24,40 L12,46" stroke-width="3.5"/><polyline points="44,32 46,46"/><line x1="10" y1="48" x2="48" y2="48" stroke="currentColor" stroke-opacity="0.3"/></svg>`,
  },
  {
    id: 'balasana',
    name: 'Child\'s Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Back, Hips, Spine, Recovery',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 2,
    defaultReps: 60,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="40" r="4" fill="currentColor"/><path d="M22,42 Q30,34 38,42 L42,48" stroke-width="3.5"/><line x1="22" y1="44" x2="12" y2="46"/><line x1="10" y1="48" x2="52" y2="48" stroke="currentColor" stroke-opacity="0.3"/></svg>`,
  },

  // ── 4. CARDIO (Running, Cycling & Conditioning) ───────────────
  {
    id: 'running-treadmill',
    name: 'Running / Treadmill',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs, Cardiovascular, Calves, Quads',
    equipment: 'Treadmill / Track',
    mode: 'cardio',
    defaultSets: 1,
    defaultReps: 25,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (Minutes)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="36" cy="16" r="4" fill="currentColor"/><line x1="34" y1="20" x2="30" y2="34" stroke-width="3"/><polyline points="30,34 22,38 18,52"/><polyline points="30,34 38,40 44,48"/><polyline points="32,24 24,28 20,34"/><polyline points="32,24 40,26 44,22"/></svg>`,
  },
  {
    id: 'cycling-spin',
    name: 'Cycling / Spin Bike',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs, Quads, Hamstrings, Cardiovascular',
    equipment: 'Stationary Bike',
    mode: 'cardio',
    defaultSets: 1,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (Minutes)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="44" r="8"/><circle cx="44" cy="44" r="8"/><polyline points="20,44 32,44 26,28 40,28 44,44"/><circle cx="34" cy="18" r="3.5" fill="currentColor"/><line x1="34" y1="22" x2="28" y2="32" stroke-width="3"/><polyline points="30,22 40,24"/></svg>`,
  },
  {
    id: 'full-body-burpees',
    name: 'Full Body Burpees',
    category: ['Cardio', 'Bodyweight'],
    categoryLabel: 'Cardio & Bodyweight',
    muscles: 'Full Body, Cardiovascular, Quads, Chest',
    equipment: 'Floor / Bodyweight',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="36" cy="14" r="4" fill="currentColor"/><line x1="36" y1="18" x2="28" y2="32" stroke-width="3"/><polyline points="28,32 18,36 14,48"/><polyline points="32,22 44,14"/></svg>`,
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs, Calves, Footwork, Cardiovascular',
    equipment: 'Jump Rope',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 60,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Duration (Seconds)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="16" r="4" fill="currentColor"/><line x1="32" y1="20" x2="32" y2="40" stroke-width="3"/><polyline points="32,40 28,52"/><polyline points="32,40 36,52"/><path d="M22,30 Q12,48 32,56 Q52,48 42,30" stroke="#f59e0b" stroke-width="2"/></svg>`,
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: ['Cardio', 'Bodyweight'],
    categoryLabel: 'Cardio & Bodyweight',
    muscles: 'Core, Hip Flexors, Cardiovascular',
    equipment: 'Floor / Mat',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Duration (Seconds)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="48" cy="30" r="4" fill="currentColor"/><polyline points="44,34 32,38 18,46"/><polyline points="32,38 30,30 24,34"/></svg>`,
  },

  // --- HYBRID & SPORTS (6 Movements) ---
  {
    id: 'kettlebell-swings',
    name: 'Kettlebell Swings',
    category: ['Cardio', 'Strength'],
    categoryLabel: 'Cardio & Strength',
    muscles: 'Full Body, Glutes, Hamstrings, Core',
    equipment: 'Kettlebell',
    mode: 'cardio',
    defaultSets: 4,
    defaultReps: 20,
    defaultWeight: 20,
    unit: 'kg',
    repsLabel: 'Reps',
    weightLabel: 'Weight (kg)',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="18" r="4" fill="currentColor"/><line x1="28" y1="22" x2="32" y2="38" stroke-width="3.5"/><polyline points="32,38 28,52"/><polyline points="32,38 38,52"/><line x1="28" y1="26" x2="44" y2="28" stroke-width="2.5"/><circle cx="48" cy="28" r="4" fill="#f59e0b"/></svg>`,
  },
  {
    id: 'swimming-laps',
    name: 'Swimming Laps',
    category: 'Other',
    categoryLabel: 'Hybrid & Sports',
    muscles: 'Full Body, Back, Shoulders, Core',
    equipment: 'Pool',
    mode: 'cardio',
    defaultSets: 4,
    defaultReps: 50,
    defaultWeight: 0,
    unit: 'm / laps',
    repsLabel: 'Laps / Meters',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="24" r="4" fill="currentColor"/><line x1="24" y1="26" x2="42" y2="30"/><line x1="42" y1="30" x2="52" y2="28"/><line x1="30" y1="28" x2="22" y2="36"/><path d="M12,42 Q20,38 28,42 T44,42 T60,42"/></svg>`,
  },
  {
    id: 'sports-drills',
    name: 'Sports Agility Drills',
    category: 'Other',
    categoryLabel: 'Hybrid & Sports',
    muscles: 'Legs, Calves, Agility, Quads',
    equipment: 'Cones / Open Field',
    mode: 'cardio',
    defaultSets: 5,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Duration (sec)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="40" cy="18" r="4" fill="currentColor"/><polyline points="36,22 28,32 38,40 32,54"/><polyline points="28,32 18,36 14,46"/></svg>`,
  },
  {
    id: 'badminton-tennis',
    name: 'Badminton / Tennis',
    category: 'Other',
    categoryLabel: 'Hybrid & Sports',
    muscles: 'Shoulders, Arms, Calves, Core',
    equipment: 'Racket & Court',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (min)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="34" cy="18" r="4" fill="currentColor"/><line x1="32" y1="22" x2="26" y2="38"/><line x1="26" y1="38" x2="16" y2="52"/><line x1="30" y1="28" x2="44" y2="20"/><circle cx="48" cy="16" r="5"/></svg>`,
  },
  {
    id: 'boxing-bag',
    name: 'Boxing / Heavy Bag',
    category: 'Other',
    categoryLabel: 'Hybrid & Sports',
    muscles: 'Shoulders, Arms, Core, Lats',
    equipment: 'Gloves / Heavy Bag',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 180,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Round Duration (sec)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="18" r="4" fill="currentColor"/><line x1="28" y1="22" x2="26" y2="38"/><polyline points="26,38 32,54"/><polyline points="26,28 38,24 46,24"/><circle cx="48" cy="24" r="3" fill="currentColor"/></svg>`,
  },
  {
    id: 'dynamic-mobility',
    name: 'Dynamic Mobility & Stretching',
    category: 'Other',
    categoryLabel: 'Hybrid & Sports',
    muscles: 'Full Body, Hips, Hamstrings, Back',
    equipment: 'Floor / Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 45,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold / Flow Duration (sec)',
    weightLabel: 'N/A',
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="20" r="4" fill="currentColor"/><polyline points="24,24 28,38 42,42 50,54"/><polyline points="28,32 38,28 48,32"/></svg>`,
  },
];

/**
 * Normalizes an exercise name for fuzzy / alias matching (removes punctuation, brackets, extra whitespace)
 */
export const normalizeExerciseName = (name = '') => {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '') // remove parenthetical content like (45° incline) or (rdl)
    .replace(/[^a-z0-9]/g, '') // remove hyphens, spaces, slashes
    .trim();
};

/**
 * Find matching preset by name or alias
 */
export const findPresetExercise = (name = '') => {
  if (!name) return null;
  const direct = EXERCISE_DATABASE.find(
    (e) => e.name.toLowerCase() === name.trim().toLowerCase()
  );
  if (direct) return direct;

  const normalized = normalizeExerciseName(name);
  if (!normalized) return null;

  return (
    EXERCISE_DATABASE.find((e) => {
      const eNorm = normalizeExerciseName(e.name);
      return eNorm === normalized || eNorm.includes(normalized) || normalized.includes(eNorm);
    }) || null
  );
};

/**
 * Helper to check if an exercise belongs to a target category
 */
const matchesCategory = (ex, targetCat) => {
  if (!targetCat || targetCat === 'all' || targetCat === 'Other' || targetCat === 'Hybrid') {
    return true;
  }
  let normalized = targetCat;
  if (['Running', 'Cycling', 'HIIT'].includes(targetCat)) {
    normalized = 'Cardio';
  }
  const cats = Array.isArray(ex.category) ? ex.category : [ex.category];
  return cats.some((c) => c.toLowerCase() === normalized.toLowerCase());
};

/**
 * Filter exercises matching a specific category
 * For 'Other' / 'Hybrid' (Hybrid & Sports), returns all exercises!
 */
export const getExercisesByCategory = (category = 'Strength') => {
  if (category === 'Other' || category === 'Hybrid') {
    return EXERCISE_DATABASE;
  }
  return EXERCISE_DATABASE.filter((ex) => matchesCategory(ex, category));
};

/**
 * Search exercises across name, muscles, equipment, and category
 * Category-strict: if in Strength, only searches Strength; if in Hybrid/Other, searches all
 */
export const searchExercises = (query = '', category = null) => {
  const q = query.trim().toLowerCase();

  let list = EXERCISE_DATABASE;
  if (category && category !== 'Other' && category !== 'Hybrid') {
    list = EXERCISE_DATABASE.filter((ex) => matchesCategory(ex, category));
  }

  if (!q) {
    return list;
  }

  return list.filter(
    (ex) =>
      ex.name.toLowerCase().includes(q) ||
      ex.muscles.toLowerCase().includes(q) ||
      ex.equipment.toLowerCase().includes(q) ||
      ex.categoryLabel.toLowerCase().includes(q)
  );
};

/**
 * Canonical helper to retrieve the primary muscle group of an exercise.
 * If user set an explicit muscleGroup (e.g. from 1-tap pills), uses that.
 * Otherwise, checks preset database and extracts the FIRST tag.
 */
export const getPrimaryMuscleGroup = (ex) => {
  if (!ex) return null;
  const explicit = typeof ex === 'string' ? '' : (ex.muscleGroup || '').trim();
  if (explicit) return explicit;

  const exName = typeof ex === 'string' ? ex : (ex.name || '').trim();
  const preset = findPresetExercise(exName);
  if (preset && preset.muscles) {
    const firstTag = preset.muscles.split(',')[0].trim();
    const lower = firstTag.toLowerCase();
    if (lower.includes('chest') || lower.includes('pec')) return 'Chest';
    if (lower.includes('back') || lower.includes('lat') || lower.includes('row') || lower.includes('spine')) return 'Back';
    if (lower.includes('leg') || lower.includes('quad') || lower.includes('hamstring') || lower.includes('glute') || lower.includes('calf')) return 'Legs';
    if (lower.includes('shoulder') || lower.includes('deltoid')) return 'Shoulders';
    if (lower.includes('arm') || lower.includes('bicep') || lower.includes('tricep') || lower.includes('forearm')) return 'Arms';
    if (lower.includes('core') || lower.includes('ab') || lower.includes('plank')) return 'Core';
    if (lower.includes('full body')) return 'Full Body';
    return firstTag;
  }
  return null;
};

