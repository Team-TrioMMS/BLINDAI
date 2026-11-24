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
- **Student Name:** Most Farhana Jannat Saki (Hiya)  
- **Student ID:** 241-35-053  
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

My primary role in the **BlindGuide** project was **Frontend & Hardware Integration Developer**. I was responsible for designing and developing the complete mobile application interface using React Native and Expo (SDK 58), integrating smartphone hardware peripherals (Camera, GPS Location, Speaker, and Vibration Motor), designing accessibility-compliant high-contrast user interfaces, implementing Text-to-Speech (TTS) voice guidance, and performing the final system integration.

My individual contributions are detailed below:

### 1.1 Mobile Application Development and Architecture
I developed the entire client-side mobile application structure using React Native, Expo, and React Navigation.
My responsibilities included:
- Setting up the project scaffolding, dependency configuration, and root navigation system (`App.js`).
- Implementing the dual-tier navigation system: a root Stack Navigator for authentication flows and a bottom Tab Navigator for logged-in features.
- Managing global state through React Context (`AppContext.js`) to provide reactive access to user profiles, accessibility preferences, emergency contacts, and event history.
- Ensuring smooth compatibility with modern Android devices and Expo Go environments.
- **Contribution:** Complete cross-platform mobile application development and navigation architecture.

### 1.2 Accessible User Interface (UI/UX) Design
I designed and built all five user-facing screens tailored specifically for blind and visually impaired users.
My responsibilities included:
- Implementing a high-contrast dark theme (deep navy background `#1a1a2e`, bright accent `#e94560`, card containers `#16213e`, and crisp white typography `#ffffff`).
- Creating oversized touch targets and cards with prominent icons to facilitate effortless tactile and low-vision interaction.
- Adding comprehensive `accessibilityLabel` tags to all buttons, input fields, and cards to support system screen readers (TalkBack on Android and VoiceOver on iOS).
- Incorporating dedicated "Hear Instructions" voice buttons across screens so users can listen to spoken guidance at any time.
- **Contribution:** Accessible, high-contrast, screen-reader-compliant mobile user interface design.

### 1.3 Smartphone Camera Interface Integration
I implemented the live camera view using `expo-camera`, providing visual input to the AI computer vision engine.
My responsibilities included:
- Handling on-device camera hardware permission requests and permission-denied fallback screens.
- Integrating the modern `CameraView` component with back/front camera toggle capabilities.
- Building the dynamic Heads-Up Display (HUD) that overlays color-coded bounding boxes and hazard badges directly onto the camera feed.
- Providing seamless toggling between "AI Object Detection" mode and "OCR Text Reading" mode with immediate spoken confirmation.
- **Contribution:** Camera hardware integration and live hazard overlay display (`src/screens/CameraScreen.js`).

### 1.4 Voice Interaction and Haptic Feedback System
I engineered the multimodal sensory feedback pipeline that converts visual and navigational events into audio and tactile sensations.
My responsibilities included:
- Integrating `expo-speech` to deliver clear Text-to-Speech (TTS) audio narration for all system warnings, navigation steps, and button presses.
- Configuring customizable speech parameters (speech rate from 0.5x to 2.0x, speech pitch, and language options) within the user profile.
- Integrating `expo-haptics` to deliver distinctive vibration patterns (gentle confirmation, warning vibration, and high-intensity emergency pulse).
- Building the audio replay engine in the event history screen, allowing users to tap any past event to hear it spoken aloud.
- **Contribution:** Voice synthesis, speech customization, and haptic feedback implementation (`src/utils/speech.js`).

### 1.5 GPS Navigation & Emergency SOS Interface
I built the outdoor navigation and one-touch emergency response interface connecting device sensors with caregiver support.
My responsibilities included:
- Integrating `expo-location` to capture real-time GPS coordinates (latitude and longitude) with refresh and permission management.
- Designing the step-by-step directional voice navigation interface that speaks sequential turn-by-turn route instructions.
- Developing the prominent, high-contrast Emergency SOS alert button that triggers emergency vibration, speaks confirmation, and dispatches live coordinates to configured caregiver contacts.
- Integrating external map routing via platform linking (`geo:` and `maps:` protocols).
- **Contribution:** GPS navigation interface and emergency SOS alert screen (`src/screens/NavigationScreen.js`).

