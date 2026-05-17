import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Brain, Cpu, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AICopilot() {
  const { copilotOpen, setCopilotOpen, chatHistory, sendChatMessage } = useApp();
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Explain Palantir SWOT profile',
    'Domo acquisition probability check',
    'Generative AI CAGR projections',
    'ThoughtSpot competitive positioning'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  if (!copilotOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setCopilotOpen(false)}>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-bg-surface border-l border-white/[0.08] shadow-2xl p-6 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center text-white glow-cyan">
                <Brain className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Intelligence Copilot
                </h3>
                <p className="text-[9px] text-text-muted mt-0.5">
                  Strategic decision engine active
                </p>
              </div>
            </div>
            <button
              onClick={() => setCopilotOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {chatHistory.map((msg, idx) => {
              const isAI = msg.sender === 'ai';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
                >
                  {isAI && (
                    <div className="w-6 h-6 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0 mt-0.5">
                      <Cpu className="w-3 h-3" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm border ${
                      isAI
                        ? 'bg-bg-elevated/50 text-text-primary border-white/[0.04]'
                        : 'bg-gradient-to-br from-accent-cyan to-accent-violet text-white border-white/[0.08]'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[7px] text-text-muted mt-1.5 text-right uppercase tracking-wider font-mono">
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions and Input Box */}
          <div className="border-t border-white/[0.06] pt-4 shrink-0 space-y-4">
            {/* Quick Action Suggestions */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1">
                <MessageSquare className="w-2.5 h-2.5" /> Quick Query Shortcuts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      sendChatMessage(suggestion);
                    }}
                    className="text-[9px] font-medium text-text-secondary bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-1 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Copilot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-xs text-text-primary outline-none focus:border-accent-cyan/40 transition-all placeholder-text-muted"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet hover:from-accent-cyan/95 hover:to-accent-violet/95 flex items-center justify-center text-white glow-cyan transition-all shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
