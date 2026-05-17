import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Shield, TrendingUp, Cpu, X, Brain } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ActivePage } from '../../context/AppContext';
import { competitors, marketTrends, strategicRecommendations } from '../../data/mockData';

export default function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setActivePage,
    setSelectedCompetitorId
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  // Filter items based on query
  const navigationItems = [
    { label: 'Go to Executive Dashboard', page: 'dashboard' as ActivePage, category: 'Navigation', icon: Compass },
    { label: 'Go to Competitor Workspace', page: 'competitors' as ActivePage, category: 'Navigation', icon: Shield },
    { label: 'Go to Market Trends Terminal', page: 'trends' as ActivePage, category: 'Navigation', icon: TrendingUp },
    { label: 'Go to AI Strategy Engine', page: 'strategy' as ActivePage, category: 'Navigation', icon: Brain },
    { label: 'Go to Analytics Lab', page: 'lab' as ActivePage, category: 'Navigation', icon: Cpu }
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const competitorItems = competitors
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .map((c) => ({
      label: `Analyze competitor: ${c.name} (${c.marketShare}% Share)`,
      action: () => {
        setSelectedCompetitorId(c.id);
        setActivePage('competitors');
        setCommandPaletteOpen(false);
      },
      category: 'Competitors',
      icon: Shield
    }));

  const trendItems = marketTrends
    .filter((t) => t.sector.toLowerCase().includes(query.toLowerCase()))
    .map((t) => ({
      label: `Inspect trend: ${t.sector} (${t.growthRate}% YoY Growth)`,
      action: () => {
        setActivePage('trends');
        setCommandPaletteOpen(false);
      },
      category: 'Trends',
      icon: TrendingUp
    }));

  const recommendationItems = strategicRecommendations
    .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    .map((r) => ({
      label: `View intelligence recommendation: ${r.title}`,
      action: () => {
        setActivePage('strategy');
        setCommandPaletteOpen(false);
      },
      category: 'AI Strategy',
      icon: Brain
    }));

  const allFiltered = [
    ...navigationItems.map((item) => ({
      label: item.label,
      action: () => {
        setActivePage(item.page);
        setCommandPaletteOpen(false);
      },
      category: item.category,
      icon: item.icon
    })),
    ...competitorItems,
    ...trendItems,
    ...recommendationItems
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-bg-surface border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden glow-cyan"
        >
          {/* Header query bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
            <Search className="w-5 h-5 text-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search workspaces, competitors, market trends, or AI suggestions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder-text-muted"
            />
            <kbd className="text-[10px] text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] font-mono">
              ESC
            </kbd>
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-2">
            {allFiltered.length > 0 ? (
              Object.entries(
                allFiltered.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {} as Record<string, typeof allFiltered>)
              ).map(([category, items]) => (
                <div key={category} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {category}
                  </div>
                  {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.03] transition-all group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-white/[0.04] group-hover:bg-accent-cyan/10 flex items-center justify-center transition-colors">
                          <IconComponent className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent-cyan transition-colors" />
                        </div>
                        <span className="flex-1 truncate">{item.label}</span>
                        <kbd className="hidden group-hover:inline-block text-[9px] text-text-muted bg-white/[0.06] px-1 rounded font-mono">
                          Enter
                        </kbd>
                      </button>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-text-muted">
                No intelligence metrics found for "{query}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