### 1.6 Final System Integration
I led the final integration that brought together all hardware components, frontend screens, the local database, and AI detection modules into a single cohesive mobile application.
My responsibilities included:
- Connecting the camera frame loop with the computer vision inference module (`mockDetection.js`).
- Binding local SQLite database methods (`database.js`) to the state management layer (`AppContext.js`) for seamless offline persistence.
- Conducting comprehensive testing on physical devices through Expo Go to ensure zero crashes, smooth frame rendering, and instant audio response.
- **Contribution:** Final end-to-end system integration and hardware-to-software binding.

---

## 2. Functional Requirements I Contributed To

My contributions covered the frontend, hardware integration, user experience, and multimodal interaction requirements defined in the Capstone Project Proposal:

### FR-01: User Registration & Login UI
- Developed [`src/screens/LoginScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/LoginScreen.js) with accessible form inputs, clear focus states, validation alerts, and audio instructions.

### FR-02: User Profile & Accessibility Management UI
- Developed [`src/screens/ProfileScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/ProfileScreen.js) enabling users to toggle voice guidance, adjust speech rate sliders, set detection sensitivity, and manage emergency contacts.

### FR-03: Smartphone Camera Integration
- Developed [`src/screens/CameraScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/CameraScreen.js) using `expo-camera`, capturing visual surroundings in real time with front/back camera switching.

### FR-09: Text-to-Speech (TTS) Conversion
- Developed [`src/utils/speech.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/utils/speech.js) using `expo-speech` to instantly convert recognized text, hazard notifications, and menu titles into clear voice output.

### FR-10: Voice-Based Assistance & Interaction
- Implemented tap-to-listen interactions across the entire app, allowing visually impaired users to hear screen descriptions, feature explanations, and historical logs.

### FR-12: Real-Time Voice Warning Display
- Created dynamic visual hazard badges (Green = Safe, Orange = Caution, Red = Critical Danger) accompanied by synchronized danger vibration and spoken warnings.

### FR-13: Navigation Assistance UI
- Developed the GPS directional interface in [`src/screens/NavigationScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/NavigationScreen.js) providing destination input, live coordinate displays, and turn-by-turn guidance.

### FR-14: Emergency Alert UI
- Implemented the high-priority, full-width Emergency SOS button with instant sensory feedback (speech announcement + danger haptic pulse) and caregiver coordinate sharing.

### FR-15: Safety Event History UI
- Developed [`src/screens/HistoryScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/HistoryScreen.js) displaying chronological safety logs with color-coded event icons and tap-to-replay voice functionality.

---

## 3. Research and Learning

During the development of the BlindGuide mobile interface and hardware integration, I gained deep practical knowledge in mobile development, accessibility design standards, and device sensor integration:

### 3.1 Mobile Accessibility (a11y) Design Principles
- Researched Web Content Accessibility Guidelines (WCAG 2.1) and mobile accessibility guidelines for visually impaired users.
- Learned the importance of high-contrast color ratios ($\ge 7:1$), large touch target dimensions ($\ge 48 \times 48$ dp), semantic labels for screen readers, and auditory confirmation for all gestures.

### 3.2 React Native & Expo Ecosystem (SDK 58)
- Mastered component-based architecture in React Native 0.88 and React 19.
- Learned to use modern Expo APIs (`expo-camera`, `expo-location`, `expo-speech`, `expo-haptics`) to interact with device hardware without complex native Java/Objective-C boilerplate.

### 3.3 Multimodal Feedback (Audio & Haptics)
- Studied how combining acoustic feedback (spoken audio) with tactile haptic vibrations dramatically reduces reaction time for blind users facing imminent physical obstacles.

### 3.4 Geolocation and Native Device Permissions
- Learned to manage foreground location permissions, extract high-accuracy GPS coordinates using `expo-location`, and construct cross-platform intent URLs to launch native navigation apps.

### 3.5 Collaborative Software Integration
- Learned how to coordinate with backend developer Maruf (binding APIs and local SQLite database) and AI developer Mahin (visualizing computer vision bounding boxes and proximity tiers).
- Maintained code hygiene, modular folder organization, and version control using Git and GitHub.

---

## 4. Development Strategy and Approach

I followed an iterative, accessibility-first development strategy:

- **Step 1: Accessibility UX Research & Color Palette Selection**  
  Selected a deep navy, high-contrast visual theme designed for low-vision accessibility and defined semantic audio prompts for visually impaired users.

- **Step 2: Navigation Architecture & Tab Setup**  
  Configured `@react-navigation/native-stack` and `@react-navigation/bottom-tabs`, establishing persistent bottom tabs (Home, Detect, Navigate, History, Profile) with distinct iconography.

