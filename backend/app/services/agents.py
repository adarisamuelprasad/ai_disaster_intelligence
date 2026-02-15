from enum import Enum
import uuid

class AgentType(Enum):
    RESCUE = "RESCUE"
    MEDICAL = "MEDICAL"
    SUPPLY = "SUPPLY"
    ROUTE = "ROUTE"

class DisasterAgent:
    def __init__(self, agent_type: AgentType, name: str):
        self.id = str(uuid.uuid4())
        self.type = agent_type
        self.name = name
        self.status = "IDLE"
        self.current_task = None
        self.location = {"lat": 0, "lon": 0}

    def assign_task(self, task):
        self.status = "WORKING"
        self.current_task = task
        return f"Agent {self.name} accepted task: {task}"

class MultiAgentSystem:
    def __init__(self):
        self.agents = [
            DisasterAgent(AgentType.RESCUE, "Rescue-Alpha"),
            DisasterAgent(AgentType.RESCUE, "Rescue-Bravo"),
            DisasterAgent(AgentType.MEDICAL, "Medi-Corp-1"),
            DisasterAgent(AgentType.SUPPLY, "Supply-Logistics-A"),
            DisasterAgent(AgentType.ROUTE, "Pathfinder-AI")
        ]

    def coordinate_response(self, risk_data):
        """
        The 'Brain' of the system. Analyzes risk and dispatches agents.
        """
        logs = []
        critical_zones = [z for z in risk_data if z['risk']['level'] == 'CRITICAL']
        
        if not critical_zones:
            return {"status": "MONITORING", "logs": ["No critical threats detected. Agents on standby."]}

        # If critical zones exist, dispatch
        for zone in critical_zones:
            # 1. Dispatch Rescue
            rescue_agent = next((a for a in self.agents if a.type == AgentType.RESCUE and a.status == "IDLE"), None)
            if rescue_agent:
                log = rescue_agent.assign_task(f"Deploy to Zone {zone['lat']},{zone['lon']}")
                logs.append(log)
            
            # 2. Medical Check
            medical_agent = next((a for a in self.agents if a.type == AgentType.MEDICAL), None)
            if medical_agent:
                 logs.append(f"{medical_agent.name}: Checking hospital capacity near {zone['lat']},{zone['lon']}...")
                 # Logic for hospital check would go here

            # 3. Supply Check
            supply_agent = next((a for a in self.agents if a.type == AgentType.SUPPLY), None)
            if supply_agent:
                logs.append(f"{supply_agent.name}: Preparing food packets for 500 people.")

        return {"status": "ACTIVE_RESPONSE", "logs": logs, "deployed_agents": [a.name for a in self.agents if a.status == "WORKING"]}
