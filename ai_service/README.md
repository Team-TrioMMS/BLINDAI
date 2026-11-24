# BlindGuide AI & Computer Vision Service

> **Assigned Developer:** Mahin Al Hasan (Student ID: 241-35-351)  
> **Role:** AI & Computer Vision Developer  
> **Technologies:** Python, OpenCV, YOLO, Distance/Proximity Estimation, Scene Understanding

---

## 📌 Responsibilities Breakdown:
1. **Dataset Preparation & AI Models:**
   - Object detection for blind user hazards (`stairs`, `vehicles`, `doors`, `people`, `holes`).
2. **Obstacle & Proximity Detection (`yolo_detector.py`):**
   - Classifies proximity into `near`, `medium`, and `far` using bounding box scale and y-intercept coordinates.
3. **Scene Understanding (`scene_analyzer.py`):**
   - Combines multiple detected bounding boxes into natural language sentences for voice output.
4. **AI-Camera Integration:**
   - Bridge camera frame data into real-time voice warnings.

---

## 🚀 How to Run Mahin's AI Module:
```bash
cd ai_service
python app.py
```
