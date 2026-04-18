import React from 'react';
import { Timer, Users, ShoppingBag, Utensils, Info, ArrowRight, ChevronRight, Star, Clock, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Queues() {
  const [filter, setFilter] = React.useState('all');

  const facilities = [
    { 
      id: 1, 
      name: 'North Burger Hub', 
      type: 'food', 
      wait: 12, 
      occupancy: 'High', 
      distance: '150m', 
      rating: 4.8, 
      status: 'warning',
      desc: 'Premium burgers & artisanal fries. Popular during halftime.'
    },
    { 
      id: 2, 
      name: 'East Merch Store', 
      type: 'shop', 
      wait: 3, 
      occupancy: 'Low', 
      distance: '450m', 
      rating: 4.5, 
      status: 'optimal',
      desc: 'Official team jerseys and limited edition match day gear.'
    },
    { 
      id: 3, 
      name: 'South Restrooms', 
      type: 'service', 
      wait: 1, 
      occupancy: 'Optimal', 
      distance: '120m', 
      rating: 5.0, 
      status: 'optimal',
      desc: 'Clean and accessible. Recently sanitized.'
    },
    { 
      id: 4, 
      name: 'West Pizza Express', 
      type: 'food', 
      wait: 25, 
      occupancy: 'Critical', 
      distance: '600m', 
      rating: 4.2, 
      status: 'critical',
      desc: 'Stone baked pizzas. High demand area currently.'
    },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
      case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    }
  };

  const filteredFacilities = filter === 'all' ? facilities : facilities.filter(f => f.type === filter);

  return (
    <div className="p-10 pt-24 max-w-[1600px] mx-auto w-full h-full flex flex-col gap-12">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <h2 className="text-5xl font-black font-display text-white tracking-tight leading-none uppercase italic">Food & Facilities</h2>
          <div className="flex items-center gap-2 mt-4">
             <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary shadow-[0_0_12px_rgba(124,58,237,1)]" />
             <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Real-time node telemetry active</p>
          </div>
        </div>
        
        <div className="flex bg-white/5 p-2 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl self-start">
          {['all', 'food', 'shop', 'service'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-8 py-3 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-500",
                filter === t ? "bg-brand-secondary text-white shadow-2xl shadow-brand-secondary/40" : "text-slate-500 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Banner */}
      <div className="premium-card p-12 mb-4 iridescent-bg overflow-hidden relative border-none group">
         <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] group-hover:bg-white/10 transition-all duration-1000" />
         <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10 rotate-12 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
            <Zap size={250} className="text-white" />
         </div>
         
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-2xl">
               <div className="flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.4em] mb-6">
                  <Star size={16} className="fill-white animate-pulse" /> AI recommendation
               </div>
               <h3 className="text-4xl font-black text-white font-display leading-[1.1] tracking-tighter uppercase italic">North Burger Hub is clearing up!</h3>
               <p className="text-slate-100 text-base mt-6 font-bold leading-relaxed opacity-80 uppercase tracking-widest max-w-lg">
                  Wait time dropped from 25m to 12m. It's the perfect window for a restock.
               </p>
            </div>
            <button className="h-20 px-12 bg-white text-brand-secondary rounded-[2rem] text-[11px] font-black uppercase tracking-[0.25em] hover:bg-slate-100 transition-all shadow-[0_30px_70px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-4 shrink-0">
               Initialize Route <ArrowRight size={22} />
            </button>
         </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredFacilities.map((facility) => (
          <div key={facility.id} className="premium-card overflow-hidden group hover:scale-[1.02] border-white/5 bg-white/[0.02]">
            <div className="p-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-all duration-500 shadow-2xl">
                    {facility.type === 'food' ? <Utensils size={32} /> : facility.type === 'shop' ? <ShoppingBag size={32} /> : <Info size={32} />}
                  </div>
                  <div>
                    <h4 className="font-black text-white font-display text-3xl leading-none uppercase tracking-tighter group-hover:italic transition-all">{facility.name}</h4>
                    <div className="flex items-center gap-3 mt-4">
                       <Star size={16} className="text-amber-400 fill-amber-400" />
                       <span className="text-sm font-black text-white tracking-widest">{facility.rating}</span>
                       <span className="text-slate-700 mx-1">•</span>
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">{facility.type}</span>
                    </div>
                  </div>
                </div>
                <div className={cn("px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-500", getStatusBadge(facility.status))}>
                   {facility.status}
                </div>
              </div>

              <p className="text-base text-slate-400 font-bold mb-10 leading-relaxed uppercase tracking-widest opacity-80 line-clamp-2">
                {facility.desc}
              </p>

              <div className="mt-auto pt-10 border-t border-white/5 grid grid-cols-2 gap-8">
                 <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-brand-secondary transition-colors shadow-lg">
                       <Clock size={24} />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Live Wait</div>
                       <div className="text-xl font-black text-white font-display tabular-nums tracking-tighter">{facility.wait} MIN</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-brand-secondary transition-colors shadow-lg">
                       <Users size={24} />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Density</div>
                       <div className="text-xl font-black text-white font-display tracking-tighter uppercase italic">{facility.occupancy}</div>
                    </div>
                 </div>
              </div>

              <div className="mt-10">
                 <button className="w-full h-16 bg-white/5 border border-white/10 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl backdrop-blur-md">
                    View Interactive Menu <ChevronRight size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
