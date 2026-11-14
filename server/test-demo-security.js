const baseUrl = 'http://localhost:5000/api';

async function testDemoSecurity() {
  console.log('=== RUNNING UPTOFIT DEMO ACCOUNT SECURITY TESTS ===\n');

  // 1. Log in as Alex Morgan
  console.log('1. Logging in as Alex Morgan (alex.fit@example.com)...');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alex.fit@example.com',
      password: 'password123',
    }),
  });

  const loginData = await loginRes.json();
  if (!loginRes.ok) {
    throw new Error(`Demo login failed: ${loginData.message}`);
  }
  console.log('   Status:', loginRes.status, '| Success:', loginData.success);
  console.log('   User name:', loginData.user?.name);
  console.log('   isDemo flag returned:', loginData.user?.isDemo);
  if (loginData.user?.isDemo !== true) {
    throw new Error('FAIL: isDemo flag was not true for demo user');
  }
  console.log('   [PASS] Demo user logged in and identified as isDemo: true\n');

  const demoToken = loginData.token;

  // 2. Test /api/auth/me
  console.log('2. Testing GET /api/auth/me for demo user...');
  const meRes = await fetch(`${baseUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${demoToken}` },
  });
  const meData = await meRes.json();
  console.log('   Status:', meRes.status, '| isDemo:', meData.user?.isDemo);
  if (meData.user?.isDemo !== true) {
    throw new Error('FAIL: isDemo flag was not true on /auth/me');
  }
  console.log('   [PASS] GET /auth/me correctly returns isDemo: true\n');

  // 3. Test Read Operations (GET /workouts, GET /dashboard)
  console.log('3. Testing Read Operations (Must SUCCEED for demo user)...');
  const workoutsRes = await fetch(`${baseUrl}/workouts`, {
    headers: { Authorization: `Bearer ${demoToken}` },
  });
  const workoutsData = await workoutsRes.json();
  console.log('   GET /workouts status:', workoutsRes.status, '| Count:', workoutsData.count);
  if (workoutsRes.status !== 200) {
    throw new Error('FAIL: Demo user should be able to read workouts');
  }

  const firstWorkoutId = workoutsData.data?.[0]?._id;
  console.log('   First workout id:', firstWorkoutId);

  const dashRes = await fetch(`${baseUrl}/dashboard`, {
    headers: { Authorization: `Bearer ${demoToken}` },
  });
  console.log('   GET /dashboard status:', dashRes.status);
  if (dashRes.status !== 200) {
    throw new Error('FAIL: Demo user should be able to view dashboard');
  }
  console.log('   [PASS] Read operations allowed for demo user\n');

  // 4. Test Mutations on Workouts (Must be BLOCKED with 403)
  console.log('4. Testing Mutation Blocking on Workouts...');

  // 4a. POST /workouts
  console.log('   4a. Attempting POST /workouts as demo user...');
  const postRes = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${demoToken}`,
    },
    body: JSON.stringify({
      name: 'Unauthorized Hack Workout',
      date: new Date().toISOString(),
      type: 'Strength',
      duration: 30,
      notes: 'Should fail',
      exercises: [],
    }),
  });
  const postData = await postRes.json();
  console.log('       Status:', postRes.status, '| Message:', postData.message);
  if (postRes.status !== 403 || postData.success !== false) {
    throw new Error(`FAIL: Expected 403 Forbidden on create workout, got ${postRes.status}`);
  }
  console.log('       [PASS] Workout creation blocked with 403 Forbidden');

  // 4b. PUT /workouts/:id
  if (firstWorkoutId) {
    console.log(`   4b. Attempting PUT /workouts/${firstWorkoutId} as demo user...`);
    const putRes = await fetch(`${baseUrl}/workouts/${firstWorkoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${demoToken}`,
      },
      body: JSON.stringify({
        name: 'Hacked Title',
      }),
    });
    const putData = await putRes.json();
    console.log('       Status:', putRes.status, '| Message:', putData.message);
    if (putRes.status !== 403 || putData.success !== false) {
      throw new Error(`FAIL: Expected 403 Forbidden on update workout, got ${putRes.status}`);
    }
    console.log('       [PASS] Workout update blocked with 403 Forbidden');

    // 4c. DELETE /workouts/:id
    console.log(`   4c. Attempting DELETE /workouts/${firstWorkoutId} as demo user...`);
    const delRes = await fetch(`${baseUrl}/workouts/${firstWorkoutId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const delData = await delRes.json();
    console.log('       Status:', delRes.status, '| Message:', delData.message);
    if (delRes.status !== 403 || delData.success !== false) {
      throw new Error(`FAIL: Expected 403 Forbidden on delete workout, got ${delRes.status}`);
    }
    console.log('       [PASS] Workout deletion blocked with 403 Forbidden');
  }

  // 5. Test Profile & Password Mutations (Must be BLOCKED with 403)
  console.log('\n5. Testing Mutation Blocking on Profile & Password...');

  // 5a. PUT /auth/profile
  console.log('   5a. Attempting PUT /auth/profile as demo user...');
  const profileRes = await fetch(`${baseUrl}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${demoToken}`,
    },
    body: JSON.stringify({ name: 'Hacked Alex' }),
  });
  const profileData = await profileRes.json();
  console.log('       Status:', profileRes.status, '| Message:', profileData.message);
  if (profileRes.status !== 403 || profileData.success !== false) {
    throw new Error(`FAIL: Expected 403 Forbidden on update profile, got ${profileRes.status}`);
  }
  console.log('       [PASS] Profile name update blocked with 403 Forbidden');

  // 5b. PUT /auth/password
  console.log('   5b. Attempting PUT /auth/password as demo user...');
  const passRes = await fetch(`${baseUrl}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${demoToken}`,
    },
    body: JSON.stringify({
      currentPassword: 'password123',
      newPassword: 'newpassword999',
    }),
  });
  const passData = await passRes.json();
  console.log('       Status:', passRes.status, '| Message:', passData.message);
  if (passRes.status !== 403 || passData.success !== false) {
    throw new Error(`FAIL: Expected 403 Forbidden on change password, got ${passRes.status}`);
  }
  console.log('       [PASS] Password change blocked with 403 Forbidden');

  // 6. Test Regular User Flow (Must NOT be blocked)
  console.log('\n6. Testing Regular User Flow (Must NOT be blocked)...');
  const regularEmail = `reguser_${Date.now()}@test.com`;
  const regUserRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Regular Athlete',
      email: regularEmail,
      password: 'password123',
    }),
  });
  const regUserData = await regUserRes.json();
  console.log('   Registered regular user:', regularEmail, '| isDemo:', regUserData.user?.isDemo);
  if (regUserData.user?.isDemo === true) {
    throw new Error('FAIL: Regular user should have isDemo: false');
  }

  const regToken = regUserData.token;

  // Regular user creates a workout
  const regWorkoutRes = await fetch(`${baseUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${regToken}`,
    },
    body: JSON.stringify({
      name: 'Regular Chest Day',
      date: new Date().toISOString(),
      type: 'Strength',
      duration: 50,
      notes: 'Smooth workout',
      exercises: [{ name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 28 }],
    }),
  });
  const regWorkoutData = await regWorkoutRes.json();
  console.log('   Regular user workout creation status:', regWorkoutRes.status, '| Success:', regWorkoutData.success);
  if (regWorkoutRes.status !== 201) {
    throw new Error('FAIL: Regular user workout creation should succeed with 201');
  }
  const regWorkoutId = regWorkoutData.data._id;

  // Regular user updates the workout
  const regUpdateRes = await fetch(`${baseUrl}/workouts/${regWorkoutId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${regToken}`,
    },
    body: JSON.stringify({ name: 'Regular Chest Day (Completed)' }),
  });
  console.log('   Regular user workout update status:', regUpdateRes.status);
  if (regUpdateRes.status !== 200) {
    throw new Error('FAIL: Regular user workout update should succeed with 200');
  }

  // Regular user deletes the workout
  const regDelRes = await fetch(`${baseUrl}/workouts/${regWorkoutId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${regToken}` },
  });
  console.log('   Regular user workout delete status:', regDelRes.status);
  if (regDelRes.status !== 200) {
    throw new Error('FAIL: Regular user workout delete should succeed with 200');
  }
  console.log('   [PASS] Regular user write operations work flawlessly');

  console.log('\n======================================================');
  console.log('🎉 ALL SECURITY & FUNCTIONALITY TESTS PASSED 100%!');
  console.log('======================================================\n');
}

testDemoSecurity().catch((err) => {
  console.error('\n❌ TEST FAILED:', err.message);
  process.exit(1);
});
