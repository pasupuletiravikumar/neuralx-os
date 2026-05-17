import { Search, Bell, Sparkles, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { tickerFeed } from '../../data/mockData';

export default function TopBar() {
  const { setCommandPaletteOpen, setNotificationsOpen, setCopilotOpen, alerts } = useApp();
  const unreadAlertsCount = alerts.filter((a) => a.status === 'new').length;

  return (
    <header className="h-16 border-b border-white/[0.04] bg-bg-surface/30 backdrop-blur-xl flex flex-col justify-between z-30 shrink-0 select-none">
      {/* Top row: live Bloomberg-style ticket */}
      <div className="h-6 bg-black/40 border-b border-white/[0.03] flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker py-0.5">
          {[...tickerFeed, ...tickerFeed].map((ticker, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-6 border-r border-white/[0.04] text-[10px] font-mono tracking-wider"
            >
              <span className="text-text-secondary font-semibold">{ticker.symbol}</span>
              <span className="text-text-primary">{ticker.price}</span>
              <span
                className={`inline-flex items-center gap-0.5 font-bold ${
                  ticker.up ? 'text-accent-emerald' : 'text-accent-rose'
                }`}
              >
                {ticker.up ? (
                  <ArrowUpRight className="w-2.5 h-2.5" />
                ) : (
                  <ArrowDownRight className="w-2.5 h-2.5" />
                )}
                {ticker.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Page Title, Search & Global Actions */}
      <div className="flex-1 flex items-center justify-between px-6">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
            <span className="text-xs font-black text-white tracking-tighter">MP</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
            MarketPulse AI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-[9px] font-mono text-accent-cyan bg-accent-cyan/10 px-1.5 py-0.5 rounded border border-accent-cyan/20">
            SYSTEM ACTIVE
          </span>
        </div>

        {/* Center Search bar */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-1.5 hover:border-accent-cyan/30 hover:bg-white/[0.04] transition-all group min-w-[340px]"
        >
          <Search className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
          <span className="text-left text-xs text-text-muted group-hover:text-text-secondary flex-1">
            Search competitors, trends, or AI forecasts...
          </span>
          <div className="flex items-center gap-1 font-mono text-[9px] text-text-muted">
            <kbd className="bg-white/[0.06] px-1 py-0.5 rounded border border-white/[0.06]">⌘</kbd>
            <kbd className="bg-white/[0.06] px-1 py-0.5 rounded border border-white/[0.06]">K</kbd>
          </div>
        </button>

        {/* Right side global actions */}
        <div className="flex items-center gap-2">
          {/* AI Copilot toggle button */}
          <button
            onClick={() => setCopilotOpen(true)}
            className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-cyan/20 hover:bg-accent-cyan/10 text-text-secondary hover:text-accent-cyan flex items-center justify-center transition-all group"
            title="Ask AI Intelligence Copilot"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          {/* Notifications alert center */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-violet/20 hover:bg-accent-violet/10 text-text-secondary hover:text-accent-violet flex items-center justify-center transition-all relative group"
            title="Operational Alerts System"
          >
            <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-rose animate-pulse" />
            )}
          </button>

          {/* Metrics ticker toggle link */}
          <button
            className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-accent-emerald hover:bg-white/[0.04] flex items-center justify-center transition-all"
            title="Diagnostics"
          >
            <Activity className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-white/[0.08] mx-2" />

          {/* User badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-white/[0.08] flex items-center justify-center font-bold text-xs text-text-primary">
              MP
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] font-semibold text-text-primary leading-tight">Admin Principal</span>
              <span className="text-[8px] font-mono text-text-muted leading-none">Corp Dev Strategy</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
