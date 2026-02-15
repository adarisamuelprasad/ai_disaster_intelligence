import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import DashboardStatus from './components/DashboardStatus';
import { ShieldAlert } from 'lucide-react';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-900 p-4 gap-4 overflow-hidden">
      {/* Sidebar (30%) */}
      <aside className="w-1/4 min-w-[300px] h-full flex flex-col gap-4">
        <div className="flex items-center gap-2 p-4 glass-panel rounded-xl">
          <ShieldAlert className="text-red-500 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              BharatShield AI
            </h1>
            <p className="text-xs text-slate-400">Autonomous Disaster Commander</p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <DashboardStatus />
        </div>
      </aside>

      {/* Main Map Area (70%) */}
      <main className="flex-1 h-full relative rounded-xl overflow-hidden glass-panel border border-slate-700/50 shadow-2xl">
        <div className="absolute top-4 left-4 z-[1000] bg-black/60 backdrop-blur px-3 py-1 rounded text-xs border border-white/10">
          Scanning Satellite Data (Sentinel-2) • Live
        </div>
        <MapComponent triggerRefresh={refreshKey} />
      </main>
    </div>
  );
}

export default App;
