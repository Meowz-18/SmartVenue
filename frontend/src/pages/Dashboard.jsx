import React from 'react';
import { Users, Timer, AlertTriangle, ArrowUp, ArrowDown, Activity, Info, Bell, ChevronRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid } from 'recharts';
import { cn } from '../utils/cn';

const getStatusColor = (status) => {
  if (status === 'critical') return '#ef4444';
  if (status === 'warning') return '#f59e0b';
  return '#10b981';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-4 border border-white/10 shadow-2xl rounded-2xl text-[10px] font-sans text-white min-w-[140px]">
        <p className="text-slate-400 mb-2 font-bold uppercase tracking-widest border-b border-white/5 pb-2">{label}</p>
        <div className="space-y-2 pt-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="opacity-80 font-medium">{entry.name}</span>
              </div>
              <span className="font-bold tabular-nums">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [densityData, setDensityData] = React.useState([
    { time: '14:00', north: 40, south: 20, east: 30, west: 25 },
    { time: '14:30', north: 55, south: 25, east: 45, west: 30 },
    { time: '15:00', north: 75, south: 30, east: 60, west: 45 },
    { time: '15:30', north: 85, south: 35, east: 70, west: 55 },
    { time: '16:00', north: 92, south: 35, east: 78, west: 65 },
  ]);

  const [queueData, setQueueData] = React.useState([
    { name: 'Gate A', wait: 4.2, status: 'optimal' },
    { name: 'Gate B', wait: 8.5, status: 'critical' },
    { name: 'Merch 1', wait: 3.1, status: 'optimal' },
    { name: 'Food N', wait: 5.0, status: 'warning' },
  ]);

  React.useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/venue');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'venue_update') {
          setDensityData(prev => {
            const newData = [...prev.slice(1)];
            newData.push({
              time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }),
              north: data.zones.find(z => z.id === 'north')?.density || 0,
              south: data.zones.find(z => z.id === 'south')?.density || 0,
              east: data.zones.find(z => z.id === 'east')?.density || 0,
              west: data.zones.find(z => z.id === 'west')?.density || 0,
            });
            return newData;
          });

          setQueueData([
            { name: 'Gate A', wait: data.queues[0]?.wait || 0, status: (data.queues[0]?.wait || 0) > 12 ? 'critical' : 'optimal' },
            { name: 'Gate B', wait: data.queues[1]?.wait || 0, status: (data.queues[1]?.wait || 0) > 18 ? 'critical' : 'warning' },
            { name: 'Merch', wait: data.queues[2]?.wait || 0, status: (data.queues[2]?.wait || 0) > 8 ? 'warning' : 'optimal' },
            { name: 'Food', wait: data.queues[3]?.wait || 0, status: (data.queues[3]?.wait || 0) > 15 ? 'critical' : 'warning' },
          ]);
        }
      } catch (e) {
        console.error("WS error", e);
      }
    };
    return () => ws.close();
  }, []);

  const kpis = [
    { label: 'Live Occupancy', value: '42.8k', change: '+12%', trend: 'up', icon: Users, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', border: 'border-brand-secondary/20' },
    { label: 'Avg wait time', value: '4:12', change: '-1m', trend: 'down', icon: Timer, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { label: 'Alerts active', value: '03', change: 'Priority', trend: 'up', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  ];

  return (
    <div className="p-10 pt-24 max-w-[1600px] mx-auto w-full h-full flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black font-display text-white tracking-tighter leading-none uppercase italic">Venue Analytics</h2>
          <div className="flex items-center gap-3 mt-4 text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] animate-pulse" />
            Live Data Feed • Connected
          </div>
        </div>
        <div className="flex gap-4">
          <button className="h-14 px-8 bg-white/10 border border-white/20 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all flex items-center gap-3 backdrop-blur-xl">
            Export Analytics <ChevronRight size={16} className="opacity-40" />
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Personal Guide - Spans 2 columns */}
        <div className="md:col-span-2 premium-card p-8 iridescent-bg overflow-hidden relative border-none">
           <div className="absolute -top-6 -right-6 p-8 opacity-20 rotate-12 pointer-events-none">
              <Zap size={180} className="text-white" />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                 <h3 className="text-3xl font-black font-display mb-3 text-white tracking-tight">Your Event Guide</h3>
                 <p className="text-slate-100 text-xs font-bold max-w-sm leading-relaxed uppercase tracking-widest opacity-80">Personalized updates • Sec 112</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-10">
                 {[
                   { label: 'Find Restroom', icon: '🚽' },
                   { label: 'View Menu', icon: '🍔' },
                   { label: 'Order Merch', icon: '🧢' },
                   { label: 'Contact Support', icon: '🎧' },
                 ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center justify-center gap-3 w-28 h-28 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[2rem] transition-all group shadow-2xl backdrop-blur-md">
                       <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{action.icon}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">{action.label}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* KPIs as smaller bento items */}
        {kpis.slice(0, 2).map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className={cn("premium-card p-8 flex flex-col justify-between group border-white/5")}>
              <div className="flex items-center justify-between">
                <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center shadow-lg", kpi.bg, kpi.color)}>
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <div className={cn("px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider", kpi.bg, kpi.color)}>
                  {kpi.change}
                </div>
              </div>
              <div className="mt-10">
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</div>
                <div className="text-5xl font-black text-white font-display mt-2 tracking-tighter">{kpi.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[500px]">
        {/* Main Chart Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="premium-card p-8 flex-1 min-h-[400px] flex flex-col relative overflow-hidden group border-white/5">
             <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                  <h3 className="font-black text-white text-2xl font-display flex items-center gap-3 tracking-tight">
                    <Activity size={24} className="text-brand-secondary" /> Zone Density Distribution
                  </h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Real-time occupancy percentage by sector</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Peak</span>
                  </div>
                </div>
             </div>
            
            <div className="flex-1 w-full min-h-0 relative z-10">
              <ResponsiveContainer width="99%" height="100%">
                <AreaChart data={densityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#ffffff" 
                    fontSize={11} 
                    fontWeight={900}
                    tickLine={false} 
                    axisLine={false} 
                    tick={{dy: 10, fill: '#ffffff'}}
                  />
                  <YAxis 
                    stroke="#ffffff" 
                    fontSize={11} 
                    fontWeight={900}
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val}%`}
                    tick={{fill: '#ffffff'}}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#7c3aed', strokeWidth: 2 }} />
                  <Area 
                    type="monotone" 
                    dataKey="north" 
                    stroke="#7c3aed" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrimary)" 
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="south" 
                    stroke="#1e40af" 
                    strokeWidth={3} 
                    strokeDasharray="6 6"
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="premium-card p-8 h-80 flex flex-col group border-white/5">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="font-black text-white text-2xl font-display tracking-tight italic">Wait Time Benchmarking</h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Average processing time per node (minutes)</p>
               </div>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={queueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={60}>
                  <XAxis dataKey="name" stroke="#ffffff" fontSize={11} fontWeight={900} tickLine={false} axisLine={false} tick={{dy: 10, fill: '#ffffff'}} />
                  <YAxis stroke="#ffffff" fontSize={11} fontWeight={900} tickLine={false} axisLine={false} tick={{fill: '#ffffff'}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                    contentStyle={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                    labelStyle={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  />
                  <Bar dataKey="wait" radius={[12, 12, 12, 12]}>
                    {queueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} className="hover:opacity-80 transition-opacity" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Logs Column */}
        <div className="flex flex-col gap-8">
          <div className="premium-card flex flex-col h-full overflow-hidden border-t-4 border-t-brand-secondary border-white/5">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <h3 className="font-black text-white text-2xl font-display flex items-center gap-3 tracking-tight">
                 <Bell size={24} className="text-brand-secondary" /> Live Updates
               </h3>
               <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary animate-ping shadow-[0_0_12px_rgba(124,58,237,1)]" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {[
                { title: 'Critical Congestion', desc: 'North Gate Sectors 12-14 at 95% capacity. Diverting traffic.', time: 'Just Now', color: 'red' },
                { title: 'New Event Alert', desc: 'Halftime show performance starting in 15 minutes.', time: '4m ago', color: 'blue' },
                { title: 'System Optimized', desc: 'AI successfully rerouted 1.2k attendees to East Entrance.', time: '12m ago', color: 'emerald' },
                { title: 'Vendor Restock', desc: 'Stall B-12 refreshed stock. Wait time reduced.', time: '20m ago', color: 'amber' },
              ].map((log, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-xl shadow-lg", 
                      log.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 
                      log.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 
                      log.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                    )}>
                      {log.title}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{log.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 font-bold leading-relaxed group-hover:text-white transition-colors pl-1 border-l-2 border-transparent group-hover:border-brand-secondary">{log.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button className="w-full py-5 bg-slate-800/40 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-300 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all shadow-2xl backdrop-blur-md">
                View Full Logs Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
