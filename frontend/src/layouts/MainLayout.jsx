import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { cn } from '../utils/cn';

// Safety wrapper for icons
const SafeIcon = ({ iconName, ...props }) => {
  const Icon = Lucide[iconName];
  if (!Icon) return <div className="w-5 h-5 bg-slate-200 rounded" />;
  return <Icon {...props} />;
};

const navItems = [
  { path: '/', icon: 'Map', label: 'Venue Map' },
  { path: '/dashboard', icon: 'LayoutGrid', label: 'Live Insights' },
  { path: '/queues', icon: 'Search', label: 'Food & Wait Times' },
  { path: '/community', icon: 'Users', label: 'Community Hub' },
  { path: '/assistant', icon: 'MessageSquare', label: 'Smart Guide', special: true },
];

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 shadow-2xl z-50">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-secondary rounded-xl flex items-center justify-center shadow-lg shadow-brand-secondary/20">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-display">
              Smart<span className="text-brand-secondary">Venue</span>
            </h1>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-3xl mb-8 flex items-center gap-3 group hover:bg-white/10 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-brand-secondary/30 shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="Alex" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate">Alex Henderson</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sec 112 • Row G</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                isActive 
                  ? "nav-link-active" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <SafeIcon iconName={item.icon} size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-5 relative overflow-hidden group border border-white/5">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
               <Lucide.Zap size={80} className="text-brand-secondary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-secondary font-bold text-[10px] uppercase tracking-widest mb-1">
                Live Event
              </div>
              <p className="text-white text-xs font-medium leading-relaxed">Halftime show starts in 12:45.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Live Q3</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all neon-border-pulse">
               <Lucide.AlertTriangle size={14} /> SOS Help
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><SafeIcon iconName="Search" size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
               <SafeIcon iconName="Bell" size={20} />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden ml-2">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="User" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-950 relative z-10 custom-scrollbar pb-24 lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
          <nav className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] h-16 flex justify-around items-center px-4 shadow-2xl">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-12 h-12 transition-all rounded-full",
                  isActive ? "bg-white/10 text-brand-secondary scale-110 shadow-inner" : "text-slate-500"
                )}
              >
                <SafeIcon iconName={item.icon} size={20} strokeWidth={2} />
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
