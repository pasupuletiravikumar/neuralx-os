import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Zap } from 'lucide-react';

const suggestions = [
  'Analyze pipeline health',
  'Show churn risk report',
  'Generate competitor brief',
  'Forecast Q2 revenue',
];

const aiResponses = [
  "Based on current pipeline velocity, Q2 revenue is projected at $8.4M — 12% above target. Key drivers: Anthropic ($2.4M, 85% probability) and Vercel ($2.1M, 80% probability).",
  "Pipeline health score: 87/100. 3 deals showing stagnation in proposal stage for 7+ days. Recommend immediate follow-up on Figma and Planetscale opportunities.",
  "Churn risk analysis complete: 2 accounts flagged. DataBricks (engagement -23%) and Domo (support tickets +340%). Recommended action: Executive outreach within 48 hours.",
];

export default function AIDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center shadow-lg shadow-accent-cyan/20 z-[80] group"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white group-hover:animate-spin" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-5 w-[380px] max-w-[calc(100vw-40px)] h-[480px] bg-bg-elevated/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl z-[80] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent-cyan" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">NeuralX AI Copilot</p>
                <p className="text-[10px] text-accent-emerald">Online — Ready</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Sparkles className="w-8 h-8 text-accent-cyan/30 mx-auto mb-3" />
                  <p className="text-xs text-text-muted mb-4">How can I help you today?</p>
                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="w-full text-left text-[11px] text-text-secondary bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 hover:bg-white/[0.06] hover:border-accent-cyan/20 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent-cyan/15 text-accent-cyan rounded-br-md'
                      : 'bg-white/[0.04] text-text-primary border border-white/[0.06] rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1.5 px-3 py-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask NeuralX AI..."
                  className="flex-1 bg-transparent text-xs text-text-primary placeholder-text-muted outline-none"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="w-7 h-7 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
