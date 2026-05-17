import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import CompetitorWorkspace from './pages/CompetitorWorkspace';
import MarketTrendsTerminal from './pages/MarketTrendsTerminal';
import AISecStrategyEngine from './pages/AISecStrategyEngine';
import AnalyticsLab from './pages/AnalyticsLab';
import CommandPalette from './components/ui/CommandPalette';
import NotificationPanel from './components/ui/NotificationPanel';
import AICopilot from './components/ui/AICopilot';

function AppContent() {
  const { activePage } = useApp();

  return (
    <div className="w-full h-full flex flex-col relative bg-bg-primary overflow-hidden">
      {/* Visual Canvas Effects */}
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute inset-0 radial-pulse-overlay pointer-events-none z-0" />

      {/* Main Top Header Ticker + Navigation */}
      <TopBar />

      {/* Body Area */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Left collapsible Sidebar */}
        <Sidebar />

        {/* Dynamic page content container */}
        <main className="flex-1 min-w-0 h-full relative bg-black/10 backdrop-blur-sm">
          {activePage === 'dashboard' && <ExecutiveDashboard />}
          {activePage === 'competitors' && <CompetitorWorkspace />}
          {activePage === 'trends' && <MarketTrendsTerminal />}
          {activePage === 'strategy' && <AISecStrategyEngine />}
          {activePage === 'lab' && <AnalyticsLab />}
        </main>
      </div>

      {/* Futuristic Floating Overlays */}
      <CommandPalette />
      <NotificationPanel />
      <AICopilot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
