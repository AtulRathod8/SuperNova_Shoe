
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';
import { getStyleAdvice } from '../services/geminiService';
import { Message } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Supernova! I'm your cosmic style assistant. Looking for specific performance features or just want to upgrade your street style?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMsg];
    const response = await getStyleAdvice(history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/20 flex items-center gap-2 transition-all group overflow-hidden"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 overflow-hidden whitespace-nowrap">Style Assistant</span>
        </button>
      ) : (
        <div className="bg-gray-950 border border-white/10 w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-200">
          <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="font-bold">Supernova Consultant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-500' : 'bg-gray-800 border border-white/10'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-indigo-400" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-900 text-gray-200 rounded-tl-none border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 border border-white/5 p-3 rounded-2xl rounded-tl-none animate-pulse flex gap-1 items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for style advice..."
              className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
