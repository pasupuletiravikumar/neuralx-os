import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { systemAlerts, competitors, strategicRecommendations } from '../data/mockData';
import type { StrategicRecommendation } from '../data/mockData';

export type ActivePage = 'dashboard' | 'competitors' | 'trends' | 'strategy' | 'lab';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  alerts: typeof systemAlerts;
  setAlerts: React.Dispatch<React.SetStateAction<typeof systemAlerts>>;
  chatHistory: ChatMessage[];
  sendChatMessage: (text: string) => void;
  selectedCompetitorId: string | null;
  setSelectedCompetitorId: (id: string | null) => void;
  activeRecommendations: StrategicRecommendation[];
  setActiveRecommendations: React.Dispatch<React.SetStateAction<StrategicRecommendation[]>>;
  simParameters: { cacReduction: number; cagrShift: number; retentionGain: number };
  setSimParameters: React.Dispatch<React.SetStateAction<{ cacReduction: number; cagrShift: number; retentionGain: number }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [alerts, setAlerts] = useState(systemAlerts);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | null>(competitors[0].id);
  const [activeRecommendations, setActiveRecommendations] = useState<StrategicRecommendation[]>(strategicRecommendations);
  const [simParameters, setSimParameters] = useState({
    cacReduction: -20,
    cagrShift: 15,
    retentionGain: 8
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "MarketPulse AI operational core initialized. I can synthesize competitor funnels, simulate CAGR shifts, or analyze ThoughtSpot/Domo acquisition probabilities. How can I assist your strategy session today?",
      timestamp: '1 min ago'
    }
  ]);

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setChatHistory((prev) => [...prev, newMsg]);

    // Simulate intelligent enterprise response
    setTimeout(() => {
      let aiText = "Analyzing market databases for specific strategic correlations...";
      const query = text.toLowerCase();

      if (query.includes('palantir') || query.includes('competitor')) {
        aiText = "Based on our current database, Palantir Foundry dominates B2B with 32.4% market share. However, their CAC is $45,000, creating an opportunity for a Gemini-powered lightweight BI product focused on the mid-market.";
      } else if (query.includes('pricing') || query.includes('revenue') || query.includes('cagr')) {
        aiText = `Simulating CAGR with your current parameters shows an expansion probability of 88% if you reduce client onboarding friction by 20%. The projected corporate ARR would lift by $4.8M.`;
      } else if (query.includes('acquisition') || query.includes('domo')) {
        aiText = "Domo Inc currently presents a high acquisition probability (60%) due to its stagnating growth rate (8.4% CAGR). Acquiring them provides instant access to their 1000+ third-party operational pipelines.";
      } else if (query.includes('trend') || query.includes('generative')) {
        aiText = "Generative AI Analytics represents our highest growth sector, pacing at a staggering 340.5% YoY with APAC showing the strongest regional demand spike (+420%). We suggest fast-tracking the region-wise strategy.";
      } else {
        aiText = `Your search query "${text}" matches active intelligence indexes. I suggest reviewing the Competitor Analysis Workspace or running a predictive modeling session in the Analytics Lab.`;
      }

      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          timestamp: 'Just now'
        }
      ]);
    }, 850);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        searchQuery,
        setSearchQuery,
        commandPaletteOpen,
        setCommandPaletteOpen,
        copilotOpen,
        setCopilotOpen,
        notificationsOpen,
        setNotificationsOpen,
        alerts,
        setAlerts,
        chatHistory,
        sendChatMessage,
        selectedCompetitorId,
        setSelectedCompetitorId,
        activeRecommendations,
        setActiveRecommendations,
        simParameters,
        setSimParameters
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
