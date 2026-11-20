/**
 * Curated list of 43 foundational exercises across 5 core disciplines:
 * - Strength (Gym & Weights - 21 exercises)
 * - Bodyweight (Calisthenics & Core - 7 exercises)
 * - Yoga (Asanas & Flexibility - 5 exercises)
 * - Cardio (Treadmill, Cycling & Conditioning - 5 exercises)
 * - Sports (Sports & Athletics - 5 exercises)
 * (Hybrid & Mixed Training draws seamlessly from all disciplines)
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
    photo: '/exercises/barbell-bench-press.jpg',
    gifUrl: '/exercises/barbell-bench-press.gif',
    tips: [
      "Maintain 5 points of contact: head, upper back, glutes on bench, and feet planted firmly.",
      "Tuck elbows at a 45°–70° angle relative to torso to protect the shoulder joints.",
      "Lower bar under control to mid-chest, then drive forcefully upward to lockout."
    ],
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
    photo: '/exercises/barbell-back-squat.jpg',
    gifUrl: '/exercises/barbell-back-squat.gif',
    tips: [
      "Brace core tightly with chest upright and feet placed shoulder-width apart.",
      "Initiate by breaking at hips and knees simultaneously; keep knees tracking over toes.",
      "Descend to at least parallel depth while keeping spine neutral, then drive through midfoot."
    ],
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
    photo: '/exercises/barbell-deadlift.jpg',
    gifUrl: '/exercises/barbell-deadlift.gif',
    tips: [
      "Stand with feet hip-width apart and bar over midfoot; grip just outside legs.",
      "Set hips down and back, engage lats, and pull slack out of the barbell before lifting.",
      "Drive the floor away with legs and lock out hips tall without hyperextending lower back."
    ],
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
    photo: '/exercises/overhead-shoulder-press.jpg',
    gifUrl: '/exercises/overhead-shoulder-press.gif',
    tips: [
      "Brace core and glutes firmly to prevent excessive backward arching in the lumbar spine.",
      "Press dumbbells straight overhead in a smooth vertical line, clearing your head.",
      "Lock out gently at the top with arms in line with ears, then lower under full control."
    ],
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
    photo: '/exercises/dumbbell-bicep-curl.jpg',
    gifUrl: '/exercises/dumbbell-bicep-curl.gif',
    tips: [
      "Pin elbows tightly to your sides throughout the entire range of motion.",
      "Supinate wrists as you curl upward, squeezing biceps hard for 1 second at the top.",
      "Lower dumbbells under a strict 2-3 second eccentric tempo; avoid swinging."
    ],
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
    photo: '/exercises/lat-pulldown.jpg',
    gifUrl: '/exercises/lat-pulldown.gif',
    tips: [
      "Grip slightly wider than shoulder-width with chest lifted and slight lean back (10°–15°).",
      "Initiate movement by depressing shoulder blades down and back before bending elbows.",
      "Pull bar smoothly to upper chest, squeezing lats without jerky torso swinging."
    ],
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
    photo: '/exercises/incline-dumbbell-press.jpg',
    gifUrl: '/exercises/incline-dumbbell-press.gif',
    tips: [
      "Set bench to 30°–45° incline; retract and pinch shoulder blades firmly into pad.",
      "Lower dumbbells with elbows tucked at 45° until a deep, comfortable chest stretch.",
      "Press up and slightly inward along an arc, focusing on upper pectoral contraction."
    ],
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
    photo: '/exercises/cable-chest-flyes.jpg',
    gifUrl: '/exercises/cable-chest-flyes.gif',
    tips: [
      "Set pulleys at chest or shoulder height and step forward into a staggered, stable stance.",
      "Maintain a fixed, soft bend in elbows throughout the entire fly movement.",
      "Bring handles together in a hugging motion, pausing to squeeze inner chest muscles."
    ],
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
    photo: '/exercises/barbell-bent-over-row.jpg',
    gifUrl: '/exercises/barbell-bent-over-row.gif',
    tips: [
      "Hinge at hips to approximately 45° with neutral spine and slight bend in knees.",
      "Pull bar toward lower abdomen/navel, driving elbows up toward the ceiling.",
      "Squeeze shoulder blades together at top, then lower bar under strict control."
    ],
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
    photo: '/exercises/seated-cable-row.jpg',
    gifUrl: '/exercises/seated-cable-row.gif',
    tips: [
      "Sit upright with knees slightly bent and feet secured against the footplates.",
      "Pull handle toward lower ribcage while driving elbows back and puffing chest forward.",
      "Avoid rocking torso excessively back and forth; isolate middle back and lats."
    ],
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
    photo: '/exercises/lateral-dumbbell-raise.jpg',
    gifUrl: '/exercises/lateral-dumbbell-raise.gif',
    tips: [
      "Lean torso forward very slightly with a soft, fixed bend in your elbows.",
      "Raise arms out to sides leading with elbows until parallel with the floor.",
      "Avoid shrugging traps or using hip momentum; lower slowly under constant tension."
    ],
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
    photo: '/exercises/triceps-rope-pushdown.jpg',
    gifUrl: '/exercises/triceps-rope-pushdown.gif',
    tips: [
      "Pin upper arms and elbows firmly against ribs; hinge forward slightly at hips.",
      "Push rope down smoothly by extending elbows, spreading ends apart at the bottom.",
      "Squeeze triceps for 1 second, then control cable return back to 90° elbow bend."
    ],
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
    photo: '/exercises/leg-press.jpg',
    gifUrl: '/exercises/leg-press.gif',
    tips: [
      "Place feet shoulder-width in center of sled; keep lower back and sacrum flat against pad.",
      "Lower weight until knees reach approximately 90° without lifting hips off the seat.",
      "Press sled back up through midfoot and heels, stopping just short of knee lockout."
    ],
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
    photo: '/exercises/romanian-deadlift.jpg',
    gifUrl: '/exercises/romanian-deadlift.gif',
    tips: [
      "Hold bar at hips with feet hip-width apart and knees soft with a slight fixed bend.",
      "Push hips straight back as if touching a wall behind you, sliding bar down thighs.",
      "Descend until you feel a deep hamstring stretch with a flat back, then drive hips forward."
    ],
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
    photo: '/exercises/lying-leg-curl.jpg',
    gifUrl: '/exercises/lying-leg-curl.gif',
    tips: [
      "Align knee joint directly with the machine pivot axis and set pad right above heels.",
      "Keep hips pressed firmly into bench; curl heels smoothly toward glutes.",
      "Pause for a peak contraction, then lower weight over 2-3 seconds to stretch hamstrings."
    ],
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
    photo: '/exercises/standing-calf-raise.jpg',
    gifUrl: '/exercises/standing-calf-raise.gif',
    tips: [
      "Place balls of feet securely on edge of block with balls of big toes engaged.",
      "Drive straight up onto your toes to maximum plantarflexion, squeezing calves at top.",
      "Lower slowly into a full heel stretch below block level without bouncing at the bottom."
    ],
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
    photo: '/exercises/conventional-deadlift.jpg',
    gifUrl: '/exercises/conventional-deadlift.gif',
    tips: [
      "Stand with feet under hips, bar cutting midfoot, and hands outside knees.",
      "Flatten back, pull chest up proud, and take tension before breaking the floor.",
      "Keep bar grazing shins and thighs in a straight vertical path until standing tall."
    ],
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
    photo: '/exercises/walking-lunges.jpg',
    gifUrl: '/exercises/walking-lunges.gif',
    tips: [
      "Step forward with a generous stride, lowering back knee toward floor under control.",
      "Keep front knee tracking over middle toes and torso tall with core braced.",
      "Push through front heel to rise smoothly into the next forward step."
    ],
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
    photo: '/exercises/incline-dumbbell-curl.jpg',
    gifUrl: '/exercises/incline-dumbbell-curl.gif',
    tips: [
      "Set bench to 45°–60° incline; let arms hang fully vertical for an enhanced bicep stretch.",
      "Curl weights up while keeping elbows pointing straight toward the floor.",
      "Emphasize long head contraction at the top before slowly lowering through full stretch."
    ],
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
    photo: '/exercises/barbell-bicep-curl.jpg',
    gifUrl: '/exercises/barbell-bicep-curl.gif',
    tips: [
      "Grip barbell shoulder-width with palms facing up and stand tall with braced core.",
      "Curl bar toward shoulders by flexing elbows, keeping upper arms fixed at your sides.",
      "Lower weight smoothly without arching lower back or throwing hips forward."
    ],
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
    photo: '/exercises/dumbbell-flyes.jpg',
    gifUrl: '/exercises/dumbbell-flyes.gif',
    tips: [
      "Lie flat with dumbbells extended above chest and maintain a fixed, slight elbow bend.",
      "Open arms in a wide arc until chest feels a comfortable, full horizontal stretch.",
      "Contract pectorals to bring dumbbells back up together along the same path."
    ],
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
    photo: '/exercises/overhead-barbell-press.jpg',
    gifUrl: '/exercises/overhead-barbell-press.gif',
    tips: [
      "Rest bar across front delts and collarbone with elbows slightly in front of bar.",
      "Squeeze glutes and tuck chin back as bar ascends vertically past your face.",
      "Push head back through window once bar clears forehead and lock out overhead."
    ],
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
    photo: '/exercises/standard-pushups.jpg',
    gifUrl: '/exercises/standard-pushups.gif',
    tips: [
      "Set hands slightly wider than shoulders with body forming a rigid plank from head to heels.",
      "Lower chest until 1-2 inches from floor with elbows angled back at 45°.",
      "Push the floor away firmly to full arm extension without sagging hips or hiking glutes."
    ],
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
    photo: '/exercises/pullups.jpg',
    gifUrl: '/exercises/pullups.gif',
    tips: [
      "Grip pull-up bar with an overhand grip slightly wider than shoulder-width.",
      "Engage scapulae first, then pull elbows down and back until chin clears the bar.",
      "Lower all the way down to a controlled, dead-hang stretch before initiating next rep."
    ],
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
    photo: '/exercises/parallel-bar-dips.jpg',
    gifUrl: '/exercises/parallel-bar-dips.gif',
    tips: [
      "Support bodyweight on bars with arms locked and shoulders depressed away from ears.",
      "Lean torso forward 15°–20° for chest emphasis and lower until upper arms are parallel to floor.",
      "Press forcefully back up to starting position, avoiding flaring elbows out wide."
    ],
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
    photo: '/exercises/bodyweight-squats.jpg',
    gifUrl: '/exercises/bodyweight-squats.gif',
    tips: [
      "Stand with feet shoulder-width apart, toes angled out slightly, and arms extended forward.",
      "Send hips back and down, keeping weight balanced over midfoot and chest elevated.",
      "Descend past 90° knee bend, then press through the floor to return to standing."
    ],
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
    photo: '/exercises/hanging-leg-raises.jpg',
    gifUrl: '/exercises/hanging-leg-raises.gif',
    tips: [
      "Hang from bar with active shoulders; avoid swinging or using swing momentum.",
      "Contract abs and hip flexors to raise legs smoothly up to hip height or higher.",
      "Lower legs under slow, deliberate control without arching lower back at the bottom."
    ],
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
    photo: '/exercises/forearm-plank.jpg',
    gifUrl: '/exercises/forearm-plank.gif',
    tips: [
      "Place elbows directly under shoulders with forearms parallel and palms flat or clasped.",
      "Squeeze glutes, tuck pelvis into a neutral hollow-body position, and brace core tightly.",
      "Breathe steadily and prevent lower back from sagging or hips from elevating."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="46" cy="34" r="4" fill="currentColor"/><line x1="42" y1="36" x2="16" y2="38" stroke-width="3.5"/><polyline points="16,38 14,46"/><polyline points="40,38 40,46 44,46"/></svg>`,
  },

  // ── 3. YOGA (Asanas & Flexibility) ───────────────────────────
  {
    id: 'surya-namaskar',
    name: 'Surya Namaskar',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Spine & Mobility, Full Body, Flexibility, Core',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 5,
    defaultReps: 1,
    defaultWeight: 0,
    unit: 'cycles',
    repsLabel: 'Cycles / Rounds',
    weightLabel: 'N/A',
    photo: '/exercises/surya-namaskar.jpg',
    gifUrl: '/exercises/surya-namaskar.gif',
    tips: [
      "Flow gracefully through the 12 classical positions, pairing every expansion with an inhale and fold with an exhale.",
      "Lengthen spine in upward salutes and fold deeply from hip creases in forward bends.",
      "Step back with steady alignment in equestrian pose, keeping hips open and gaze forward."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="14" r="4" fill="currentColor"/><line x1="32" y1="18" x2="32" y2="38" stroke-width="3"/><polyline points="32,38 28,48 26,56"/><polyline points="32,38 36,48 38,56"/><polyline points="32,22 26,16 32,8 38,16 32,22" stroke="#8b5cf6"/></svg>`,
  },
  {
    id: 'adho-mukha-svanasana',
    name: 'Downward Dog',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Flexibility, Spine & Mobility, Hamstrings, Shoulders',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 45,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    photo: '/exercises/adho-mukha-svanasana.jpg',
    gifUrl: '/exercises/adho-mukha-svanasana.gif',
    tips: [
      "Spread fingers wide, ground knuckle pads, and press chest gently toward thighs.",
      "Lift sit bones high toward ceiling, lengthening spine and creating inverted V shape.",
      "Gently guide heels toward the mat and relax neck, keeping gaze between feet."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="16" cy="46" r="4" fill="currentColor"/><polyline points="18,44 32,22 48,50" stroke-width="3.5"/><line x1="16" y1="46" x2="14" y2="52"/></svg>`,
  },
  {
    id: 'cat-cow-pose',
    name: 'Cat-Cow Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Spine, Lower Back, Core, Neck',
    equipment: 'Yoga Mat',
    mode: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Breath Cycles',
    weightLabel: 'N/A',
    photo: '/exercises/cat-cow-pose.jpg',
    gifUrl: '/exercises/cat-cow-pose.gif',
    tips: [
      "Begin on hands and knees with wrists stacked under shoulders and knees under hips.",
      "Inhale into Cow: drop belly toward mat, lift chest and tailbone, and gaze gently up.",
      "Exhale into Cat: press floor away, round spine toward ceiling, and tuck chin to chest."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M16 36 C24 42, 40 42, 48 36" stroke-width="3"/><circle cx="50" cy="30" r="4" fill="currentColor"/><line x1="20" y1="38" x2="18" y2="52" stroke-width="3"/><line x1="44" y1="38" x2="46" y2="52" stroke-width="3"/></svg>`,
  },
  {
    id: 'bhujangasana',
    name: 'Cobra Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Spine & Mobility, Chest, Back, Core',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    photo: '/exercises/bhujangasana.jpg',
    gifUrl: '/exercises/bhujangasana.gif',
    tips: [
      "Lie prone with tops of feet flat, legs together, and hands beneath shoulders.",
      "Anchor pubic bone into mat, roll shoulders back, and lift chest using back musculature.",
      "Keep elbows softly bent and tucked close to ribs; avoid crunching the lower back."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="48" cy="22" r="4" fill="currentColor"/><path d="M46,26 Q36,32 24,40 L12,46" stroke-width="3.5"/><polyline points="44,32 46,46"/><line x1="10" y1="48" x2="48" y2="48" stroke="currentColor" stroke-opacity="0.3"/></svg>`,
  },
  {
    id: 'balasana',
    name: 'Child\'s Pose',
    category: 'Yoga',
    categoryLabel: 'Yoga & Flexibility',
    muscles: 'Restoration & Recovery, Spine, Hips, Mobility',
    equipment: 'Yoga Mat',
    mode: 'hold',
    defaultSets: 2,
    defaultReps: 60,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Hold (Seconds)',
    weightLabel: 'N/A',
    photo: '/exercises/balasana.jpg',
    gifUrl: '/exercises/balasana.gif',
    tips: [
      "Kneel with big toes touching, widen knees comfortably, and sit hips back onto heels.",
      "Fold forward, extending arms along mat or resting them beside legs with forehead grounded.",
      "Breathe deeply into posterior ribcage, releasing tension in lower back and shoulders."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="40" r="4" fill="currentColor"/><path d="M22,42 Q30,34 38,42 L42,48" stroke-width="3.5"/><line x1="22" y1="44" x2="12" y2="46"/><line x1="10" y1="48" x2="52" y2="48" stroke="currentColor" stroke-opacity="0.3"/></svg>`,
  },

  // ── 4. CARDIO (Treadmill, Cycling & Conditioning) ────────────
  {
    id: 'treadmill',
    name: 'Treadmill',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs & Endurance, Cardiovascular, Calves, Quads',
    equipment: 'Treadmill',
    mode: 'cardio',
    defaultSets: 1,
    defaultReps: 25,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (Minutes)',
    weightLabel: 'N/A',
    photo: '/exercises/treadmill.jpg',
    gifUrl: '/exercises/treadmill.gif',
    tips: [
      "Maintain an upright athletic posture with shoulders relaxed and gaze forward.",
      "Land with midfoot strikes under your center of gravity rather than overstriding on heels.",
      "Pump arms forward and backward in rhythm, keeping hands relaxed and core lightly engaged."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="36" cy="16" r="4" fill="currentColor"/><line x1="34" y1="20" x2="30" y2="34" stroke-width="3"/><polyline points="30,34 22,38 18,52"/><polyline points="30,34 38,40 44,48"/><polyline points="32,24 24,28 20,34"/><polyline points="32,24 40,26 44,22"/><line x1="12" y1="54" x2="52" y2="54" stroke="#f59e0b" stroke-width="3"/></svg>`,
  },
  {
    id: 'cycling',
    name: 'Cycling',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs & Endurance, Quads, Hamstrings, Cardiovascular',
    equipment: 'Stationary Bike',
    mode: 'cardio',
    defaultSets: 1,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (Minutes)',
    weightLabel: 'N/A',
    photo: '/exercises/cycling.jpg',
    gifUrl: '/exercises/cycling.gif',
    tips: [
      "Adjust saddle height so knee has a slight 25°–35° bend at bottom of pedal stroke.",
      "Apply smooth, circular pedaling power through full 360° rotation rather than mashing down.",
      "Keep elbows soft, shoulders relaxed away from ears, and core stabilized in the saddle."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="44" r="8"/><circle cx="44" cy="44" r="8"/><polyline points="20,44 32,44 26,28 40,28 44,44"/><circle cx="34" cy="18" r="3.5" fill="currentColor"/><line x1="34" y1="22" x2="28" y2="32" stroke-width="3"/><polyline points="30,22 40,24"/></svg>`,
  },
  {
    id: 'full-body-burpees',
    name: 'Full Body Burpees',
    category: ['Cardio', 'Bodyweight'],
    categoryLabel: 'Cardio & Bodyweight',
    muscles: 'Full Body Conditioning, Cardiovascular, Quads, Chest',
    equipment: 'Floor / Bodyweight',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 0,
    unit: 'reps',
    repsLabel: 'Reps',
    weightLabel: 'N/A',
    photo: '/exercises/full-body-burpees.jpg',
    gifUrl: '/exercises/full-body-burpees.gif',
    tips: [
      "Drop into squat, plant hands flat, and jump feet back into a tight pushup plank.",
      "Perform clean chest-to-deck pushup, then snap feet forward just outside your hands.",
      "Explode vertically into a jump, reaching overhead and landing softly on midfoot."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="36" cy="14" r="4" fill="currentColor"/><line x1="36" y1="18" x2="28" y2="32" stroke-width="3"/><polyline points="28,32 18,36 14,48"/><polyline points="32,22 44,14"/></svg>`,
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'Cardio',
    categoryLabel: 'Cardio & Conditioning',
    muscles: 'Legs & Endurance, Calves, Footwork, Cardiovascular',
    equipment: 'Jump Rope',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 60,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Duration (Seconds)',
    weightLabel: 'N/A',
    photo: '/exercises/jump-rope.jpg',
    gifUrl: '/exercises/jump-rope.gif',
    tips: [
      "Rotate rope primarily with wrists and forearms; keep elbows tucked close to waist.",
      "Stay light on balls of feet, jumping only 1-2 inches off the ground on each turn.",
      "Maintain a steady breathing rhythm with knees softly cushioned upon every landing."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="16" r="4" fill="currentColor"/><line x1="32" y1="20" x2="32" y2="40" stroke-width="3"/><polyline points="32,40 28,52"/><polyline points="32,40 36,52"/><path d="M22,30 Q12,48 32,56 Q52,48 42,30" stroke="#f59e0b" stroke-width="2"/></svg>`,
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: ['Cardio', 'Bodyweight'],
    categoryLabel: 'Cardio & Bodyweight',
    muscles: 'Core & Stamina, Hip Flexors, Cardiovascular',
    equipment: 'Floor / Mat',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0,
    unit: 'sec',
    repsLabel: 'Duration (Seconds)',
    weightLabel: 'N/A',
    photo: '/exercises/mountain-climbers.jpg',
    gifUrl: '/exercises/mountain-climbers.gif',
    tips: [
      "Establish strong high plank position with shoulders stacked directly above wrists.",
      "Drive knees alternately toward chest in a running cadence without bouncing hips.",
      "Keep core braced and spine flat; avoid letting hips pike up or sag toward the floor."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="48" cy="30" r="4" fill="currentColor"/><polyline points="44,34 32,38 18,46"/><polyline points="32,38 30,30 24,34"/></svg>`,
  },

  // ── 5. SPORTS (Sports & Athletics) ─────────────────────────
  {
    id: 'badminton',
    name: 'Badminton',
    category: 'Sports',
    categoryLabel: 'Sports & Athletics',
    muscles: 'Legs & Speed, Shoulders & Power, Core & Agility',
    equipment: 'Racket & Shuttlecock',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 20,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (min)',
    weightLabel: 'N/A',
    photo: '/exercises/badminton.jpg',
    gifUrl: '/exercises/badminton.gif',
    tips: [
      "Adopt an agile ready stance with weight on balls of feet and racquet head held high.",
      "Turn sideways for overhead shots, using scissor kick footwork for explosive balance.",
      "Contact shuttlecock at the highest reachable point with forearm pronation and wrist snap."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="30" cy="18" r="4" fill="currentColor"/><line x1="30" y1="22" x2="26" y2="38" stroke-width="3.5"/><polyline points="26,38 18,48 14,56" stroke-width="3"/><polyline points="26,38 34,46 38,54" stroke-width="3"/><line x1="28" y1="26" x2="40" y2="18"/><line x1="40" y1="18" x2="48" y2="12" stroke="#6366f1" stroke-width="2.5"/><circle cx="52" cy="8" r="4" stroke="#6366f1" stroke-width="2"/><path d="M42 28 L46 32 M44 34 L48 30" stroke="#6366f1"/></svg>`,
  },
  {
    id: 'football',
    name: 'Football',
    category: 'Sports',
    categoryLabel: 'Sports & Athletics',
    muscles: 'Legs & Speed, Core & Agility, Stamina',
    equipment: 'Football & Pitch / Turf',
    mode: 'cardio',
    defaultSets: 2,
    defaultReps: 45,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (min)',
    weightLabel: 'N/A',
    photo: '/exercises/football.jpg',
    gifUrl: '/exercises/football.gif',
    tips: [
      "Plant non-kicking foot beside the ball pointing directly toward your target.",
      "Keep head down, eyes locked on the ball, and strike cleanly with the instep/laces.",
      "Follow through fully with striking leg toward target while maintaining upper body balance."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="16" r="4" fill="currentColor"/><line x1="28" y1="20" x2="32" y2="34" stroke-width="3.5"/><polyline points="32,34 22,42 18,54" stroke-width="3"/><polyline points="32,34 42,40 50,44" stroke-width="3.5"/><line x1="28" y1="24" x2="18" y2="30"/><circle cx="54" cy="46" r="5" fill="#6366f1"/><line x1="44" y1="52" x2="52" y2="52" stroke="#6366f1" stroke-dasharray="2 2"/></svg>`,
  },
  {
    id: 'cricket',
    name: 'Cricket',
    category: 'Sports',
    categoryLabel: 'Sports & Athletics',
    muscles: 'Full Body Conditioning, Shoulders & Power, Core, Legs',
    equipment: 'Cricket Bat, Ball & Pitch',
    mode: 'cardio',
    defaultSets: 1,
    defaultReps: 60,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Duration (min)',
    weightLabel: 'N/A',
    photo: '/exercises/cricket.jpg',
    gifUrl: '/exercises/cricket.gif',
    tips: [
      "Set up in a balanced batting stance with feet shoulder-width and head still over the ball.",
      "Watch ball closely out of bowler's hand; step into line with high leading elbow.",
      "Complete full follow-through with face of bat presenting squarely toward the target."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="16" r="4" fill="currentColor"/><line x1="28" y1="20" x2="34" y2="34" stroke-width="3.5"/><polyline points="34,34 42,44 48,54" stroke-width="3"/><polyline points="34,34 22,44 18,54" stroke-width="3"/><line x1="28" y1="24" x2="38" y2="34"/><line x1="38" y1="34" x2="48" y2="44" stroke="#6366f1" stroke-width="4"/><circle cx="54" cy="50" r="3" fill="#6366f1"/><line x1="12" y1="34" x2="12" y2="54" stroke="currentColor" stroke-width="2"/><line x1="15" y1="34" x2="15" y2="54" stroke="currentColor" stroke-width="2"/><line x1="18" y1="34" x2="18" y2="54" stroke="currentColor" stroke-width="2"/></svg>`,
  },
  {
    id: 'swimming-laps',
    name: 'Swimming Laps',
    category: 'Sports',
    categoryLabel: 'Sports & Athletics',
    muscles: 'Full Body Conditioning, Back & Stamina, Shoulders',
    equipment: 'Pool',
    mode: 'cardio',
    defaultSets: 4,
    defaultReps: 50,
    defaultWeight: 0,
    unit: 'm / laps',
    repsLabel: 'Laps / Meters',
    weightLabel: 'N/A',
    photo: '/exercises/swimming-laps.jpg',
    gifUrl: '/exercises/swimming-laps.gif',
    tips: [
      "Maintain long, horizontal body line in the water with head neutral and eyes looking down.",
      "Rotate torso from hips with each stroke, initiating kick from hip flexors rather than knees.",
      "Practice rhythmic bilateral breathing without lifting head excessively out of water."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="24" r="4" fill="currentColor"/><line x1="24" y1="26" x2="42" y2="30"/><line x1="42" y1="30" x2="52" y2="28"/><line x1="30" y1="28" x2="22" y2="36"/><path d="M12,42 Q20,38 28,42 T44,42 T60,42" stroke="#6366f1" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'boxing',
    name: 'Boxing',
    category: 'Sports',
    categoryLabel: 'Sports & Athletics',
    muscles: 'Shoulders & Power, Core & Agility, Arms, Back',
    equipment: 'Gloves & Heavy Bag',
    mode: 'cardio',
    defaultSets: 3,
    defaultReps: 3,
    defaultWeight: 0,
    unit: 'min',
    repsLabel: 'Round Duration (min)',
    weightLabel: 'N/A',
    photo: '/exercises/boxing.jpg',
    gifUrl: '/exercises/boxing.gif',
    tips: [
      "Keep chin tucked, hands protecting face, and elbows shielding ribs in a balanced stance.",
      "Generate punch power by pivoting back foot and rotating hips rather than arm-only movement.",
      "Snap punches out with speed and return fist immediately back to defensive guard."
    ],
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="26" cy="18" r="4" fill="currentColor"/><line x1="26" y1="22" x2="26" y2="38" stroke-width="3.5"/><polyline points="26,38 20,52"/><polyline points="26,38 32,52"/><polyline points="26,26 36,22 46,22" stroke-width="3"/><circle cx="48" cy="22" r="4" fill="#6366f1"/><circle cx="34" cy="30" r="3" fill="#6366f1"/></svg>`,
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
  if (!targetCat || targetCat === 'all') {
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
 * For 'Hybrid' (Hybrid & Mixed Training) or 'Other', draws from the full foundational library
 */
export const getExercisesByCategory = (category = 'Strength') => {
  if (category === 'Hybrid' || category === 'Other') {
    return EXERCISE_DATABASE;
  }
  return EXERCISE_DATABASE.filter((ex) => matchesCategory(ex, category));
};

/**
 * Search exercises across name, muscles, equipment, and category
 * Category-strict: if in Strength, searches Strength; if in Sports, searches Sports; if in Hybrid, searches all
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
 * Canonical helper to retrieve the primary muscle group / focus area of an exercise.
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
    return firstTag;
  }
  return null;
};

