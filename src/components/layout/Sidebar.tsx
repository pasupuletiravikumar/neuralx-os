import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Shield,
  TrendingUp,
  Brain,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Database,
  Server
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ActivePage } from '../../context/AppContext';

export default function Sidebar() {
  const { activePage, setActivePage } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: 'dashboard' as ActivePage, label: 'Executive Dashboard', icon: Compass, glow: 'text-accent-cyan bg-accent-cyan/10' },
    { key: 'competitors' as ActivePage, label: 'Competitor Workspace', icon: Shield, glow: 'text-accent-violet bg-accent-violet/10' },
    { key: 'trends' as ActivePage, label: 'Market Trends Terminal', icon: TrendingUp, glow: 'text-accent-emerald bg-accent-emerald/10' },
    { key: 'strategy' as ActivePage, label: 'AI Strategy Engine', icon: Brain, glow: 'text-accent-amber bg-accent-amber/10' },
    { key: 'lab' as ActivePage, label: 'Analytics Lab', icon: Cpu, glow: 'text-accent-rose bg-accent-rose/10' }
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-full border-r border-white/[0.04] bg-bg-surface/50 backdrop-blur-xl flex flex-col justify-between relative select-none shrink-0"
    >
      {/* Upper links */}
      <div className="flex-1 flex flex-col pt-6 overflow-x-hidden">
        {/* Toggle Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-bg-elevated border border-white/[0.08] hover:border-accent-cyan/40 text-text-secondary hover:text-accent-cyan flex items-center justify-center transition-all z-40 shadow-lg"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Diagnostic server grid (hidden when collapsed) */}
        {!collapsed && (
          <div className="px-5 mb-6">
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Market Databases
                </span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-text-muted">
                <span>PLTR FOUNDRY</span>
                <span className="text-accent-emerald font-semibold">SYNCED</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-text-muted">
                <span>LOOKER API</span>
                <span className="text-accent-emerald font-semibold">SYNCED</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-text-muted">
                <span>DOMO CONNECTOR</span>
                <span className="text-accent-amber font-semibold">STAGNANT</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed short logo */}
        {collapsed && (
          <div className="flex justify-center mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center shadow-lg font-black text-xs">
              M
            </div>
          </div>
        )}

        {/* Navigation Menu Links */}
        <nav className="flex-1 px-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all duration-200 group relative ${
                  isActive
                    ? 'text-text-primary bg-white/[0.04] border border-white/[0.08] shadow-inner'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? item.glow : 'bg-white/[0.02] group-hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? '' : 'text-text-secondary group-hover:text-text-primary'}`} />
                </div>

                {!collapsed && <span className="truncate">{item.label}</span>}

                {/* Left Active border bar indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeSideBarTab"
                    className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded bg-accent-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Diagnostic Panel */}
      <div className="p-3">
        {!collapsed ? (
          <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                Operational Node
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-text-muted">
              <div className="flex flex-col p-1.5 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                <span className="text-[6px] uppercase text-text-muted">Latency</span>
                <span className="font-bold text-accent-cyan mt-0.5">14 ms</span>
              </div>
              <div className="flex flex-col p-1.5 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                <span className="text-[6px] uppercase text-text-muted">Security</span>
                <span className="font-bold text-accent-emerald mt-0.5">SOC-2</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-text-muted hover:text-accent-cyan cursor-pointer transition-colors">
            <Server className="w-4 h-4 animate-pulse" />
          </div>
        )}
      </div>
    </motion.aside>
  );
}
