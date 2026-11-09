"""
================================================================================
MODULE: AI Object & Obstacle Detection Engine
ASSIGNED DEVELOPER: Mahin Al Hasan (Student ID: 241-35-351)
ROLE: AI & Computer Vision Developer
RESPONSIBILITIES:
  - Object detection (YOLO model pipeline)
  - Obstacle detection in user walking path
  - Proximity estimation (Near / Medium / Far)
  - Timely hazard safety warnings
================================================================================
"""

import math

# Hazard scoring based on BlindGuide Proposal specifications
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


class ObjectDetector:
    """
    Object detection & obstacle evaluation pipeline.
    In production, loads YOLOv8/v9 weights (e.g. yolov8n.pt) via Ultralytics / OpenCV DNN.
    """
    def __init__(self, confidence_threshold=0.55):
        self.confidence_threshold = confidence_threshold
        print("[AI Module - Mahin Al Hasan] ObjectDetector initialized with threshold:", confidence_threshold)

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

    def evaluate_hazard(self, label, proximity):
        hazard_info = HAZARD_DATABASE.get(label.lower(), {'level': 'low', 'score': 1, 'warning': f'{label} ahead.'})
        is_critical = proximity == 'near' and hazard_info['score'] >= 7
        return {
            'is_critical': is_critical,
            'hazard_level': hazard_info['level'],
            'voice_warning': hazard_info['warning'] if is_critical else f"{label} at {proximity} distance."
        }

    def process_frame(self, frame_metadata):
        """
        Analyzes detected bounding boxes and generates contextual warnings.
        """
        results = []
        for item in frame_metadata:
            label = item.get('label', 'unknown')
            box = item.get('box', {'width': 100, 'height': 100, 'y': 200})
            
            # Simulated frame dimensions 640x480
            area_ratio = (box.get('width', 100) * box.get('height', 100)) / (640 * 480)
            center_y_ratio = box.get('y', 200) / 480.0

            proximity = self.estimate_proximity(area_ratio, center_y_ratio)
            hazard = self.evaluate_hazard(label, proximity)

            results.append({
                'label': label,
                'proximity': proximity,
                'hazard': hazard
            })

        return results