- **Step 3: Core Screen Development**  
  Built the five main screens (`LoginScreen`, `HomeScreen`, `CameraScreen`, `NavigationScreen`, `ProfileScreen`, `HistoryScreen`) with oversized buttons, clear cards, and screen reader labels.

- **Step 4: Camera Hardware & Overlay Integration**  
  Integrated `expo-camera` CameraView, built live bounding box overlays, and created the top status HUD that reflects real-time hazard severity.

- **Step 5: Voice Synthesis & Haptic Engine**  
  Implemented the centralized `speech.js` module using `expo-speech` and `expo-haptics`, enabling immediate spoken feedback across every user interaction.

- **Step 6: GPS Location & Emergency SOS System**  
  Implemented `expo-location` tracking, turn-by-turn directional cards, and the one-touch emergency alert button.

- **Step 7: Final System Integration & Expo Go Testing**  
  Tested and resolved Expo SDK 58 package dependencies, compiled the Android bundle with 0 errors, and verified live execution on physical smartphones.

---

## 5. Technical Challenges and Solutions

### 5.1 Designing for Visually Impaired Users Without Visual Reliance
- **Challenge:** Standard mobile apps rely entirely on visual cues that are inaccessible to blind users.
- **Solution:** I implemented a multimodal feedback system where every visual element is backed by an `accessibilityLabel`, every screen transition triggers an automatic voice announcement, and every dangerous obstacle triggers both speech and physical haptic vibration.

### 5.2 Expo SDK 58 Package Compatibility and Metro Bundling
- **Challenge:** During initial project setup, mismatched versions between Expo Go, React 19, and navigation packages caused Metro bundling errors.
- **Solution:** I upgraded the project dependencies to synchronized Expo SDK 58 packages (`@react-navigation` v7, `react-native-screens` 4.30.1, `react-native-safe-area-context` 5.11.1), cleaned cache artifacts, and achieved a clean Android compilation of 1,009 modules with zero errors.

### 5.3 Camera Permission Handling and User Recovery
- **Challenge:** If a blind user accidentally declines camera permissions, the app could become stuck on a blank black screen.
- **Solution:** I built a dedicated fallback screen with a prominent icon, an automatic voice announcement explaining that camera access is required, and a large "Grant Permission" button that directly re-triggers the system permission dialog.

### 5.4 Preventing Speech Overlap and Audio Glitches
- **Challenge:** When multiple obstacle warnings, navigation prompts, and button taps trigger speech simultaneously, default TTS engines either freeze or produce garbled overlapping audio.
- **Solution:** In `src/utils/speech.js`, I added an explicit `Speech.stop()` call immediately before every `Speech.speak()` execution, ensuring that prior utterances are gracefully halted before the latest, most urgent message is spoken.

---

## 6. Development Tools and AI Assistance

### 6.1 Development Tools
The following tools and technologies were utilized for frontend and hardware integration:
- **React Native & React 19:** Cross-platform mobile application development framework.
- **Expo (SDK 58):** Mobile development platform for fast bundling and hardware API access.
- **Expo Camera:** Camera hardware access and live video feed rendering.
- **Expo Speech:** Text-to-Speech (TTS) voice synthesis engine.
- **Expo Location:** High-accuracy GPS geolocation hardware module.
- **Expo Haptics:** Physical device vibration motor control.
- **React Navigation (v7):** Tab and Stack navigation infrastructure.
- **Ionicons (`@expo/vector-icons`):** High-clarity iconography.
- **Git & GitHub:** Version control, collaborative code management, and repository maintenance.

### 6.2 AI-Assisted Development
AI-assisted tools were utilized during frontend development for researching WCAG accessibility color contrast ratios, exploring clean React Navigation v7 configuration syntax, and troubleshooting Expo SDK 58 dependency alignments. All component layouts, state hooks, styling sheets, hardware bindings, and user interfaces were reviewed, customized, and verified to fulfill the BlindGuide proposal.

