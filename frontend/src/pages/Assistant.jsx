import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, User, Mic, Paperclip, Loader2, Sparkles, ChevronDown, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Assistant() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi Alex! Welcome to the SmartVenue Hub. I am your personal AI guide today. How can I help you enjoy the match?', timestamp: '08:42 PM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      type: 'user', 
      text: inputValue, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.text })
      });
      const data = await response.json();
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'bot',
          text: data.response || "I am processing that right now. One moment.",
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }, 1000);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: "My apologies, Alex. I encountered a network sync issue. Could you repeat that?",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isError: true
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickPrompts = [
    { label: "Find my seat", icon: "🎟️" },
    { label: "Order burger", icon: "🍔" },
    { label: "Fastest exit", icon: "🏃" },
    { label: "Match stats", icon: "📊" }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] bg-slate-950 relative overflow-hidden iridescent-bg">
      
      {/* Premium Header */}
      <div className="bg-slate-900/40 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between z-20 shrink-0">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-secondary to-blue-500 flex items-center justify-center shadow-lg shadow-brand-secondary/20 animate-float">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
               <h2 className="font-black text-white font-display text-lg leading-none">Smart Guide AI</h2>
               <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powered by NeuralVenue</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all">
               Clear Chat <ChevronDown size={14} />
            </button>
         </div>
      </div>

      {/* Chat Space */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar relative z-10">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.type === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn("flex gap-4 max-w-[85%] md:max-w-[65%]", msg.type === 'user' ? "flex-row-reverse" : "flex-row")}>
              
              <div className="shrink-0 mt-auto mb-1">
                {msg.type === 'user' ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-secondary/30 shadow-md">
                     <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="Alex" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-md">
                     <Sparkles className="w-4 h-4 text-brand-secondary" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className={cn(
                  "p-5 rounded-3xl text-sm leading-relaxed shadow-2xl backdrop-blur-xl border transition-all",
                  msg.type === 'user' 
                    ? "bg-brand-secondary text-white border-brand-secondary/20 rounded-br-sm" 
                    : msg.isError 
                      ? "bg-red-500/10 border-red-500/20 text-red-200 rounded-bl-sm"
                      : "bg-white/5 border-white/10 text-slate-100 rounded-bl-sm"
                )}>
                  {msg.text}
                </div>
                <span className={cn("text-[9px] font-black text-slate-500 uppercase tracking-widest px-1", msg.type === 'user' ? "text-right" : "text-left")}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="flex gap-4 max-w-[80%] flex-row">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex shrink-0 items-center justify-center shadow-md mt-auto mb-1">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-bl-sm shadow-2xl backdrop-blur-xl flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Interaction Bar */}
      <div className="p-6 md:p-8 bg-slate-900/40 backdrop-blur-3xl border-t border-white/5 shrink-0 pb-safe z-20">
        
        {/* Chips */}
        <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-1 no-scrollbar">
           {quickPrompts.map((prompt, idx) => (
             <button 
               key={idx}
               onClick={() => { setInputValue(prompt.label); }}
               className="whitespace-nowrap px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary hover:shadow-lg hover:shadow-brand-secondary/20 transition-all duration-300 flex items-center gap-2"
             >
               <span>{prompt.icon}</span> {prompt.label}
             </button>
           ))}
        </div>

        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0 flex items-center justify-center shadow-sm">
             <Plus size={20} />
          </button>
          
          <div className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] flex items-center pr-2 focus-within:ring-4 focus-within:ring-brand-secondary/10 focus-within:border-brand-secondary/40 focus-within:bg-white/10 transition-all duration-500 shadow-inner relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Alex's Smart Guide..."
              className="flex-1 bg-transparent py-5 px-8 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            {inputValue.trim() ? (
              <button 
                onClick={handleSend}
                className="w-12 h-12 rounded-full bg-brand-secondary text-white flex items-center justify-center hover:bg-brand-secondary/80 transition-all duration-300 shadow-xl shadow-brand-secondary/20 shrink-0 transform active:scale-95"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            ) : (
               <button className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all shrink-0">
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
