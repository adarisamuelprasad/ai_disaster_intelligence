# 📋 Project Requirements: AI Disaster Intelligence System

## 1. Project Overview
The **Integrated AI Disaster Intelligence System** is an autonomous disaster management platform that combines early micro-flood prediction with a multi-agent response system. It aims to reduce response times and save lives by predicting floods 24-48 hours in advance and automatically coordinating rescue efforts.

## 2. Functional Requirements

### A. Prediction Module (The Eye)
*   **Input Data Processing**: application must ingest simulated satellite data (soil moisture, vegetation index) and weather patterns.
*   **Risk Analysis**: AI model must calculate a "Risk Score" (0-100) for specific geo-locations.
*   **Heatmap Generation**: System must generate a grid-based risk heatmap classifying zones as Safe (Green), Warning (Yellow), or Critical (Red).

### B. Multi-Agent System (The Brain)
*   **Agent Types**: System must support 4 distinct agent types:
    *   **Rescue Agent**: Allocates boats/teams to high-risk zones.
    *   **Medical Agent**: Monitors hospital capacity and redirects patients.
    *   **Supply Agent**: Manages food/water distribution.
    *   **Route Agent**: Calculates optimal paths avoiding flooded nodes.
*   **Autonomous Coordination**: Agents must react to "Risk Alerts" without human intervention.
*   **State Management**: Agents must track their status (IDLE, WORKING, DEPLOYED).

### C. Command Dashboard (The Interface)
*   **Real-Time Visualization**: Display a live map with flood risk overlays and moving agent icons.
*   **Live Logging**: Show a real-time feed of agent decisions (e.g., "Rescue Team Alpha dispatched").
*   **Simulation Trigger**: Provide manual controls to trigger disaster scenarios (e.g., "Flash Flood") for demonstration.

## 3. Non-Functional Requirements
*   **Real-Time Performance**: Dashboard updates must happen within 2 seconds of a backend state change.
*   **Scalability**: The backend must handle multiple concurrent agents and grid points.
*   **Usability**: The UI must be intuitive, using specific color coding (Red for danger) for rapid decision-making.

## 4. Technology Stack Requirements
*   **Frontend**: React.js (Vite), Tailwind CSS (Glassmorphism), Leaflet Maps.
*   **Backend**: Python FastAPI.
*   **AI/Data**: NumPy (Simulation), Scikit-Learn (concept), NetworkX (Routing).
*   **Environment**: Node.js v16+, Python 3.9+.

## 5. Hardware Requirements (For Deployment)
*   **Minimum**: 2 vCPUs, 4GB RAM (for simulation and basic model inference).
*   **Recommended**: 4 vCPUs, 8GB RAM + GPU (if upgrading to real satellite image processing).
