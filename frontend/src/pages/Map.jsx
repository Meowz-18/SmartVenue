import React from 'react';
import { MapPin, Navigation2, Search, Filter, Layers, ZoomIn, ZoomOut, ChevronRight, Info, AlertCircle, Plus, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Map() {
  const [activeZone, setActiveZone] = React.useState(null);
  const [zoomScale, setZoomScale] = React.useState(1);
  const [isPanning, setIsPanning] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const zones = [
    { id: 'north', name: 'NORTH SECTOR', color: '#ef4444', status: 'CRITICAL', delay: '12m', density: '92%', recommendations: 'Use East Gate' },
    { id: 'south', name: 'SOUTH SECTOR', color: '#3b82f6', status: 'STABLE', delay: '2m', density: '35%', recommendations: 'Optimal path' },
    { id: 'east',  name: 'EAST WING',  color: '#f59e0b', status: 'WARNING', delay: '8m', density: '78%', recommendations: 'Moderate wait' },
    { id: 'west',  name: 'WEST WING',  color: '#a855f7', status: 'BUSY', delay: '15m', density: '65%', recommendations: 'Head to Sec B' },
  ];

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoomScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] w-full flex flex-col relative bg-slate-950 overflow-hidden iridescent-bg">
      
      {/* Top Floating Controls */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl flex flex-col gap-1 shadow-2xl">
            <h2 className="text-2xl font-black font-display text-white tracking-tight leading-none uppercase italic">Live Venue Map</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] animate-pulse" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satellite Sync Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 pointer-events-auto">
          <button className="h-12 px-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-brand-secondary hover:border-brand-secondary transition-all flex items-center gap-2 shadow-xl">
            <Filter size={18} /> Filters
          </button>
          <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl p-1.5">
             <button onClick={handleZoomIn} className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"><ZoomIn size={20} /></button>
             <button onClick={handleZoomOut} className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"><ZoomOut size={20} /></button>
             <button onClick={handleReset} className="p-3 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Reset</button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Container */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-950/20 z-10 cursor-grab active:cursor-grabbing">
        
        {/* Abstract Stadium SVG with Zoom/Pan */}
        <div 
          className="relative transition-transform duration-500 ease-out"
          style={{ 
            transform: `scale(${zoomScale}) translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <svg viewBox="0 0 800 600" className="w-[800px] h-[600px] drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <defs>
               <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                  </feMerge>
               </filter>
            </defs>

            {/* Main Stadium Base */}
            <path d="M400,100 L700,250 L700,350 L400,500 L100,350 L100,250 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="4" />
            
            {/* Zones Grid */}
            <g className="cursor-pointer">
              {zones.map(zone => {
                let d = "";
                if (zone.id === 'north') d = "M400,100 L700,250 L650,275 L400,150 L150,275 L100,250 Z";
                if (zone.id === 'south') d = "M400,500 L700,350 L650,325 L400,450 L150,325 L100,350 Z";
                if (zone.id === 'east') d = "M700,250 L700,350 L650,325 L650,275 Z";
                if (zone.id === 'west') d = "M100,250 L100,350 L150,325 L150,275 Z";
                
                return (
                  <path 
                    key={zone.id}
                    d={d} 
                    fill={activeZone === zone.id ? `${zone.color}44` : '#ffffff05'}
                    stroke={activeZone === zone.id ? zone.color : '#ffffff10'}
                    strokeWidth="2.5"
                    className="transition-all duration-500 hover:fill-white/10"
                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  />
                );
              })}
              
              {/* Central Pitch / Court */}
              <rect x="300" y="250" width="200" height="100" rx="12" fill="#ffffff05" stroke="#ffffff15" strokeWidth="2.5" />
              <circle cx="400" cy="300" r="30" fill="none" stroke="#ffffff10" strokeWidth="2.5" strokeDasharray="10 10" />
            </g>

            {/* Labels */}
            <text x="400" y="130" fill="#475569" fontSize="12" fontWeight="900" textAnchor="middle" className="uppercase tracking-[0.5em] pointer-events-none italic">Sector Alpha</text>
            <text x="400" y="485" fill="#475569" fontSize="12" fontWeight="900" textAnchor="middle" className="uppercase tracking-[0.5em] pointer-events-none italic">Sector Delta</text>
          </svg>

          {/* Dynamic Map Nodes - Absolute Positioned DIVs */}
          <div className="absolute inset-0 pointer-events-none">
            {/* GATE A CONGESTION */}
            <div className="absolute top-[30%] left-[45%] group cursor-pointer z-20 pointer-events-auto">
              <div className="w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75" />
              <div className="absolute top-0 left-0 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(239,68,68,1)] flex items-center justify-center group-hover:scale-150 transition-transform duration-500">
                 <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-slate-900 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-2xl scale-75 group-hover:scale-100">
                 GATE A: 95% CAPACITY
              </div>
            </div>

            {/* MEDICAL STATION */}
            <div className="absolute top-[55%] left-[25%] group cursor-pointer z-20 pointer-events-auto">
              <div className="w-10 h-10 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                 <Plus size={20} className="text-emerald-500 group-hover:text-white transition-colors" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-slate-900 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-2xl">
                 QUICK-MED HUB
              </div>
            </div>

            {/* SECURITY HUB */}
            <div className="absolute top-[20%] left-[70%] group cursor-pointer z-20 pointer-events-auto">
              <div className="w-10 h-10 bg-blue-500/10 backdrop-blur-xl border border-blue-500/40 rounded-2xl shadow-2xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                 <Shield size={20} className="text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-slate-900 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-2xl">
                 SECURITY COMMAND
              </div>
            </div>
          </div>
        </div>

        {/* Floating Detail Overlay */}
        {activeZone && (
          <div className="absolute bottom-12 left-12 md:w-[400px] bg-slate-900/80 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 p-10 flex flex-col gap-10 z-40 animate-float">
            {zones.filter(z => z.id === activeZone).map(zone => (
              <div key={zone.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-black font-display text-white leading-none uppercase italic tracking-tighter">{zone.name}</h3>
                    <div className="flex items-center gap-3 mt-5">
                       <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: zone.color, boxShadow: `0 0 20px ${zone.color}` }} />
                       <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: zone.color }}>{zone.status} MODE</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveZone(null)} className="w-12 h-12 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">×</button>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-10">
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group/node transition-all hover:bg-white/10">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Live Density</div>
                      <div className="text-3xl font-black text-white font-display tabular-nums tracking-tighter">{zone.density}</div>
                   </div>
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group/node transition-all hover:bg-white/10">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Est. Latency</div>
                      <div className="text-3xl font-black text-white font-display tabular-nums tracking-tighter">{zone.delay}</div>
                   </div>
                </div>

                <div className="mt-10 flex flex-col gap-5">
                   <div className="flex items-start gap-5 p-6 bg-brand-secondary/10 rounded-[2.5rem] border border-brand-secondary/30">
                      <Info size={24} className="text-brand-secondary shrink-0 mt-1" />
                      <p className="text-sm text-slate-200 font-bold leading-relaxed">{zone.recommendations}</p>
                   </div>
                   <button className="w-full h-16 bg-brand-secondary text-white rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-secondary/80 transition-all shadow-2xl shadow-brand-secondary/40 active:scale-95 flex items-center justify-center gap-3">
                      Start Navigation <ChevronRight size={18} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Action Menu */}
        <div className="absolute right-12 bottom-12 flex flex-col gap-5">
          <button className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[1.8rem] shadow-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/20 transition-all group active:scale-95">
             <MapPin size={30} strokeWidth={2.5} className="group-hover:scale-125 transition-transform duration-500" />
          </button>
          <button className="w-16 h-16 bg-brand-secondary rounded-[1.8rem] shadow-[0_0_40px_rgba(124,58,237,0.5)] flex items-center justify-center text-white hover:bg-brand-secondary/80 transition-all group active:scale-95">
             <Navigation2 size={30} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </button>
        </div>
      </div>

    </div>
  );
}

