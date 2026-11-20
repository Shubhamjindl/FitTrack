/**
 * UpToFit Comprehensive REST API Test Suite
 * 
 * Verifies all 14 API endpoints, multi-user data isolation, authentication,
 * and input validation edge cases against http://localhost:5000/api
 */

async function runTests() {
  const baseUrl = process.env.API_URL || 'http://localhost:5000/api';
  console.log('====================================================');
  console.log('       UPTOFIT REST API FULL AUDIT TEST SUITE       ');
  console.log(` Target: ${baseUrl}`);
  console.log('====================================================\n');

  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName, details = '') {
    totalCount++;
    if (condition) {
      passedCount++;
      console.log(`[PASS] ${totalCount}. ${testName}${details ? ` -> ${details}` : ''}`);
    } else {
      console.error(`[FAIL] ${totalCount}. ${testName}${details ? ` -> ${details}` : ''}`);
      throw new Error(`Test failed: ${testName} (${details})`);
    }
  }

  // 1. Healthcheck Endpoint
  console.log('--- 1. SYSTEM HEALTH CHECK ---');
  const healthRes = await fetch(`${baseUrl}/health`);
  const healthData = await healthRes.json();
  assert(
    healthRes.status === 200 && (healthData.status === 'ok' || healthData.status === 'OK'),
    'GET /api/health',
    healthData.app || 'API Healthy'
  );

  // 2. Authentication & Validation Endpoints
  console.log('\n--- 2. AUTHENTICATION & SECURITY ---');
  const u1Email = `testuser_${Date.now()}@example.com`;
  
  // 2a. Register User 1
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
  assert(regRes.status === 201 && regData.success && regData.token, 'POST /api/auth/register (New User)', `Created: ${regData.user?.email}`);
  let token1 = regData.token;

  // 2b. Negative Case: Duplicate Email Registration
  const dupRegRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Duplicate John',
      email: u1Email,
      password: 'password123',
    }),
  });
  const dupRegData = await dupRegRes.json();
  assert(dupRegRes.status === 400 && !dupRegData.success, 'POST /api/auth/register (Duplicate Email Prevention)', dupRegData.message);

  // 2c. Negative Case: Invalid Login Credentials
  const badLoginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: u1Email,
      password: 'wrongpassword',
    }),
  });
  const badLoginData = await badLoginRes.json();
  assert(badLoginRes.status === 401 && !badLoginData.success, 'POST /api/auth/login (Invalid Password Rejection)', badLoginData.message);

  // 2d. Positive Case: Valid Login
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: u1Email,
      password: 'password123',
    }),
  });
  const loginData = await loginRes.json();
  assert(loginRes.status === 200 && loginData.success && loginData.token, 'POST /api/auth/login (Valid Credentials)');
  token1 = loginData.token;

  // 2e. GET /api/auth/me (Authenticated profile check)
  const meRes = await fetch(`${baseUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const meData = await meRes.json();
  assert(meRes.status === 200 && meData.user?.email === u1Email.toLowerCase(), 'GET /api/auth/me (Session Profile)', `User: ${meData.user?.name}`);

  // 2f. Negative Case: Protected Endpoint without Token
  const unauthRes = await fetch(`${baseUrl}/auth/me`);
  assert(unauthRes.status === 401, 'Protected Route Token Enforcement (No Token)', 'Blocked with 401 Unauthorized');

  // 2g. PUT /api/auth/profile (Update Name)
  const updateProfileRes = await fetch(`${baseUrl}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({ name: 'John Doe Updated' }),
  });
  const updateProfileData = await updateProfileRes.json();
  assert(updateProfileRes.status === 200 && updateProfileData.user?.name === 'John Doe Updated', 'PUT /api/auth/profile (Update Display Name)', updateProfileData.message);

  // 2h. PUT /api/auth/password (Change Password)
  const changePwRes = await fetch(`${baseUrl}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      currentPassword: 'password123',
      newPassword: 'newpassword456',
    }),
  });
  const changePwData = await changePwRes.json();
  assert(changePwRes.status === 200 && changePwData.success, 'PUT /api/auth/password (Change Password)', changePwData.message);

  // Verify login with new password
  const newLoginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: u1Email,
      password: 'newpassword456',
    }),
  });
  const newLoginData = await newLoginRes.json();
  assert(newLoginRes.status === 200 && newLoginData.token, 'Verify Login with Updated Password');
  token1 = newLoginData.token;

  // 3. Workouts CRUD Operations
  console.log('\n--- 3. WORKOUTS CRUD & ADVANCED SEARCH ---');

  // 3a. Negative Case: POST /workouts with Missing Required Name
  const invalidWorkoutRes = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      date: new Date().toISOString(),
      duration: 30,
    }),
  });
  assert(invalidWorkoutRes.status === 400, 'POST /api/workouts (Validation: Missing Workout Name)', 'Rejected with 400');

  // 3b. POST /workouts - Create Workout 1 (Strength with multi-set exercises)
  const workout1Res = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Full Body Heavy Blast',
      date: new Date().toISOString(),
      type: 'Strength',
      duration: 60,
      notes: 'Felt energetic, hit new PR on Bench Press',
      exercises: [
        { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 80 },
        { name: 'Barbell Back Squat', sets: 4, reps: 8, weight: 100 },
        { name: 'Dumbbell Bicep Curl', sets: 3, reps: 12, weight: 15 },
      ],
    }),
  });
  const workout1Data = await workout1Res.json();
  assert(workout1Res.status === 201 && workout1Data.data?._id, 'POST /api/workouts (Create Strength Workout)', workout1Data.data?.name);
  const workout1Id = workout1Data.data._id;

  // 3c. POST /workouts - Create Workout 2 (Running Cardio)
  const workout2Res = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Morning Forest Trail Run',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'Running',
      duration: 35,
      notes: '5km park circuit under sunny skies',
      exercises: [],
    }),
  });
  const workout2Data = await workout2Res.json();
  assert(workout2Res.status === 201 && workout2Data.data?._id, 'POST /api/workouts (Create Cardio Run)', workout2Data.data?.name);

  // 3d. GET /api/workouts (List all workouts)
  const listWorkoutsRes = await fetch(`${baseUrl}/workouts`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const listWorkoutsData = await listWorkoutsRes.json();
  assert(listWorkoutsRes.status === 200 && listWorkoutsData.count === 2, 'GET /api/workouts (List Workouts)', `Found: ${listWorkoutsData.count} workouts`);

  // 3e. GET /api/workouts/:id (Direct Single Workout Retrieval)
  const getSingleRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const getSingleData = await getSingleRes.json();
  assert(getSingleRes.status === 200 && getSingleData.data?.name === 'Full Body Heavy Blast', 'GET /api/workouts/:id (Retrieve Single Workout)', getSingleData.data?.name);

  // 3f. GET /api/workouts?type=Strength (Category filter)
  const filterRes = await fetch(`${baseUrl}/workouts?type=Strength`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const filterData = await filterRes.json();
  assert(filterRes.status === 200 && filterData.count === 1, 'GET /api/workouts?type=Strength (Filter by Type)', `Strength count: ${filterData.count}`);

  // 3g. GET /api/workouts?q=Bench (Search keyword filter)
  const searchRes = await fetch(`${baseUrl}/workouts?q=Bench`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const searchData = await searchRes.json();
  assert(searchRes.status === 200 && searchData.count === 1, 'GET /api/workouts?q=Bench (Full Text Search)', `Match found: "${searchData.data?.[0]?.name}"`);

  // 3h. PUT /api/workouts/:id (Update workout)
  const updateRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      name: 'Full Body Heavy Blast (Updated)',
      duration: 65,
    }),
  });
  const updateData = await updateRes.json();
  assert(updateRes.status === 200 && updateData.data?.name === 'Full Body Heavy Blast (Updated)' && updateData.data?.duration === 65, 'PUT /api/workouts/:id (Update Workout)');

  // 4. Multi-Tenant User Isolation
  console.log('\n--- 4. MULTI-TENANT USER ISOLATION ---');
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

  // User 2 workouts list should be empty
  const u2WorkoutsRes = await fetch(`${baseUrl}/workouts`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  const u2WorkoutsData = await u2WorkoutsRes.json();
  assert(u2WorkoutsData.count === 0, 'User 2 Workout Isolation (Isolated count = 0)');

  // User 2 attempting to access User 1's workout
  const u2AccessU1Res = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  assert(u2AccessU1Res.status === 404, 'User 2 Forbidden from User 1 Workout (404 Isolation)');

  // 5. Dashboard, Analytics & Profile Endpoints
  console.log('\n--- 5. DASHBOARD, ANALYTICS & PROFILE METRICS ---');

  // 5a. GET /api/dashboard
  const dashRes = await fetch(`${baseUrl}/dashboard`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const dashData = await dashRes.json();
  assert(dashRes.status === 200 && dashData.data?.totalWorkouts === 2, 'GET /api/dashboard (Summary Dashboard)', `Workouts: ${dashData.data?.totalWorkouts}, Time: ${dashData.data?.totalDuration}m, Exercises: ${dashData.data?.totalExercises}`);

  // 5b. GET /api/analytics
  const analyticsRes = await fetch(`${baseUrl}/analytics?exercise=Barbell%20Bench%20Press`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const analyticsData = await analyticsRes.json();
  assert(analyticsRes.status === 200 && analyticsData.data?.typeDistribution?.length >= 2, 'GET /api/analytics (Type Distribution & Exercise Tracking)', `${analyticsData.data?.typeDistribution?.length} categories`);

  // 5c. GET /api/profile
  const profileRes = await fetch(`${baseUrl}/profile`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const profileData = await profileRes.json();
  assert(
    profileRes.status === 200 && profileData.user?.email === u1Email.toLowerCase(),
    'GET /api/profile (Account Lifetime Stats)',
    `Favorite: ${profileData.stats?.favoriteType || 'N/A'}`
  );

  // 6. Delete & Cleanup Verification
  console.log('\n--- 6. DELETE & RECORD CLEANUP ---');
  const delRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token1}` },
  });
  const delData = await delRes.json();
  assert(delRes.status === 200 && delData.success, 'DELETE /api/workouts/:id (Delete Workout)', delData.message);

  // Verify workout is permanently gone
  const verifyDelRes = await fetch(`${baseUrl}/workouts/${workout1Id}`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  assert(verifyDelRes.status === 404, 'Verify Workout Deleted (Subsequent GET returns 404)');

  console.log('\n====================================================');
  console.log(`🎉 ALL ${passedCount} API TESTS PASSED SUCCESSFULLY! (100% COVERAGE)`);
  console.log('====================================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test execution failed:', err);
  process.exit(1);
});
