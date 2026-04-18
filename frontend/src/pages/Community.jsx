import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, AlertCircle, Plus, Filter, Search, User, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Sarah M.',
      location: 'Section 112',
      content: 'Just a heads up, the restroom queue in Section 112 is moving super fast! 🏃‍♀️',
      likes: 12,
      time: '2m ago',
      type: 'tip',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 2,
      user: 'Jason R.',
      location: 'Gate B',
      content: 'Anyone seen a black wallet near Gate B? I think I dropped it during the rush. 😟',
      likes: 5,
      time: '15m ago',
      type: 'help',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 3,
      user: 'Venue Admin',
      location: 'All Sectors',
      content: 'Halftime show is about to start! Make sure you\'re in your seats for a special surprise light show. 🎆',
      likes: 156,
      time: '10m ago',
      type: 'official',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPosts = posts.filter(post => 
    activeFilter === 'all' ? true : post.type === activeFilter
  );

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto w-full flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black font-display text-white tracking-tight leading-none">Community Hub</h2>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-3">Connect with fellow attendees</p>
        </div>
        <button className="h-14 px-8 bg-brand-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-secondary/80 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-secondary/20 active:scale-95">
          <Plus size={18} /> New Update
        </button>
      </div>

      {/* Stats / Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="premium-card p-8 iridescent-bg border-none group cursor-pointer overflow-hidden relative">
          <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
             <AlertCircle size={160} className="text-white" />
          </div>
          <div className="relative z-10 text-white">
            <h3 className="font-black text-2xl font-display">Lost Something?</h3>
            <p className="text-slate-100/80 text-sm mt-2 font-medium max-w-[200px] leading-relaxed">Report lost items and we'll notify you if found.</p>
            <button className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20">Report Lost Item</button>
          </div>
        </div>
        <div className="premium-card p-8 bg-slate-900 border border-white/5 group cursor-pointer overflow-hidden relative">
           <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
             <Heart size={160} className="text-brand-secondary" />
          </div>
          <div className="relative z-10">
            <h3 className="font-black text-2xl font-display text-white">Medical & Support</h3>
            <p className="text-slate-400 text-sm mt-2 font-medium max-w-[200px] leading-relaxed">Need non-emergency medical or general support?</p>
            <button className="mt-6 px-6 py-3 bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 hover:bg-brand-secondary hover:text-white backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Request Support</button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'tip', 'help', 'official'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0",
              activeFilter === filter 
                ? "bg-brand-secondary text-white border-brand-secondary shadow-lg shadow-brand-secondary/20" 
                : "bg-white/5 text-slate-400 border-white/10 hover:border-brand-secondary hover:text-white"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="premium-card p-8 hover:bg-white/[0.02] transition-all border border-white/5 group relative overflow-hidden">
            <div className={cn(
              "absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2",
              post.type === 'official' ? "bg-blue-500 shadow-[4px_0_12px_rgba(59,130,246,0.5)]" : 
              post.type === 'help' ? "bg-red-500 shadow-[4px_0_12px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[4px_0_12px_rgba(16,185,129,0.5)]"
            )} />
            
            <div className="flex gap-6">
              <div className="relative shrink-0">
                <img src={post.avatar} alt={post.user} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/5 shadow-2xl" />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center",
                  post.type === 'official' ? "bg-blue-500" : post.type === 'help' ? "bg-red-500" : "bg-emerald-500"
                )}>
                   <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-white text-base font-display">{post.user}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-secondary" /> {post.location}</span>
                       <span className="opacity-30">•</span>
                       <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-5 text-slate-300 text-sm leading-relaxed font-medium">
                  {post.content}
                </p>
                
                <div className="flex items-center gap-8 mt-8 pt-6 border-t border-white/5">
                  <button className="flex items-center gap-2.5 text-slate-500 hover:text-red-400 transition-all group/btn">
                    <Heart size={18} className="group-hover/btn:scale-110 group-hover/btn:fill-red-400 transition-all" />
                    <span className="text-xs font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-500 hover:text-brand-secondary transition-all group/btn">
                    <MessageSquare size={18} className="group-hover/btn:scale-110 transition-all" />
                    <span className="text-xs font-black">Reply</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-500 hover:text-white transition-all ml-auto">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
