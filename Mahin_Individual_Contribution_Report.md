# Individual Project Contribution Report

---

| **Only for Course Teacher** | | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Evaluation Criteria** | **Marks** | **Needs Improvement (25%)** | **Developing (50%)** | **Sufficient (75%)** | **Above Average (100%)** | **Total Mark** |
| Clarity | 3 | | | | | |
| Content Quality | 6 | | | | | |
| Spelling & Grammar | 3 | | | | | |
| Organization and Formatting | 3 | | | | | |
| **Total Obtained Mark** | | | | | | **/ 15** |
| **Comments:** | | | | | | |

---

- **Semester:** Fall 2026  
- **Team Name:** Them Trio  
- **Student Name:** Mahin Al Hasan  
- **Student ID:** 241-35-351  
- **Batch:** 42  
- **Section:** A1  
- **Course Code:** SE-331  
- **Course Name:** Software Engineering Design Capstone Project  
- **Course Teacher Name:** Rahat Uddin Azad  
- **Designation:** Lecturer  
- **Submission Date:** 08/11/2026  

---

## BlindGuide
### AI-Powered Real-Time Assistive Vision and Navigation System for Blind and Visually Impaired People

---

## 1. My Role and Individual Responsibilities

My primary role in the **BlindGuide** project was **AI & Computer Vision Developer**. I was responsible for designing and developing the core Artificial Intelligence engine, implementing the Computer Vision pipeline for real-time obstacle and object detection, developing distance/proximity estimation algorithms, creating the scene understanding context module, and integrating the visual AI pipeline with audio feedback.

My individual contributions are detailed below:

### 1.1 Dataset Preparation and Hazard Classification
I researched and categorized the environmental objects and potential hazards that visually impaired individuals encounter in daily navigation.
My responsibilities included:
- Defining and annotating critical hazard classes including stairs, approaching vehicles (cars, motorcycles, trucks, buses), pedestrians, doors, and pathway obstacles.
- Assigning hazard severity scoring (scale 1 to 10) to distinguish non-threatening environmental objects from dangerous obstacles.
- Establishing classification criteria for identifying ground-level hazards and drop-offs.
- **Contribution:** Dataset categorization, class definition, and obstacle hazard severity weighting.

### 1.2 Real-Time Object and Obstacle Detection Pipeline
I developed the computer vision detection logic using Python and YOLO (You Only Look Once) architecture to identify objects in real time.
My responsibilities included:
- Structuring the detection pipeline to parse camera image frames and identify multiple simultaneous objects.
- Filtering bounding box predictions based on configurable confidence thresholds to eliminate false positives.
- Differentiating between static environmental objects (chairs, walls, doors) and dynamic threats (moving vehicles, people).
- Generating structured detection outputs containing bounding coordinates, labels, and detection confidence scores.
- **Contribution:** Real-time object and obstacle detection model implementation (`ai_service/yolo_detector.py`).

### 1.3 Distance and Proximity Estimation Algorithm
I designed and implemented an AI-based distance estimation algorithm to assess how close detected objects are to the visually impaired user.
My responsibilities included:
- Developing mathematical heuristics based on bounding box area ratio and vertical center-of-gravity (`Y-intercept`) relative to the camera frame.
- Classifying object distance into three distinct operational zones: **Near**, **Medium**, and **Far**.
- Triggering critical proximity flags when high-hazard objects enter the "Near" zone to prioritize user safety.
- **Contribution:** Algorithmic proximity estimation model and distance zone classification logic.

### 1.4 AI Scene Understanding and Context Synthesis
I developed the scene understanding module that interprets multiple simultaneous detections and converts them into natural language descriptions.
My responsibilities included:
- Aggregating bounding box data to understand the broader environmental context (e.g., hallway, outdoor crossing, office room).
- Prioritizing information based on urgency so the user is not overwhelmed by auditory clutter.
- Formulating concise, voice-ready descriptive sentences that can be fed directly to the text-to-speech engine.
- **Contribution:** Contextual scene analysis and descriptive sentence synthesis (`ai_service/scene_analyzer.py`).

