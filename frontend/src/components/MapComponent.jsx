import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchFloodRisk, fetchAgentStatus } from '../services/api';

// Fix Leaflet Default Icon Issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Agents
const createAgentIcon = (color) => L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`
});

const MapComponent = ({ triggerRefresh }) => {
    const [riskData, setRiskData] = useState([]);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const risk = await fetchFloodRisk();
            const ag = await fetchAgentStatus();
            setRiskData(risk.heatmap || []);
            setAgents(ag.agents || []);
        };

        loadData();
        const interval = setInterval(loadData, 2000); // Polling every 2s for live updates
        return () => clearInterval(interval);
    }, [triggerRefresh]);

    const getColor = (riskLevel) => {
        switch (riskLevel) {
            case 'CRITICAL': return '#ef4444'; // Red
            case 'HIGH': return '#f97316'; // Orange
            case 'MODERATE': return '#eab308'; // Yellow
            default: return '#22c55e'; // Green
        }
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden glass-panel">
            <MapContainer center={[12.9916, 77.6146]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Render Risk Heatmap Zones */}
                {riskData.map((pt, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[pt.lat, pt.lon]}
                        pathOptions={{ color: getColor(pt.risk.level), fillColor: getColor(pt.risk.level), fillOpacity: 0.4, weight: 0 }}
                        radius={20}
                    >
                        <Popup>
                            <strong>Zone Logic</strong><br />
                            Risk: {pt.risk.level}<br />
                            Score: {pt.risk.score.toFixed(1)}
                        </Popup>
                    </CircleMarker>
                ))}

                {/* Render Agents */}
                {agents.map((agent) => (
                    <Marker
                        key={agent.id}
                        position={[12.9916, 77.6146]} // Placeholder position - logic needed to move them
                        icon={createAgentIcon(agent.type === 'RESCUE' ? '#3b82f6' : '#ec4899')}
                    >
                        <Popup>{agent.name} <br /> Status: {agent.status}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
