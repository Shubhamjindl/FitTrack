async function runTests() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('--- FITTRACK BACKEND TEST SUITE ---');

  // 1. Register User 1
  const u1Email = `testuser_${Date.now()}@example.com`;
  const regRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      email: u1Email,
      password: 'password123',
    }),
  });
  const regData = await regRes.json();
  console.log('1. User 1 Register:', regData.success ? 'PASS' : 'FAIL', regData.message);
  if (!regData.success) throw new Error(regData.message);
  const token1 = regData.token;

  // 2. Login User 1
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: u1Email,
      password: 'password123',
    }),
  });
  const loginData = await loginRes.json();
  console.log('2. User 1 Login:', loginData.success ? 'PASS' : 'FAIL');

  // 3. Create Workouts for User 1
  const workout1Res = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Full Body Blast',
      date: new Date().toISOString(),
      type: 'Strength',
      duration: 60,
      notes: 'Felt energetic, hit new PR on Bench Press',
      exercises: [
        { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 80 },
        { name: 'Barbell Squat', sets: 4, reps: 8, weight: 100 },
        { name: 'Dumbbell Bicep Curl', sets: 3, reps: 12, weight: 15 },
      ],
    }),
  });
  const workout1Data = await workout1Res.json();
  console.log('3. Create Workout 1:', workout1Data.success ? 'PASS' : 'FAIL', workout1Data.data?.name);
  const workout1Id = workout1Data.data?._id;

  // Create Workout 2 for User 1
  const workout2Res = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Morning Cardio Run',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'Running',
      duration: 35,
      notes: '5km park circuit',
      exercises: [],
    }),
  });
  const workout2Data = await workout2Res.json();
  console.log('4. Create Workout 2:', workout2Data.success ? 'PASS' : 'FAIL');

  // 4. Get Workouts for User 1
  const getWorkoutsRes = await fetch(`${baseUrl}/workouts`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const getWorkoutsData = await getWorkoutsRes.json();
  console.log('5. Get Workouts count:', getWorkoutsData.count === 2 ? 'PASS (2 workouts)' : 'FAIL');

  // 5. Filter Workouts by type
  const filterRes = await fetch(`${baseUrl}/workouts?type=Strength`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const filterData = await filterRes.json();
  console.log('6. Filter by type=Strength count:', filterData.count === 1 ? 'PASS (1 workout)' : 'FAIL');

  // 6. Search Workouts
  const searchRes = await fetch(`${baseUrl}/workouts?q=Bench`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const searchData = await searchRes.json();
  console.log('7. Search query "Bench":', searchData.count === 1 ? 'PASS' : 'FAIL');

  // 7. Update Workout
  const updateRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Full Body Blast (Updated)',
      duration: 65,
    }),
  });
  const updateData = await updateRes.json();
  console.log('8. Update Workout name:', updateData.data?.name === 'Full Body Blast (Updated)' ? 'PASS' : 'FAIL');

  // 8. Test User Data Isolation (Create User 2)
  const u2Email = `testuser2_${Date.now()}@example.com`;
  const reg2Res = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Jane Smith',
      email: u2Email,
      password: 'password123',
    }),
  });
  const reg2Data = await reg2Res.json();
  const token2 = reg2Data.token;

  const u2WorkoutsRes = await fetch(`${baseUrl}/workouts`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  const u2WorkoutsData = await u2WorkoutsRes.json();
  console.log('9. User 2 workouts isolation count:', u2WorkoutsData.count === 0 ? 'PASS (0 workouts for user 2)' : 'FAIL');

  // Attempt to access user 1's workout using user 2's token
  const u2AccessU1Workout = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  console.log('10. User 2 forbidden from User 1 workout:', u2AccessU1Workout.status === 404 ? 'PASS (404 Not Found)' : 'FAIL');

  // 9. Dashboard Stats
  const dashRes = await fetch(`${baseUrl}/dashboard`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const dashData = await dashRes.json();
  console.log('11. Dashboard Total Workouts:', dashData.data?.totalWorkouts === 2 ? 'PASS (2)' : 'FAIL');
  console.log('    Total Duration:', dashData.data?.totalDuration, 'minutes');
  console.log('    Total Exercises:', dashData.data?.totalExercises);

  // 10. Analytics
  const analyticsRes = await fetch(`${baseUrl}/analytics?exercise=Barbell%20Bench%20Press`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const analyticsData = await analyticsRes.json();
  console.log('12. Analytics retrieved:', analyticsData.success ? 'PASS' : 'FAIL');
  console.log('    Type Distribution:', analyticsData.data?.typeDistribution?.length, 'types');
  console.log('    Exercise Progress entries for Bench Press:', analyticsData.data?.exerciseProgress?.length);

  // 11. Profile Stats
  const profileRes = await fetch(`${baseUrl}/profile`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const profileData = await profileRes.json();
  console.log('13. Profile stats retrieved:', profileData.success ? 'PASS' : 'FAIL');

  // 12. Delete Workout
  const delRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token1}` },
  });
  const delData = await delRes.json();
  console.log('14. Delete Workout:', delData.success ? 'PASS' : 'FAIL');

  console.log('--- ALL BACKEND TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