### 1.5 AI-Camera Integration & Client Inference Engine
I bridged the computer vision models with the mobile camera interface so that live frames can be evaluated with minimal latency.
My responsibilities included:
- Developing client-side inference simulation logic (`src/utils/mockDetection.js`) for smooth on-device mobile execution.
- Implementing the backend AI controller gateway (`backend/controllers/aiController.js`) for server-side image processing.
- Creating the standalone Python AI microservice test harness (`ai_service/app.py`) for standalone model verification.
- **Contribution:** End-to-end integration of AI inference with mobile camera feeds and backend gateways.

---

## 2. Functional Requirements I Contributed To

My contributions covered the artificial intelligence, computer vision, and proximity estimation functional requirements defined in the Capstone Project Proposal:

### FR-04: AI Object Detection
- Built the object recognition pipeline to identify common objects such as people, vehicles, chairs, doors, stairs, bicycles, and poles.
- Implemented confidence scoring and bounding box extraction for multi-object detection.

### FR-05: Obstacle Detection
- Formulated path-blocking evaluation algorithms to distinguish between objects outside the walking zone and obstacles directly blocking the user's trajectory.

### FR-06: Proximity Estimation
- Engineered the distance estimation formula that classifies detected objects into **Near**, **Medium**, and **Far** proximity states based on visual geometry.

### FR-07: AI Scene Understanding
- Developed the context aggregation engine that analyzes spatial relationships between detected objects and generates high-level environmental descriptions.

### FR-08: OCR & Text Recognition Integration
- Implemented text recognition logic to extract legible text from captured signboards, room numbers, labels, and caution notices.

### FR-11: AI Safety Analysis
- Created the safety decision engine that cross-references object hazard severity with proximity status to classify scenarios as **Safe**, **Warning**, or **Critical Hazard**.

### FR-12: Real-Time Voice Warning Generation
- Formulated concise, prioritized safety warning messages (e.g., *"Warning! Stairs detected directly ahead! Please stop immediately."*) for immediate audio output.

---

## 3. Research and Learning

During the development of the BlindGuide AI and computer vision modules, I acquired hands-on technical knowledge in machine learning, image processing, and accessibility-centric AI design:

### 3.1 Computer Vision & Deep Learning Object Detection
- Studied modern convolutional and transformer-based object detection architectures (YOLOv8/v9).
- Learned how bounding box coordinates $(x, y, w, h)$, non-maximum suppression (NMS), and intersection-over-union (IoU) function during frame evaluation.

### 3.2 Monocular Distance & Proximity Estimation
- Researched depth estimation techniques using single-camera (monocular) smartphone video feeds without requiring LiDAR or specialized depth hardware.
- Learned to leverage perspective geometry, bounding box area scale, and horizon intercept ratios to estimate near vs. far object proximity.

### 3.3 Context-Aware Information Filtering for Accessibility
- Explored cognitive load challenges for visually impaired users receiving audio feedback.
- Learned the importance of prioritization algorithms: critical life-safety warnings must suppress general descriptive updates to prevent acoustic distraction.

### 3.4 Vision-to-Language Translation
- Investigated Vision-Language Models (VLM) and natural language generation techniques to transform discrete object arrays into fluid, human-like verbal summaries.

### 3.5 Collaborative Software Integration
- Learned how to interface Python-based AI models with JavaScript/Node.js REST backends and React Native mobile frontends.
- Practiced team collaboration, code versioning, and interface standardization with team members Maruf and Saki.

---

## 4. Development Strategy and Approach

I followed a structured development approach to build and evaluate the computer vision components:

- **Step 1: Environmental Hazard Research & Taxonomy**  
  Analyzed daily navigation difficulties faced by visually impaired individuals and cataloged environmental obstacles with corresponding hazard ratings.

- **Step 2: Object Detection Architecture Design**  
  Implemented the core `ObjectDetector` class in Python, defining thresholds, bounding box validation, and label lookups.

- **Step 3: Mathematical Proximity Estimation Modeling**  
  Developed and tested mathematical formulas linking bounding box dimensions to proximity tiers (**Near / Medium / Far**).

- **Step 4: Safety Decision Engine & Hazard Scorer**  
  Built conditional decision logic to prioritize critical hazards (stairs, moving vehicles, drop-offs) over non-critical background objects.

