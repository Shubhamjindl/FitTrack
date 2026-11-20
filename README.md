# 🏋️ UpToFit - Modern MERN Fitness & Workout Tracker

[![Live Deployment](https://img.shields.io/badge/Live%20Demo-uptofit.vercel.app-10b981?style=for-the-badge&logo=vercel)](https://uptofit.vercel.app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

**UpToFit** is a full-stack, responsive fitness and workout tracking web application built on the modern **MERN stack** (MongoDB, Express.js, React 19 + Vite 8, Node.js). Designed for serious lifters, runners, and athletes, it combines interactive workout logging, animated movement guides, progressive overload analytics via Recharts, multi-theme customization, and strict multi-tenant data isolation.

🌐 **Live Website:** [https://uptofit.vercel.app](https://uptofit.vercel.app)

---

## ✨ Key Platform Features

### 1. 🎯 Interactive 43-Movement Exercise Library & Posture Guide
* **5 Core Disciplines:** 43 curated exercises spanning **Strength & Weights**, **Bodyweight & Calisthenics**, **Yoga & Mobility**, **Cardio & Conditioning**, and **Athletic Sports** (Football, Cricket, Badminton, Swimming, Boxing).
* **Movement GIFs & Posture Snapshots:** Every preset movement features a high-framerate animated demonstration GIF and static posture snapshot.
* **Viewport-Centered Form Guide Modal:** Rendered via React Portal with a full-screen blurred backdrop, offering 3 dedicated, movement-specific coaching cues per exercise.
* **Smart Autocomplete & Custom Movements:** Type any custom exercise name on the fly; custom items include 1-tap muscle group tagging without false preset guides.

### 2. 📊 Advanced Progress Analytics (Powered by Recharts)
* **Progressive Overload Curve:** Select any logged exercise from a dynamic dropdown to visualize max weight progression over time.
* **Workout Frequency:** Monthly completed workout volume across the past 6 months (Bar Chart).
* **Session Duration Trends:** Chronological workout duration in minutes with smooth area gradients.
* **Category Distribution:** Proportional breakdown of training styles (Strength vs. Cardio vs. Yoga vs. Sports).
* **Milestone Highlights:** Total lifetime tonnage moved, average workout duration, heaviest PR, and top discipline.

### 3. 🛡️ Enterprise Security & Multi-Tenant Data Isolation
* **Zero Leak Guarantee:** All credentials, database URIs, and JWT secrets are strictly managed through environment variables and never exposed to the client or version control.
* **Strict Ownership Scoping:** All database queries enforce `user: req.user._id` verification—users cannot view, edit, or delete another athlete's data.
* **Salted Password Hashing:** User passwords securely hashed using `bcryptjs` with salt rounds before database persistence.
* **Demo Sandbox Protection:** One-click demo account (`alex.fit@example.com`) provides full read-only exploration with all mutation requests (`POST`, `PUT`, `DELETE`) blocked with `403 Forbidden`.

### 4. 🎨 Modern Athletic UI & Theme Engine
* **Responsive App Shell:** Persistent desktop sidebar, dynamic top navigation, and mobile-friendly bottom bar.
* **1-Tap Theme Switching:** Instant toggle between Emerald Dark and Light themes with persistent local storage sync.
* **Zero Bloat:** Handcrafted vector SVGs with no heavy icon libraries; native `fetch()` without Axios overhead.
* **Vercel Web Analytics:** Privacy-friendly, zero-cookie visitor analytics integrated with `@vercel/analytics`.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | React 19 + Vite 8 | Single Page Application with instant client transitions |
| **Routing** | React Router DOM 7 | Client-side protected and public routing |
| **Styling** | Bootstrap 5 + Custom CSS | CSS Variables, dark/light themes, smooth keyframe animations |
| **Visualizations** | Recharts 3 | Responsive interactive SVG charts with custom tooltips |
| **Analytics** | @vercel/analytics | Privacy-first Web Analytics tracking |
| **Backend Framework** | Node.js + Express 4 | Modular RESTful API architecture |
| **Database** | MongoDB Atlas + Mongoose 8 | Cloud document storage with indexed schemas and pre-save hooks |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs | Stateless bearer authentication with salted password hashes |

---

## 📁 Project Structure

```text
├── client/                             # Frontend React 19 + Vite 8 Application
│   ├── public/
│   │   ├── exercises/                  # 43 curated exercise GIFs and static snapshots
│   │   ├── favicon.svg                 # Brand dumbbell SVG icon
│   │   └── hero-exercise.jpg           # Athletic dashboard hero photo
│   ├── src/
│   │   ├── components/                 # Reusable UI components
│   │   │   ├── AppLayout.jsx           # App shell layout (Sidebar + Header + Content)
│   │   │   ├── BottomNav.jsx           # Mobile fixed navigation bar
│   │   │   ├── Icons.jsx               # Vector SVG icons
│   │   │   ├── ProfileSummitGraphic.jsx# Profile background graphic
│   │   │   ├── ProtectedRoute.jsx      # Auth verification route guard
│   │   │   ├── RecentWorkoutCard.jsx   # Interactive workout card
│   │   │   ├── Sidebar.jsx             # Left desktop sidebar
│   │   │   ├── StatCard.jsx            # Metric statistic card
│   │   │   ├── TopHeader.jsx           # Header with notifications & theme switch
│   │   │   └── WorkoutModal.jsx        # View workout details modal (React Portal)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx         # User authentication state & methods
│   │   │   └── ThemeContext.jsx        # Dark/light theme state & persistence
│   │   ├── data/
│   │   │   └── exercises.js            # 43-movement database with dedicated form tips
│   │   ├── pages/
│   │   │   ├── Analytics.jsx           # 4 Recharts progression visualizations
│   │   │   ├── Dashboard.jsx           # Overview metrics, activity chart & recent feeds
│   │   │   ├── Login.jsx               # Login screen with 1-click demo access
│   │   │   ├── NotFound.jsx            # 404 error handler
│   │   │   ├── Profile.jsx             # Profile management & lifetime totals
│   │   │   ├── Register.jsx            # User account registration
│   │   │   ├── WorkoutForm.jsx         # Log/Edit workout with posture guide modal
│   │   │   └── Workouts.jsx            # Workout history, search, filtering & sorting
│   │   ├── App.jsx                     # Root application router & Vercel Analytics
│   │   ├── index.css                   # Theme variables, layouts, and animations
│   │   └── main.jsx                    # React entrypoint
│   ├── package.json
│   └── vite.config.js                  # Vite configuration with /api backend proxy
│
├── server/                             # Backend Express REST API
│   ├── config/
│   │   └── db.js                       # Mongoose MongoDB Atlas connection
│   ├── controllers/
│   │   ├── analyticsController.js      # Progress curves & volume aggregations
│   │   ├── authController.js           # Register, login, profile, password update
│   │   ├── dashboardController.js      # Metrics & weekly session frequency
│   │   ├── profileController.js        # Lifetime statistics & favorite discipline
│   │   └── workoutController.js        # Workout CRUD, search, and category filters
│   ├── middleware/
│   │   └── auth.js                     # JWT authorization & demo user guard
│   ├── models/
│   │   ├── User.js                     # User model with bcrypt pre-save hashing
│   │   └── Workout.js                  # Workout model with exercise subdocuments
│   ├── postman/                        # Postman collection & generation script
│   ├── routes/                         # Express endpoint routers
│   ├── seed.js                         # Demo workout database seeder
│   ├── server.js                       # Express application entrypoint
│   ├── test-api.js                     # 25-step REST API audit suite (100% coverage)
│   └── test-demo-security.js           # Demo account security & permission suite
│
├── package.json                        # Root automation scripts
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Installation

Clone the repository and install dependencies for both the frontend and backend:

```bash
# Clone repository
git clone https://github.com/Shubhamjindl/UpToFit.git
cd UpToFit

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/uptofit?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

*(Optional) Create a `.env` file in `client/` if targeting an external backend URL:*
```env
VITE_API_URL=/api
```

### 3. Seed Realistic Demo Data (Optional)

Populate the database with sample workouts across Strength, Running, HIIT, and Yoga:

```bash
# From the root directory:
npm run seed
```

**Pre-seeded Demo Account:**
- **Email:** `alex.fit@example.com`
- **Password:** `password123`
*(A 1-click autofill button is available on the login page)*

### 4. Running Locally

Start the backend and frontend in separate terminals:

```bash
# Terminal 1: Start Express backend (runs on http://localhost:5000)
npm run server

# Terminal 2: Start Vite frontend (runs on http://localhost:5173)
npm run client
```

Navigate to **`http://localhost:5173`** in your browser.

---

## 📡 REST API Reference

All protected endpoints require `Authorization: Bearer <token>` in the HTTP headers.

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/api/health` | Public | System uptime & healthcheck |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/auth/me` | Private | Retrieve active session user profile |
| `PUT` | `/api/auth/profile` | Private | Update user display name |
| `PUT` | `/api/auth/password` | Private | Change password with current password verification |
| `GET` | `/api/workouts` | Private | Get workouts with search (`q`), `type`, date range, & sorting |
| `GET` | `/api/workouts/:id` | Private | Get single workout details |
| `POST` | `/api/workouts` | Private | Create new workout with multi-set exercises |
| `PUT` | `/api/workouts/:id` | Private | Update existing workout details |
| `DELETE`| `/api/workouts/:id` | Private | Delete workout and its exercise subdocuments |
| `GET` | `/api/dashboard` | Private | Aggregated stats, weekly chart data & recent sessions |
| `GET` | `/api/analytics` | Private | Frequency, duration trends, exercise progress curves & distribution |
| `GET` | `/api/profile` | Private | Lifetime totals, total volume (kg), and favorite discipline |

---

## 🧪 Automated Testing

UpToFit includes automated test suites covering functional endpoints, edge cases, multi-tenant data isolation, and permission boundaries.

```bash
# Run all tests (API integration + Security suite)
npm test

# Run the 25-step REST API audit suite
npm run test:api

# Run Demo user read-only permission tests
npm run test:security
```

### Test Coverage Highlights:
- ✅ **100% Endpoint Verification**: Tests all 14 REST endpoints.
- ✅ **Edge Case Validation**: Missing fields (400), invalid login (401), missing token (401), non-existent workout (404).
- ✅ **Multi-Tenant Isolation**: Confirms User B cannot access or alter User A's data (404).
- ✅ **Security Guardrails**: Asserts demo user cannot execute `POST`, `PUT`, or `DELETE` requests (403 Forbidden).

---

## 👤 Author

**Shubham Jindal** — B.E. Computer Science & Engineering, Chandigarh University.
- **GitHub:** [@Shubhamjindl](https://github.com/Shubhamjindl)
- **Live App:** [uptofit.vercel.app](https://uptofit.vercel.app)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
