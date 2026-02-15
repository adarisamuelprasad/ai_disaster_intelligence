from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.prediction_engine import PredictionEngine
from app.services.agents import MultiAgentSystem
import random

app = FastAPI(title="AI Disaster Intelligence System", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services
predictor = PredictionEngine()
agent_system = MultiAgentSystem()

@app.get("/")
def read_root():
    return {"status": "active", "system": "AI Disaster Intelligence System"}

@app.get("/api/predict-flood")
def predict_flood():
    """
    Returns simulated flood risk data (heatmap points).
    """
    # Simulate dynamic changes
    data = predictor.generate_heatmap_data()
    return {"status": "success", "heatmap": data}

@app.get("/api/agent-status")
def get_agent_status():
    """
    Returns current status of all AI agents and their logs.
    """
    # We simulate a "check" which might trigger actions if risk is high
    # For demo, we just return current state
    return {"agents": [a.__dict__ for a in agent_system.agents]}

@app.post("/api/trigger-event")
def trigger_event(event_type: str = "HEAVY_RAIN"):
    """
    Manually trigger a disaster event to see AI response.
    """
    # This would update the simulation state
    # For now, just logging
    return {"status": "triggered", "event": event_type, "response": agent_system.coordinate_response(predictor.generate_heatmap_data())}