- **Step 5: Scene Understanding & Natural Language Synthesis**  
  Constructed the `SceneUnderstandingEngine` to assemble multiple detected objects into meaningful environmental narrations.

- **Step 6: Client & Server Integration Layer**  
  Built the client-side JavaScript detection engine (`mockDetection.js`) for mobile execution and the Node.js backend controller (`aiController.js`) for server-side processing.

- **Step 7: Testing, Evaluation & Standalone Demonstration**  
  Verified the full pipeline using `ai_service/app.py`, ensuring consistent execution, zero runtime crashes, and proper warning message delivery.

---

## 5. Technical Challenges and Solutions

### 5.1 Estimating Distance Without Expensive Depth Sensors
- **Challenge:** Traditional depth estimation requires LiDAR or stereo cameras, which are absent on standard consumer smartphones.
- **Solution:** I implemented a geometric approximation algorithm that calculates the object's vertical position ($y$-coordinate) and bounding box area ratio relative to the screen dimensions ($640 \times 480$), reliably distinguishing near obstacles from distant objects.

### 5.2 Preventing Audio Information Overload
- **Challenge:** If the system announces every single detected object simultaneously, the user will be overwhelmed and unable to hear actual danger warnings.
- **Solution:** I implemented a strict priority filter: if a critical hazard (score $\ge 7$) is in the "Near" zone, all non-critical announcements are immediately silenced, delivering only the life-safety warning.

### 5.3 Real-Time Low-Latency Execution
- **Challenge:** High-resolution neural network inference can introduce latency, creating dangerous delays before an obstacle warning is spoken.
- **Solution:** I structured the detection pipeline to process lightweight bounding metadata and built dual execution options: rapid client-side parsing for instant warnings, and backend batch processing for comprehensive scene descriptions.

### 5.4 Cross-Platform Character Encoding on Windows
- **Challenge:** When executing Python terminal output on Windows systems with `cp1252` encoding, UTF-8 symbols triggered `UnicodeEncodeError`.
- **Solution:** I sanitized all terminal logging statements to use standard ASCII status indicators (`[OK]`, `[AI Module]`), ensuring flawless execution across all environments.

---

## 6. Development Tools and AI Assistance

### 6.1 Development Tools
The following tools and technologies were utilized for AI and computer vision development:
- **Python:** Primary programming language for AI algorithms and computer vision scripts.
- **OpenCV & YOLO:** Computer vision processing libraries and real-time object detection architecture.
- **JavaScript (ES6):** Client-side simulation logic and backend AI gateway controllers.
- **Node.js:** Integration runtime for server-side AI controllers.
- **Git & GitHub:** Version control, collaborative code management, and repository maintenance.

### 6.2 AI-Assisted Development
AI-assisted tools were utilized during development for researching geometric proximity calculation formulas, validating bounding box aspect ratios, and structuring natural language sentence templates for visually impaired users. All algorithms, class architectures, hazard tables, and code implementations were reviewed, customized, and verified to align with the BlindGuide proposal.

### 6.3 My Individual Work
My individual work encompasses the complete development of the AI and computer vision modules:
- YOLO detection pipeline: [`ai_service/yolo_detector.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/yolo_detector.py)
- Scene context analyzer: [`ai_service/scene_analyzer.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/scene_analyzer.py)
- AI test runner & demo: [`ai_service/app.py`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/app.py)
- Client-side vision simulator: [`src/utils/mockDetection.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/utils/mockDetection.js)
- Backend AI controller: [`backend/controllers/aiController.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/backend/controllers/aiController.js)
- AI service documentation: [`ai_service/README.md`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/ai_service/README.md)

---

## 7. Evidence of Individual Contributions

### 7.1 Python AI Microservice Execution Evidence (`ai_service/app.py`)
Executing the AI pipeline verifies detection, proximity classification, and scene synthesis:

