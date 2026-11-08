"""
================================================================================
MODULE: Python AI Microservice Entry Point
ASSIGNED DEVELOPER: Mahin Al Hasan (Student ID: 241-35-351)
ROLE: AI & Computer Vision Developer
================================================================================
"""

import sys
from yolo_detector import ObjectDetector
from scene_analyzer import SceneUnderstandingEngine

def run_ai_demo():
    print("=" * 60)
    print(" BlindGuide AI Computer Vision Engine")
    print(" Lead Developer: Mahin Al Hasan (AI & CV Developer)")
    print("=" * 60)

    detector = ObjectDetector(confidence_threshold=0.60)
    scene_engine = SceneUnderstandingEngine()

    # Sample input from camera feed
    mock_camera_frame = [
        {'label': 'stairs', 'box': {'width': 220, 'height': 240, 'y': 380}},
        {'label': 'person', 'box': {'width': 80, 'height': 150, 'y': 180}}
    ]

    print("\n[1] Processing Camera Input...")
    results = detector.process_frame(mock_camera_frame)
    for r in results:
        print(f" -> Detected: {r['label'].upper()} | Proximity: {r['proximity']} | Warning: {r['hazard']['voice_warning']}")

    print("\n[2] Generating Full Scene Audio Guidance...")
    narration = scene_engine.synthesize_scene_description(results)
    print(f" -> TTS Output: \"{narration}\"")
    print("\n[OK] AI Inference pipeline completed successfully.")

if __name__ == '__main__':
    run_ai_demo()
