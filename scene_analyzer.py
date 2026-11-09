"""
================================================================================
MODULE: AI Scene Understanding & Context Analysis
ASSIGNED DEVELOPER: Mahin Al Hasan (Student ID: 241-35-351)
ROLE: AI & Computer Vision Developer
RESPONSIBILITIES:
  - Scene understanding (aggregating multi-object context)
  - Prioritizing information critical to visually impaired user safety
  - Natural language environmental description synthesis
================================================================================
"""

class SceneUnderstandingEngine:
    def __init__(self):
        print("[AI Module - Mahin Al Hasan] SceneUnderstandingEngine loaded.")

    def synthesize_scene_description(self, detections):
        """
        Takes detected items from computer vision layer and generates
        a clear, concise voice sentence for the blind user.
        """
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
