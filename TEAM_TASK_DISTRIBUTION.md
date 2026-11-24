# BlindGuide – Team Task Distribution & Code Mapping

> **Project:** BlindGuide (AI Vision Assistant for Blind and Visually Impaired People)  
> **Course:** SE-331 Software Engineering Design Capstone Project  
> **Team Name:** Them Trio • Batch: 42 • Section: A1 • Semester: Fall 2026  
> **Course Teacher:** Rahat Uddin Azad (Lecturer)

---

## 👥 Summary Team Overview

```
                      ┌───────────────────────────────────────────────┐
                      │                 BlindGuide                    │
                      │             Capstone Project                  │
                      └──────────────────────┬────────────────────────┘
                                             │
         ┌───────────────────────────────────┼───────────────────────────────────┐
         │                                   │                                   │
         ▼                                   ▼                                   ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│     Mahin Al Hasan      │     │  MD Muhaiminur Rahman   │     │   Farhana Jannat Saki   │
│  AI & Computer Vision   │     │   Backend & Database    │     │   Frontend & Hardware   │
│      (241-35-351)       │     │      (241-35-052)       │     │      (241-35-053)       │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

## 1. 🧠 Mahin Al Hasan
- **Student ID:** 241-35-351
- **Assigned Role:** AI & Computer Vision Developer
- **Primary Languages/Tools:** Python, OpenCV, YOLO, Distance/Proximity Estimation, NLP

### 📁 Assigned Code Files:
| File Path | Description |
|---|---|
| [`ai_service/yolo_detector.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/yolo_detector.py) | YOLO object detection pipeline & proximity estimation algorithm |
| [`ai_service/scene_analyzer.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/scene_analyzer.py) | Scene understanding & voice narration generator |
| [`ai_service/app.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/app.py) | Python AI service runner & test script |
| [`src/utils/mockDetection.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/utils/mockDetection.js) | Client-side computer vision inference simulator |
| [`backend/controllers/aiController.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/controllers/aiController.js) | AI REST API endpoints for detection & OCR |

### 🎯 Responsibilities Implemented:
- [x] **Dataset Preparation & Classes:** Defined critical hazards (`stairs`, `vehicles`, `doors`, `people`, `holes`).
- [x] **Object Detection:** Identifies obstacles and objects from camera image frames.
- [x] **Obstacle Detection:** Identifies which objects block the user's path.
- [x] **Proximity Estimation:** Classifies distance into **Near**, **Medium**, and **Far**.
- [x] **Scene Understanding:** Combines multiple detected items into environmental context.
- [x] **AI-Camera Integration:** Connects visual detection outputs with the mobile camera pipeline.

---

## 2. 🗄️ MD Muhaiminur Rahman Maruf
- **Student ID:** 241-35-052
- **Assigned Role:** Backend & Database Developer
- **Primary Languages/Tools:** Node.js, Express.js, REST API, SQLite/SQL, JWT, bcrypt

### 📁 Assigned Code Files:
| File Path | Description |
|---|---|
| [`backend/server.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/server.js) | Express HTTP server, middleware & route definitions |
| [`backend/config/db.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/config/db.js) | SQLite database schema (`users`, `contacts`, `events`) |
| [`backend/middleware/authMiddleware.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/middleware/authMiddleware.js) | JWT authentication guard & system security |
| [`backend/controllers/authController.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/controllers/authController.js) | User registration, login & profile handling |
| [`backend/controllers/emergencyController.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/controllers/emergencyController.js) | Emergency alert dispatch & SMS simulator |
| [`backend/controllers/eventController.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/controllers/eventController.js) | Safety history audit logging |
| [`backend/routes/`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/routes/) | Modular REST routes (`auth`, `emergency`, `ai`, `events`) |

### 🎯 Responsibilities Implemented:
- [x] **Backend API Development:** Full Express.js REST API with error handling and health checks.
- [x] **Database Design & Implementation:** SQLite schema with relational constraints and cascading deletes.
- [x] **Authentication & User Management:** Secure login and registration with password hashing (`bcrypt`) and JWT.
- [x] **AI Service/API Integration:** Exposing `/api/ai/detect` and `/api/ai/ocr` endpoints.
- [x] **OCR & Text-Processing Support:** Endpoint for reading signage and notices.
- [x] **Emergency Alert Integration:** Dispatching location payload to configured caregiver contacts.
- [x] **System Security:** Token protection, input validation, and password encryption.

---

## 3. 📱 Farhana Jannat Saki
- **Student ID:** 241-35-053
- **Assigned Role:** Frontend & Hardware Integration Developer
- **Primary Languages/Tools:** React Native, Expo, Android SDK, JavaScript, TTS, Haptics

### 📁 Assigned Code Files:
| File Path | Description |
|---|---|
| [`App.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/App.js) | Main app root, navigation container & bottom tab bar |
| [`src/screens/LoginScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/LoginScreen.js) | High-contrast accessible login & registration UI |
| [`src/screens/HomeScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/HomeScreen.js) | Dashboard with large action buttons & voice announcements |
| [`src/screens/CameraScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/CameraScreen.js) | Camera hardware integration with live bounding box overlays |
| [`src/screens/NavigationScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/NavigationScreen.js) | GPS navigation interface & prominent SOS alert button |
| [`src/screens/ProfileScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/ProfileScreen.js) | Accessibility settings (speech rate, pitch, haptics) |
| [`src/screens/HistoryScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/HistoryScreen.js) | Safety event log with tap-to-speak replay |
| [`src/utils/speech.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/utils/speech.js) | Text-to-Speech (`expo-speech`) and Haptic feedback (`expo-haptics`) |
| [`src/context/AppContext.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/context/AppContext.js) | Global app state management |

### 🎯 Responsibilities Implemented:
- [x] **Mobile Application Development:** Complete multi-screen React Native (Expo SDK 58) app.
- [x] **Accessible User Interface:** High contrast theme (`#1a1a2e`), oversized touch targets, accessibilityLabels for TalkBack/VoiceOver.
- [x] **Camera Interface Integration:** `expo-camera` CameraView with front/back toggle and overlay HUD.
- [x] **Voice Interaction:** Spoken announcements for every action and screen transition.
- [x] **Navigation Interface:** `expo-location` GPS coordinates and turn-by-turn guidance.
- [x] **Real-time Voice Alert Display:** Dynamic color-coded hazard badges (Green = Safe, Orange = Warning, Red = Danger).
- [x] **Emergency Interface:** Instant one-tap SOS button with vibration and visual confirmation.
- [x] **Final System Integration:** Binding camera, GPS, speech, database, and navigation into one cohesive workflow.