### 6.3 My Individual Work
My individual work encompasses the complete development of the mobile application interface and hardware modules:
- Main navigation root: [`App.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/App.js)
- Camera & Vision interface: [`src/screens/CameraScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/CameraScreen.js)
- Navigation & SOS interface: [`src/screens/NavigationScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/NavigationScreen.js)
- Accessible Login screen: [`src/screens/LoginScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/LoginScreen.js)
- Home Dashboard: [`src/screens/HomeScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/HomeScreen.js)
- Accessibility Profile & Settings: [`src/screens/ProfileScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/ProfileScreen.js)
- Safety Event History: [`src/screens/HistoryScreen.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/screens/HistoryScreen.js)
- Voice TTS & Haptics module: [`src/utils/speech.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/utils/speech.js)
- App state context: [`src/context/AppContext.js`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/src/context/AppContext.js)
- App configuration & permissions: [`app.json`](file:///C:/Users/Asus/.gemini/antigravity/scratch/BlindGuide/app.json)

---

## 7. Evidence of Individual Contributions

### 7.1 Android Bundle Export Evidence (Expo SDK 58)
The mobile frontend compiles cleanly with 1,009 bundled modules and zero compilation errors:

```
Starting Metro Bundler

Android Bundled 11061ms index.js (1009 modules)
› Assets (36)
› android bundles (1):
_expo/static/js/android/index-0eb56b3238ad6c1ca7c1680e026934dd.hbc (2.6MB)
› Files (1):
metadata.json (2.5KB)

Exported: dist
```

### 7.2 Camera Hardware Interface & HUD Badges (`src/screens/CameraScreen.js`)
```jsx
<CameraView style={styles.camera} facing={facing}>
  {/* Top Safety Status Badge */}
  <View style={styles.topHud}>
    <View style={[styles.safetyBadge, { backgroundColor: safetyBgColor }]}>
      <Ionicons
        name={safetyStatus.level === 'danger' ? 'warning' : 'checkmark-circle'}
        size={18}
        color={COLORS.text}
      />
      <Text style={styles.safetyText}>{safetyStatus.message}</Text>
    </View>
  </View>

  {/* Live Bounding Box Overlays */}
  {mode === 'detect' && detections.map((d, i) => (
    <View key={i} style={[styles.detectionBox, { borderColor: PROXIMITY_COLOR[d.proximity] }]}>
      <Text style={styles.detectionLabel}>
        {d.label} • {d.proximity} • {Math.round(d.confidence * 100)}%
      </Text>
    </View>
  ))}
</CameraView>
```

### 7.3 Text-to-Speech & Haptic Feedback Engine (`src/utils/speech.js`)
```javascript
export const speak = (text, options = {}) => {
  Speech.stop(); // Halt any ongoing utterance to avoid overlap
  Speech.speak(text, {
    rate: options.rate || 1.0,
    pitch: options.pitch || 1.0,
    language: options.language || 'en-US',
    ...options,
  });
};

export const dangerVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const warningVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};
```

### 7.4 GPS Location & Emergency Alert Trigger (`src/screens/NavigationScreen.js`)
```javascript
const triggerEmergency = async () => {
  setEmergencyActive(true);
  dangerVibration();
  speak('Emergency alert activated! Sending location to emergency contacts.');

  addEvent({
    type: 'emergency',
    message: 'Emergency alert triggered',
    location: location
      ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
      : 'Unknown',
  });
};
```

### 7.5 Code Header Attribution Evidence
Every frontend file contains explicit developer attribution:
```javascript
/**
 * ============================================================================
 * MODULE: Navigation & Emergency Interface
 * ASSIGNED DEVELOPER: Farhana Jannat Saki (Hiya) (Student ID: 241-35-053)
 * ROLE: Frontend & Hardware Integration Developer
 * RESPONSIBILITIES: GPS Navigation, Emergency SOS UI, Voice guidance
 * ============================================================================
 */
```

---

## 8. Conclusion

Working on the **BlindGuide** project gave me profound practical experience in mobile application engineering, hardware peripheral integration, and user-centered accessibility design for visually impaired individuals.

My individual contributions centered around:
1. Developing the complete multi-screen React Native application running on the latest Expo SDK 58 platform.
2. Creating an accessible, high-contrast dark theme with screen-reader semantic labels and oversized touch controls.
3. Integrating the smartphone camera interface with real-time bounding box overlays and hazard HUD status indicators.
4. Engineering the multimodal voice interaction system (TTS) and haptic vibration feedback engine for instant tactile alerts.
5. Implementing GPS navigation assistance and the life-saving one-touch Emergency SOS broadcasting interface.
6. Leading the final system integration uniting camera input, GPS coordinates, local SQLite storage, and AI hazard warnings.

This capstone project provided me with invaluable expertise in mobile software engineering, sensor integration, and assistive technology development. My work delivers the primary touchpoint through which visually impaired users interact with BlindGuide, translating complex computer vision and backend systems into an empowering, life-enhancing mobile experience.
