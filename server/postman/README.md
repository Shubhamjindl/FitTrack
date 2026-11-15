# UpToFit API - Postman Collection Guide

This folder contains the complete, ready-to-import Postman Collection for the **UpToFit (FitTrack) MERN API**.

---

## 📁 File Included
- **`UpToFit.postman_collection.json`**: Official Postman Schema v2.1 Collection containing all 27 automated API test requests categorized into 3 folders.

---

## 🚀 How to Import into Postman (3 Steps)

1. Open **Postman** on your computer.
2. Click the **Import** button in the top-left corner.
3. Drag & drop (or browse to) `server/postman/UpToFit.postman_collection.json`.

That's it! The collection **`UpToFit API Collection`** will appear in your left sidebar.

---

## 📑 Collection Structure (3 Folders)

### 1. 📁 Core Endpoints & Features (Happy Path) - 16 Requests
- `01. Health Check (GET /api/health)`
- `02. Register User (POST /api/auth/register)` *(Auto-saves `{{token}}`)*
- `03. Login User (POST /api/auth/login)` *(Auto-saves `{{token}}`)*
- `04. Get Current User Profile (GET /api/auth/me)`
- `05. Update Profile Details (PUT /api/auth/profile)`
- `06. Create Workout - Strength (POST /api/workouts)` *(Auto-saves `{{workoutId}}`)*
- `07. Create Workout - Cardio/Running (POST /api/workouts)`
- `08. Get All Workouts (GET /api/workouts)`
- `09. Filter Workouts by Type (GET /api/workouts?type=Strength)`
- `10. Search Workouts (GET /api/workouts?q=Bench)`
- `11. Get Single Workout (GET /api/workouts/:id)`
- `12. Update Workout (PUT /api/workouts/:id)`
- `13. Get Dashboard Metrics (GET /api/dashboard)`
- `14. Get Progress Analytics (GET /api/analytics)`
- `15. Get All-Time Profile Stats (GET /api/profile)`
- `16. Delete Workout (DELETE /api/workouts/:id)`

### 2. 📁 Demo Account Security (Suite B) - 7 Requests
Ensures that the demo account (`alex.fit@example.com`) is **immutable and read-only**:
- `01. Login as Alex Morgan (POST /api/auth/login)` *(Auto-saves `{{demoToken}}`)*
- `02. Verify Demo Read Allowed (GET /api/workouts)` &rarr; `200 OK`
- `03. Block Create Workout (POST /api/workouts)` &rarr; `403 Forbidden`
- `04. Block Update Workout (PUT /api/workouts/:id)` &rarr; `403 Forbidden`
- `05. Block Delete Workout (DELETE /api/workouts/:id)` &rarr; `403 Forbidden`
- `06. Block Profile Edit (PUT /api/auth/profile)` &rarr; `403 Forbidden`
- `07. Block Password Change (PUT /api/auth/password)` &rarr; `403 Forbidden`

### 3. 📁 Multi-Tenant Data Isolation & Auth Checks - 4 Requests
Ensures database isolation between users and prevents unauthorized data leaks:
- `01. Reject Missing Token (GET /api/workouts)` &rarr; `401 Unauthorized`
- `02. Register User 2 (POST /api/auth/register)` *(Auto-saves `{{user2Token}}`)*
- `03. Verify User 2 Sees 0 Workouts (GET /api/workouts)` &rarr; `Count: 0`
- `04. Block User 2 from User 1's Workout ID (GET /api/workouts/:id)` &rarr; `404 Not Found`

---

## ⚡ How to Run All Tests at Once (Collection Runner)
1. In Postman, hover over **UpToFit API Collection** in the left sidebar.
2. Click the three dots `...` and select **Run collection** (or click the **Run** button).
3. Click the blue **Run UpToFit API Collection** button.
4. Postman will execute all 27 tests in sequence and display the green checklist:
   **`All Tests Passed (27/27)`**!