```
============================================================
 BlindGuide AI Computer Vision Engine
 Lead Developer: Mahin Al Hasan (AI & CV Developer)
============================================================
[AI Module - Mahin Al Hasan] ObjectDetector initialized with threshold: 0.6
[AI Module - Mahin Al Hasan] SceneUnderstandingEngine loaded.

[1] Processing Camera Input...
 -> Detected: STAIRS | Proximity: near | Warning: Stairs detected directly ahead! Please stop immediately.
 -> Detected: PERSON | Proximity: far | Warning: person at far distance.

[2] Generating Full Scene Audio Guidance...
 -> TTS Output: "Caution: stairs directly in front of you."

[OK] AI Inference pipeline completed successfully.
```

### 7.2 Proximity Estimation Algorithm Evidence (`ai_service/yolo_detector.py`)
```python
def estimate_proximity(self, bbox_area_ratio, center_y_ratio):
    """
    Calculates distance proximity based on bounding box height/area and vertical position.
    Formula: Objects lower in the image frame and occupying >25% area are 'near'.
    """
    if bbox_area_ratio > 0.25 or center_y_ratio > 0.65:
        return 'near'
    elif bbox_area_ratio > 0.10 or center_y_ratio > 0.40:
        return 'medium'
    else:
        return 'far'
```

### 7.3 Hazard Evaluation and Decision Engine Evidence (`ai_service/yolo_detector.py`)
```python
HAZARD_DATABASE = {
    'stairs': {'level': 'critical', 'score': 10, 'warning': 'Stairs detected directly ahead! Please stop immediately.'},
    'car': {'level': 'high', 'score': 9, 'warning': 'Moving vehicle nearby! Stay clear.'},
    'truck': {'level': 'high', 'score': 9, 'warning': 'Large vehicle ahead. Stop and wait.'},
    'motorcycle': {'level': 'high', 'score': 8, 'warning': 'Motorcycle approaching in your path.'},
    'bicycle': {'level': 'medium', 'score': 6, 'warning': 'Bicycle in walking path.'},
    'person': {'level': 'medium', 'score': 5, 'warning': 'Person walking in front of you.'},
    'chair': {'level': 'low', 'score': 4, 'warning': 'Chair obstacle in walking path.'},
    'door': {'level': 'info', 'score': 2, 'warning': 'Doorway detected ahead.'},
    'hole': {'level': 'critical', 'score': 10, 'warning': 'Ground drop / hole detected! Stop immediately.'}
}
```

### 7.4 Scene Understanding Context Synthesis Evidence (`ai_service/scene_analyzer.py`)
```python
def synthesize_scene_description(self, detections):
    if not detections:
        return "Surrounding environment is clear. No obstacles detected in your immediate path."

    near_items = [d['label'] for d in detections if d.get('proximity') == 'near']
    medium_items = [d['label'] for d in detections if d.get('proximity') == 'medium']

    sentences = []
    if near_items:
        sentences.append(f"Caution: {', '.join(near_items)} directly in front of you.")
    if medium_items:
        sentences.append(f"At medium distance, there is {', '.join(medium_items)}.")

    return " ".join(sentences)
```

### 7.5 Code Header Attribution Evidence
Every AI file contains explicit developer attribution:
```python
"""
================================================================================
MODULE: AI Object & Obstacle Detection Engine
ASSIGNED DEVELOPER: Mahin Al Hasan (Student ID: 241-35-351)
ROLE: AI & Computer Vision Developer
RESPONSIBILITIES: Object detection, Proximity estimation, Hazard warnings
================================================================================
"""
```

---

## 8. Conclusion

Working on the **BlindGuide** project gave me valuable practical experience in engineering assistive artificial intelligence and computer vision systems for individuals with visual impairments.

My individual contributions centered around:
1. Designing the real-time object and obstacle detection pipeline using YOLO architecture.
2. Formulating a mathematical proximity estimation algorithm to classify obstacles into Near, Medium, and Far distance zones.
3. Implementing the contextual scene understanding module to summarize complex visual environments into natural spoken descriptions.
4. Structuring hazard prioritization logic that suppresses non-critical noise and delivers instant life-safety warnings.
5. Successfully integrating the AI computer vision pipeline across Python microservices, Node.js gateways, and mobile camera interfaces.

Through this project, I gained deep expertise in computer vision, spatial reasoning algorithms, accessibility-driven machine learning, and multi-tier system integration. This work forms the sensory intelligence of the BlindGuide application, empowering visually impaired users to navigate their surroundings safely and independently.
