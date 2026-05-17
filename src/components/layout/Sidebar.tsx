import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Kanban, TrendingUp, Presentation, FlaskConical, Brain,
  ChevronLeft, ChevronRight, Zap, Activity, Cpu
} from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/crm', icon: Kanban, label: 'CRM Pipeline' },
  { to: '/market', icon: TrendingUp, label: 'Market Intel' },
  { to: '/investor', icon: Presentation, label: 'Investor' },
  { to: '/analytics', icon: FlaskConical, label: 'Analytics Lab' },
  { to: '/ai-center', icon: Brain, label: 'AI Center' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-screen bg-bg-surface/50 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col relative z-40 shrink-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="text-sm font-bold tracking-wide text-gradient-cyan">NeuralX</div>
                <div className="text-[10px] text-text-secondary tracking-widest uppercase">Intelligence OS</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
              ${isActive
                ? 'bg-accent-cyan/10 text-accent-cyan'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-cyan rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]' : ''}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 px-1"
            >
              <div className="flex items-center justify-between">
                <StatusIndicator status="active" label="Systems Online" />
                <Activity className="w-3 h-3 text-accent-emerald" />
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="processing" label="Neural Engine" />
                <Cpu className="w-3 h-3 text-accent-cyan" />
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-1.5 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                />
              </div>
              <p className="text-[10px] text-text-muted">Neural Load: 78%</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-bg-elevated border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-cyan/30 transition-all z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
