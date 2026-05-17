import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import AnimatedBackground from './components/ui/AnimatedBackground';
import CommandPalette from './components/ui/CommandPalette';
import NotificationPanel from './components/ui/NotificationPanel';
import AIDock from './components/ui/AIDock';

import Dashboard from './pages/Dashboard';
import CRMPipeline from './pages/CRMPipeline';
import MarketIntelligence from './pages/MarketIntelligence';
import Investor from './pages/Investor';
import AnalyticsLab from './pages/AnalyticsLab';
import AICommandCenter from './pages/AICommandCenter';

const pageTitles: Record<string, string> = {
  '/': 'Command Center',
  '/crm': 'CRM Pipeline',
  '/market': 'Market Intelligence',
  '/investor': 'Investor Relations',
  '/analytics': 'Analytics Lab',
  '/ai-center': 'AI Command Center',
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crm" element={<CRMPipeline />} />
          <Route path="/market" element={<MarketIntelligence />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/analytics" element={<AnalyticsLab />} />
          <Route path="/ai-center" element={<AICommandCenter />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || 'NeuralX';

  // Global keyboard shortcut for command palette
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setCommandPaletteOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex h-screen w-screen overflow-hidden animated-gradient-bg">
      <AnimatedBackground />
      <div className="neuralx-grid-bg fixed inset-0 pointer-events-none z-0" />

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <TopBar
          onCommandPalette={() => setCommandPaletteOpen(true)}
          onNotifications={() => setNotificationsOpen(true)}
          pageTitle={pageTitle}
        />
        <main className="flex-1 overflow-hidden">
          <AnimatedRoutes />
        </main>
      </div>

      {/* Global Overlays */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <NotificationPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <AIDock />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
