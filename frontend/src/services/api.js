import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';

export const fetchFloodRisk = async () => {
    try {
        const response = await fetch(`${API_BASE}/predict-flood`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch flood risk:", error);
        return { heatmap: [] };
    }
};

export const fetchAgentStatus = async () => {
    try {
        const response = await fetch(`${API_BASE}/agent-status`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch agent status:", error);
        return { agents: [] };
    }
};

export const triggerEvent = async (eventType) => {
    try {
        const response = await fetch(`${API_BASE}/trigger-event?event_type=${eventType}`, { method: 'POST' });
        return await response.json();
    } catch (error) {
        console.error("Failed to trigger event:", error);
    }
};
