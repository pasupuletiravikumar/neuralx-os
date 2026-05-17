import { Search, Bell, Sparkles, Settings, User } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';

interface TopBarProps {
  onCommandPalette: () => void;
  onNotifications: () => void;
  pageTitle: string;
}

export default function TopBar({ onCommandPalette, onNotifications, pageTitle }: TopBarProps) {
  return (
    <header className="h-14 bg-bg-surface/30 backdrop-blur-xl border-b border-white/[0.04] flex items-center justify-between px-5 shrink-0 z-30">
      {/* Left — Page Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold text-text-primary tracking-wide">{pageTitle}</h1>
        <StatusIndicator status="active" label="Live" size="sm" />
      </div>

      {/* Center — Command Bar */}
      <button
        onClick={onCommandPalette}
        className="hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 hover:border-accent-cyan/20 transition-all group min-w-[320px]"
      >
        <Search className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
        <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors flex-1 text-left">Search commands, deals, insights...</span>
        <div className="flex items-center gap-1">
          <kbd className="text-[10px] text-text-muted bg-white/[0.06] rounded px-1.5 py-0.5 font-mono">⌘</kbd>
          <kbd className="text-[10px] text-text-muted bg-white/[0.06] rounded px-1.5 py-0.5 font-mono">K</kbd>
        </div>
      </button>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:bg-white/[0.04] transition-all">
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={onNotifications}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:bg-white/[0.04] transition-all relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:bg-white/[0.04] transition-all">
          <Settings className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-white/[0.06] mx-1" />
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-white/[0.08] flex items-center justify-center text-text-primary hover:border-accent-cyan/30 transition-all">
          <User className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
