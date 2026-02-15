import random
import numpy as np

class PredictionEngine:
    def __init__(self):
        # In a real system, this would load a trained LSTM/CNN model
        # For hackathon, we simulate realistic probabilities
        pass

    def predict_micro_flood(self, location_data):
        """
        Simulates AI prediction based on soil moisture and rainfall.
        Returns a risk score (0-100) and risk level.
        """
        soil_moisture = location_data.get("soil_moisture", 0)  # 0-100
        rainfall_intensity = location_data.get("rainfall_intensity", 0)  # mm/h
        elevation = location_data.get("elevation", 10)  # meters

        org_risk_score = (soil_moisture * 0.5) + (rainfall_intensity * 0.4) - (elevation * 0.5)
        risk_score = max(0, min(100, org_risk_score))

        if risk_score > 75:
            return {"score": risk_score, "level": "CRITICAL", "action": "EVACUATE"}
        elif risk_score > 50:
            return {"score": risk_score, "level": "HIGH", "action": "PREPARE"}
        elif risk_score > 25:
            return {"score": risk_score, "level": "MODERATE", "action": "MONITOR"}
        else:
            return {"score": risk_score, "level": "LOW", "action": "NONE"}

    def generate_heatmap_data(self):
        """Generates a grid of risk scores for the frontend map."""
        grid_data = []
        # Simulate a 5x5 grid of zones
        for lat in range(5):
            for lon in range(5):
                 # Create a "hotspot" in the center (2,2)
                base_moisture = 40
                if lat == 2 and lon == 2:
                    base_moisture = random.randint(80, 95)
                elif abs(lat-2) <= 1 and abs(lon-2) <= 1:
                    base_moisture = random.randint(60, 80)
                
                simulated_input = {
                    "soil_moisture": base_moisture,
                    "rainfall_intensity": random.randint(0, 100),
                    "elevation": random.randint(5, 20)
                }
                prediction = self.predict_micro_flood(simulated_input)
                grid_data.append({
                    "lat": 12.9716 + (lat * 0.01), # Approx Bangalore/Hyderabad coords
                    "lon": 77.5946 + (lon * 0.01),
                    "risk": prediction
                })
        return grid_data
