import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Droplets, Truck, HeartPulse, MapPin } from 'lucide-react';
import { fetchAgentStatus, triggerEvent } from '../services/api';

const DashboardStatus = () => {
    const [agents, setAgents] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await fetchAgentStatus();
            setAgents(data.agents || []);
            // In a real app, logs would come from backend. Simulating here for demo effect.
            if (data.agents && data.agents.some(a => a.status === 'WORKING')) {
                setLogs(prev => [`[${new Date().toLocaleTimeString()}] Agent Deployment Update...`, ...prev.slice(0, 4)]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSimulate = async () => {
        await triggerEvent("FLASH_FLOOD");
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] WARNING: Flash Flood Simulation Triggered!`, ...prev]);
    };

    return (
        <div className="h-full flex flex-col gap-4 p-4 glass-panel rounded-xl text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-blue-400" /> Live Command Center
            </h2>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 p-2 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-400">3</div>
                    <div className="text-xs text-slate-400">Critical Zones</div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">85%</div>
                    <div className="text-xs text-slate-400">Rescue Efficiency</div>
                </div>
            </div>

            {/* Agents List */}
            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-semibold mb-2 text-slate-300">Active Agents</h3>
                <div className="space-y-2">
                    {agents.map(agent => (
                        <div key={agent.id} className="flex items-center gap-2 text-sm bg-slate-800/30 p-2 rounded border border-slate-700">
                            {agent.type === 'RESCUE' && <Truck size={14} className="text-blue-400" />}
                            {agent.type === 'MEDICAL' && <HeartPulse size={14} className="text-pink-400" />}
                            {agent.type === 'SUPPLY' && <Droplets size={14} className="text-yellow-400" />}
                            {agent.type === 'ROUTE' && <MapPin size={14} className="text-purple-400" />}

                            <div className="flex-1">
                                <div className="font-medium">{agent.name}</div>
                                <div className="text-xs opacity-70">{agent.status}</div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${agent.status === 'WORKING' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logs / Alerts */}
            <div className="h-1/3 bg-black/20 rounded p-2 overflow-hidden text-xs font-mono">
                <div className="text-red-400 font-bold mb-1 flex items-center gap-1"><AlertTriangle size={10} /> SysLogs</div>
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 opacity-80 border-b border-white/5 pb-1">{log}</div>
                ))}
            </div>

            <button
                onClick={handleSimulate}
                className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold shadow-lg transition-all active:scale-95"
            >
                ⚠️ TRIGGER SIMULATION
            </button>
        </div>
    );
};

export default DashboardStatus;
