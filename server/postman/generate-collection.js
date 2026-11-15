const fs = require('fs');
const path = require('path');

const collection = {
  info: {
    _postman_id: "c4f82810-91a1-42e1-88f1-uptofitmern",
    name: "UpToFit API Collection",
    description: "Complete, production-tested Postman API Collection for UpToFit (FitTrack) MERN stack fitness app.\n\nIncludes:\n1. Core Feature Endpoints (Happy Path)\n2. Suite B: Demo Account Security (403 Forbidden Locks)\n3. Multi-Tenant Data Isolation & Auth Checks",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000/api", type: "string" },
    { key: "token", value: "", type: "string" },
    { key: "demoToken", value: "", type: "string" },
    { key: "user2Token", value: "", type: "string" },
    { key: "workoutId", value: "", type: "string" }
  ],
  item: [
    // --- FOLDER 1: CORE ENDPOINTS ---
    {
      name: "1. Core Endpoints & Features (Happy Path)",
      description: "Happy path workflow: Registration, Authentication, Workouts CRUD, Dashboard, Analytics, and Profile.",
      item: [
        {
          name: "01. Health Check",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/health", host: ["{{baseUrl}}"], path: ["health"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('API is healthy and online', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.status).to.eql('ok');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "02. Register User (New Account)",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "John Doe",
                email: "johndoe_{{$timestamp}}@example.com",
                password: "password123"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/register", host: ["{{baseUrl}}"], path: ["auth", "register"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 201 Created or 200', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});",
                  "var json = pm.response.json();",
                  "if (json.token) {",
                  "    pm.collectionVariables.set('token', json.token);",
                  "    pm.test('Auth token saved to collection variable', function () {",
                  "        pm.expect(json.token).to.be.a('string');",
                  "    });",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "03. Login User",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "testuser@example.com",
                password: "password123"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/login", host: ["{{baseUrl}}"], path: ["auth", "login"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "var json = pm.response.json();",
                  "pm.test('JWT token returned', function () {",
                  "    pm.expect(json.token).to.be.a('string');",
                  "});",
                  "if (json.token) {",
                  "    pm.collectionVariables.set('token', json.token);",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "04. Get Current User Profile (/auth/me)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/auth/me", host: ["{{baseUrl}}"], path: ["auth", "me"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('User details returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.user).to.be.an('object');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "05. Update Profile Details",
          request: {
            method: "PUT",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{token}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "John Doe (FitTrack Pro)",
                bio: "Training 5x a week. Hypertrophy & Calisthenics.",
                targetWeight: 76,
                fitnessGoal: "Build Muscle"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/profile", host: ["{{baseUrl}}"], path: ["auth", "profile"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Profile updated successfully', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.success).to.be.true;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "06. Create Workout (Strength with Exercises)",
          request: {
            method: "POST",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{token}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Upper Body Hypertrophy Blast",
                type: "Strength",
                date: new Date().toISOString(),
                duration: 65,
                notes: "Felt strong today, hit a new Bench PR!",
                exercises: [
                  { name: "Barbell Bench Press", sets: 4, reps: 8, weight: 82.5 },
                  { name: "Barbell Back Squat", sets: 4, reps: 8, weight: 105 },
                  { name: "Overhead Shoulder Press", sets: 3, reps: 10, weight: 45 }
                ]
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 201 Created or 200', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});",
                  "var json = pm.response.json();",
                  "if (json.data && json.data._id) {",
                  "    pm.collectionVariables.set('workoutId', json.data._id);",
                  "    pm.test('Workout ID saved to collection variable', function () {",
                  "        pm.expect(json.data._id).to.be.a('string');",
                  "    });",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "07. Create Workout (Cardio / Running)",
          request: {
            method: "POST",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{token}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "5K Sunset Tempo Run",
                type: "Running",
                date: new Date(Date.now() - 86400000).toISOString(),
                duration: 32,
                notes: "Maintained 5:15/km pace throughout.",
                exercises: []
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 201 Created or 200', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "08. Get All Workouts (Paginated)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/workouts?page=1&limit=10", host: ["{{baseUrl}}"], path: ["workouts"], query: [{ key: "page", value: "1" }, { key: "limit", value: "10" }] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Workouts list returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.data).to.be.an('array');",
                  "    pm.expect(json.count).to.be.above(0);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "09. Filter Workouts by Type (?type=Strength)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/workouts?type=Strength", host: ["{{baseUrl}}"], path: ["workouts"], query: [{ key: "type", value: "Strength" }] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('All returned workouts have type Strength', function () {",
                  "    var json = pm.response.json();",
                  "    json.data.forEach(function(w) {",
                  "        pm.expect(w.type).to.eql('Strength');",
                  "    });",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "10. Search Workouts (?q=Bench)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/workouts?q=Bench", host: ["{{baseUrl}}"], path: ["workouts"], query: [{ key: "q", value: "Bench" }] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Search returns matching workouts', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.count).to.be.at.least(1);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "11. Get Single Workout By ID",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/workouts/{{workoutId}}", host: ["{{baseUrl}}"], path: ["workouts", "{{workoutId}}"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Workout details match ID', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.data._id).to.eql(pm.collectionVariables.get('workoutId'));",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "12. Update Workout Session",
          request: {
            method: "PUT",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{token}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Upper Body Hypertrophy Blast (Updated)",
                duration: 70
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/workouts/{{workoutId}}", host: ["{{baseUrl}}"], path: ["workouts", "{{workoutId}}"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Workout name updated', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.data.name).to.include('Updated');",
                  "    pm.expect(json.data.duration).to.eql(70);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "13. Get Dashboard Metrics (/dashboard)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/dashboard", host: ["{{baseUrl}}"], path: ["dashboard"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Dashboard stats returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.data.totalWorkouts).to.be.a('number');",
                  "    pm.expect(json.data.totalDuration).to.be.a('number');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "14. Get Progress Analytics (/analytics)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/analytics?exercise=Barbell%20Bench%20Press", host: ["{{baseUrl}}"], path: ["analytics"], query: [{ key: "exercise", value: "Barbell Bench Press" }] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Analytics charts and trends returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.data.frequency).to.be.an('array');",
                  "    pm.expect(json.data.typeDistribution).to.be.an('array');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "15. Get All-Time Profile Stats (/profile)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/profile", host: ["{{baseUrl}}"], path: ["profile"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Profile stats returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.stats.totalWorkouts).to.be.a('number');",
                  "    pm.expect(json.stats.totalDuration).to.be.a('number');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "16. Delete Workout Session",
          request: {
            method: "DELETE",
            header: [{ key: "Authorization", value: "Bearer {{token}}" }],
            url: { raw: "{{baseUrl}}/workouts/{{workoutId}}", host: ["{{baseUrl}}"], path: ["workouts", "{{workoutId}}"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Workout deleted successfully', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.success).to.be.true;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        }
      ]
    },

    // --- FOLDER 2: DEMO ACCOUNT SECURITY (SUITE B) ---
    {
      name: "2. Demo Account Security (Suite B - 403 Forbidden Locks)",
      description: "Suite B checks: Ensures Alex Morgan (demo user) cannot overwrite, tamper with, or delete any data.",
      item: [
        {
          name: "01. Login as Alex Morgan (Demo Account)",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "alex.fit@example.com",
                password: "password123"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/login", host: ["{{baseUrl}}"], path: ["auth", "login"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "var json = pm.response.json();",
                  "pm.test('User is identified as Demo account', function () {",
                  "    pm.expect(json.user.isDemo).to.be.true;",
                  "});",
                  "if (json.token) {",
                  "    pm.collectionVariables.set('demoToken', json.token);",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "02. Verify Demo Read Allowed (GET /workouts)",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{demoToken}}" }],
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK - Read is permitted for Demo', function () {",
                  "    pm.response.to.have.status(200);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "03. Block Create Workout as Demo (POST /workouts)",
          request: {
            method: "POST",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{demoToken}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Unauthorized Demo Workout",
                type: "Strength",
                duration: 30
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 403 Forbidden - Creation blocked', function () {",
                  "    pm.response.to.have.status(403);",
                  "});",
                  "pm.test('Error message mentions demo account read-only', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.success).to.be.false;",
                  "    pm.expect(json.message).to.include('read-only');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "04. Block Update Workout as Demo (PUT /workouts/:id)",
          request: {
            method: "PUT",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{demoToken}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Unauthorized Demo Edit",
                duration: 99
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/workouts/6ad9057a3060c3b35c5695ee", host: ["{{baseUrl}}"], path: ["workouts", "6ad9057a3060c3b35c5695ee"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 403 Forbidden - Update blocked', function () {",
                  "    pm.response.to.have.status(403);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "05. Block Delete Workout as Demo (DELETE /workouts/:id)",
          request: {
            method: "DELETE",
            header: [{ key: "Authorization", value: "Bearer {{demoToken}}" }],
            url: { raw: "{{baseUrl}}/workouts/6ad9057a3060c3b35c5695ee", host: ["{{baseUrl}}"], path: ["workouts", "6ad9057a3060c3b35c5695ee"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 403 Forbidden - Deletion blocked', function () {",
                  "    pm.response.to.have.status(403);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "06. Block Profile Edit as Demo (PUT /auth/profile)",
          request: {
            method: "PUT",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{demoToken}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Hacked Alex"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/profile", host: ["{{baseUrl}}"], path: ["auth", "profile"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 403 Forbidden - Profile modification blocked', function () {",
                  "    pm.response.to.have.status(403);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "07. Block Password Change as Demo (PUT /auth/password)",
          request: {
            method: "PUT",
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {{demoToken}}" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                currentPassword: "password123",
                newPassword: "hackedPassword123"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/password", host: ["{{baseUrl}}"], path: ["auth", "password"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 403 Forbidden - Password change blocked', function () {",
                  "    pm.response.to.have.status(403);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        }
      ]
    },

    // --- FOLDER 3: MULTI-TENANT DATA ISOLATION & AUTH CHECKS ---
    {
      name: "3. Multi-Tenant Data Isolation & Auth Checks",
      description: "Security checks: Verifies that unauthenticated requests are rejected and users cannot view or touch another user's data.",
      item: [
        {
          name: "01. Reject Missing Token (GET /workouts)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 401 Unauthorized - No token provided', function () {",
                  "    pm.response.to.have.status(401);",
                  "});",
                  "pm.test('Failure response returned', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.success).to.be.false;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "02. Register User 2 (Data Isolation)",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "User Two",
                email: "user2_{{$timestamp}}@example.com",
                password: "password123"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/register", host: ["{{baseUrl}}"], path: ["auth", "register"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 201 Created or 200', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});",
                  "var json = pm.response.json();",
                  "if (json.token) {",
                  "    pm.collectionVariables.set('user2Token', json.token);",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "03. Verify User 2 Sees 0 of User 1's Workouts",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{user2Token}}" }],
            url: { raw: "{{baseUrl}}/workouts", host: ["{{baseUrl}}"], path: ["workouts"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('User 2 has 0 workouts (isolated)', function () {",
                  "    var json = pm.response.json();",
                  "    pm.expect(json.count).to.eql(0);",
                  "    pm.expect(json.data.length).to.eql(0);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        },
        {
          name: "04. Block User 2 from Accessing User 1's Workout ID",
          request: {
            method: "GET",
            header: [{ key: "Authorization", value: "Bearer {{user2Token}}" }],
            url: { raw: "{{baseUrl}}/workouts/{{workoutId}}", host: ["{{baseUrl}}"], path: ["workouts", "{{workoutId}}"] }
          },
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status is 404 Not Found (Cross-tenant leak prevented)', function () {",
                  "    pm.response.to.have.status(404);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ]
        }
      ]
    }
  ]
};

const outputPath = path.join(__dirname, 'UpToFit.postman_collection.json');
fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2), 'utf8');
console.log(`[SUCCESS] Postman collection generated at: ${outputPath}`);
