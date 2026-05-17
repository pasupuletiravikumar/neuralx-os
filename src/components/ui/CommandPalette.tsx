import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, LayoutDashboard, Kanban, TrendingUp, Presentation,
  FlaskConical, Brain, Plus, Download, Sparkles, Users, Settings, Moon, ArrowRight
} from 'lucide-react';
import { commandPaletteActions } from '../../data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Kanban, TrendingUp, PresentationIcon: Presentation,
  FlaskConical, Brain, Search, Plus, Download, Sparkles, Users, Settings, Moon,
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = commandPaletteActions.filter(
    (a) => a.label.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof commandPaletteActions>);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // toggle handled in parent
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelect = (action: typeof commandPaletteActions[0]) => {
    if (action.id.startsWith('nav-')) {
      const routes: Record<string, string> = {
        'nav-dashboard': '/',
        'nav-crm': '/crm',
        'nav-market': '/market',
        'nav-investor': '/investor',
        'nav-analytics': '/analytics',
        'nav-ai': '/ai-center',
      };
      navigate(routes[action.id] || '/');
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[560px] max-w-[90vw] bg-bg-elevated/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
              />
              <kbd className="text-[10px] text-text-muted bg-white/[0.06] rounded px-1.5 py-0.5 font-mono">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-1.5">
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{category}</span>
                  </div>
                  {items.map((action) => {
                    const Icon = iconMap[action.icon] || ArrowRight;
                    const globalIndex = filtered.indexOf(action);
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleSelect(action)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          globalIndex === selectedIndex
                            ? 'bg-accent-cyan/10 text-accent-cyan'
                            : 'text-text-secondary hover:bg-white/[0.03]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm flex-1">{action.label}</span>
                        {action.shortcut && (
                          <span className="text-[10px] text-text-muted font-mono">{action.shortcut}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-text-muted">No results found</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
