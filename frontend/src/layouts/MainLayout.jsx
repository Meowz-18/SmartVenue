import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { cn } from '../utils/cn';
import logo from '../assets/logo.png';

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
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-100 font-sans">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#020617] border-r border-slate-800/60 z-50">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10">
            <img src={logo} alt="SmartVenue Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-bold tracking-tight">
              SmartVenue
            </h1>
          </div>

          <div className="p-3 bg-slate-900/50 rounded-2xl mb-8 flex items-center gap-4 group hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="Alex" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-slate-200 truncate">Alex Henderson</div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide">SysAdmin • Node 4</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Platform</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-slate-800/50 text-white shadow-sm" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <SafeIcon iconName={item.icon} size={18} strokeWidth={1.5} className={item.special ? "text-brand-secondary" : ""} />
                <span>{item.label}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <div>
              <div className="text-slate-300 font-semibold text-xs mb-1">System Nominal</div>
              <p className="text-slate-500 text-[10px] leading-relaxed">All telemetry feeds active. Latency: 12ms</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#020617]">
        
        {/* Header */}
        <header className="h-20 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 lg:px-12 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
               <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Event Phase:</span>
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Q3 Live</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-lg text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-colors">
               <Lucide.AlertTriangle size={14} /> Priority Override
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <button className="text-slate-400 hover:text-white transition-colors"><SafeIcon iconName="Search" size={18} strokeWidth={1.5} /></button>
            <button className="text-slate-400 hover:text-white transition-colors relative">
               <SafeIcon iconName="Bell" size={18} strokeWidth={1.5} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-secondary rounded-full border border-[#020617]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden ml-2 cursor-pointer hover:ring-2 hover:ring-slate-700 transition-all">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="User" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pb-24 lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
          <nav className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl h-16 flex justify-around items-center px-2 shadow-2xl">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-12 h-12 transition-all rounded-2xl",
                  isActive ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {({ isActive }) => (
                  <SafeIcon iconName={item.icon} size={20} strokeWidth={isActive ? 2 : 1.5} />
                )}
              </NavLink>
            ))}

          </nav>
        </div>
      </div>
    </div>
  );
}
