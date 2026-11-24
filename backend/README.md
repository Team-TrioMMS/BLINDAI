# BlindGuide Backend API (Node.js + Express)

> **Course:** SE-331 Software Engineering Design Capstone Project  
> **Team:** Them Trio • Fall 2026  
> **Backend & Database Developer:** MD Muhaiminur Rahman Maruf (Student ID: 241-35-052)

---

## 📌 Overview

This is the central REST API backend for the **BlindGuide** (AI Vision Assistant) mobile application, developed using **Node.js**, **Express.js**, and **SQLite/SQL Database**.

It implements all server-side functional requirements specified in the Capstone Project Proposal:
- **FR-01 & FR-02:** User Registration, Login (JWT + bcrypt), and Profile Management
- **FR-04 to FR-08:** AI Computer Vision & OCR Gateway (`/api/ai/detect`, `/api/ai/ocr`, `/api/ai/scene-understanding`)
- **FR-11 & FR-12:** Real-time Hazard Safety Decision Analysis
- **FR-14:** Emergency Alert Broadcasting & Contact Dispatch
- **FR-15:** Safety Event History Logging & Audit Trail

---

## 🚀 How to Run the Backend

### 1. Open Terminal (CMD or PowerShell)
```cmd
cd C:\Users\Asus\.gemini\antigravity\scratch\BlindGuide\backend
```

### 2. Install Dependencies (if not already done)
```cmd
npm install
```

### 3. Start the Server
```cmd
npm start
```
Or for auto-reloading during development:
```cmd
npm run dev
```

The server will start at:
- **API URL:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`

---

## 📡 REST API Endpoints

### 🔐 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate and retrieve JWT token | No |
| `GET` | `/api/auth/profile` | Retrieve user profile & accessibility settings | Yes (`Bearer Token`) |
| `PUT` | `/api/auth/settings` | Update speech rate, sensitivity, voice toggles | Yes (`Bearer Token`) |

### 🚨 2. Emergency Services (`/api/emergency`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/emergency/contacts` | List user's emergency contacts | Yes |
| `POST` | `/api/emergency/contacts` | Add emergency contact (name, phone) | Yes |
| `DELETE` | `/api/emergency/contacts/:id` | Delete emergency contact | Yes |
| `POST` | `/api/emergency/alert` | Broadcast emergency alert + coordinates | Yes |

### 🧠 3. AI & Computer Vision (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/ai/detect` | AI object detection & proximity safety evaluation | Optional |
| `POST` | `/api/ai/ocr` | Text recognition on signs/notices | Optional |
| `POST` | `/api/ai/scene-understanding` | Contextual scene description | Optional |

### 📜 4. Safety Event History (`/api/events`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/events` | Fetch safety event audit log | Yes |
| `POST` | `/api/events` | Record hazard warning or navigation log | Yes |
| `DELETE` | `/api/events` | Clear user safety history | Yes |

---

## 🗄️ Database Architecture (`blindguide_server.db`)

- **`users` table:** `id`, `name`, `email`, `password` (hashed), accessibility preferences.
- **`emergency_contacts` table:** `id`, `user_id`, `name`, `phone`, `relationship`, `created_at`.
- **`safety_events` table:** `id`, `user_id`, `type`, `message`, `location`, `created_at`.

---

## 🔗 Connecting Frontend App to Backend

In the mobile app, set your local network IP (e.g., `http://192.168.x.x:5000`) in API client configs so your mobile device can communicate with this backend over local Wi-Fi.
