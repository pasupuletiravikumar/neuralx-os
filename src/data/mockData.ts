// ============================================================
// NeuralX Intelligence OS — Mock Data
// ============================================================

export const kpiData = [
  { label: 'Annual Revenue', value: 24800000, prefix: '$', suffix: '', change: 18.4, trend: 'up' as const, sparkline: [18, 22, 19, 25, 23, 28, 31, 29, 34, 32, 38, 42] },
  { label: 'Monthly Recurring Revenue', value: 2120000, prefix: '$', suffix: '', change: 12.7, trend: 'up' as const, sparkline: [160, 170, 165, 175, 180, 185, 190, 195, 200, 205, 210, 212] },
  { label: 'Active Clients', value: 1847, prefix: '', suffix: '', change: 8.3, trend: 'up' as const, sparkline: [1200, 1280, 1350, 1420, 1500, 1560, 1620, 1680, 1720, 1780, 1810, 1847] },
  { label: 'Expansion Rate', value: 34.2, prefix: '', suffix: '%', change: 5.1, trend: 'up' as const, sparkline: [22, 24, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34.2] },
];

export const revenueChartData = [
  { month: 'Jan', revenue: 1800000, projected: 1750000, lastYear: 1400000 },
  { month: 'Feb', revenue: 1950000, projected: 1900000, lastYear: 1500000 },
  { month: 'Mar', revenue: 2100000, projected: 2050000, lastYear: 1620000 },
  { month: 'Apr', revenue: 2250000, projected: 2200000, lastYear: 1700000 },
  { month: 'May', revenue: 2400000, projected: 2380000, lastYear: 1850000 },
  { month: 'Jun', revenue: 2320000, projected: 2500000, lastYear: 1920000 },
  { month: 'Jul', revenue: 2550000, projected: 2620000, lastYear: 2000000 },
  { month: 'Aug', revenue: 2680000, projected: 2750000, lastYear: 2100000 },
  { month: 'Sep', revenue: 2800000, projected: 2880000, lastYear: 2180000 },
  { month: 'Oct', revenue: 2950000, projected: 3000000, lastYear: 2250000 },
  { month: 'Nov', revenue: 3100000, projected: 3150000, lastYear: 2350000 },
  { month: 'Dec', revenue: 3280000, projected: 3300000, lastYear: 2450000 },
];

export const activityFeed = [
  { id: 1, user: 'Sarah Chen', action: 'closed deal with', target: 'Stripe Inc.', value: '$2.4M', time: '2 min ago', avatar: 'SC', type: 'deal' as const },
  { id: 2, user: 'Marcus Webb', action: 'upgraded pipeline stage for', target: 'Notion Labs', value: '', time: '8 min ago', avatar: 'MW', type: 'pipeline' as const },
  { id: 3, user: 'AI Engine', action: 'detected expansion opportunity at', target: 'Vercel', value: '$840K', time: '15 min ago', avatar: 'AI', type: 'ai' as const },
  { id: 4, user: 'Priya Sharma', action: 'scheduled investor call with', target: 'a16z', value: '', time: '22 min ago', avatar: 'PS', type: 'meeting' as const },
  { id: 5, user: 'AI Engine', action: 'risk alert for', target: 'DataBricks renewal', value: '$1.8M', time: '34 min ago', avatar: 'AI', type: 'alert' as const },
  { id: 6, user: 'Jordan Lee', action: 'added 12 new leads from', target: 'Web Summit 2026', value: '', time: '1 hr ago', avatar: 'JL', type: 'lead' as const },
  { id: 7, user: 'AI Engine', action: 'market shift detected in', target: 'Enterprise AI Sector', value: '', time: '1.5 hr ago', avatar: 'AI', type: 'ai' as const },
  { id: 8, user: 'Aisha Patel', action: 'completed QBR for', target: 'Salesforce', value: '$3.2M', time: '2 hr ago', avatar: 'AP', type: 'deal' as const },
];

export const teamData = [
  { name: 'Sarah Chen', role: 'VP Sales', avatar: 'SC', progress: 94, deals: 18, revenue: 4200000 },
  { name: 'Marcus Webb', role: 'Sr. AE', avatar: 'MW', progress: 87, deals: 14, revenue: 3100000 },
  { name: 'Priya Sharma', role: 'BD Lead', avatar: 'PS', progress: 78, deals: 11, revenue: 2400000 },
  { name: 'Jordan Lee', role: 'SDR Manager', avatar: 'JL', progress: 92, deals: 22, revenue: 1800000 },
  { name: 'Aisha Patel', role: 'Enterprise AE', avatar: 'AP', progress: 85, deals: 9, revenue: 5100000 },
];

export const aiRecommendations = [
  { id: 1, title: 'Upsell Opportunity Detected', description: 'Stripe usage patterns suggest 40% expansion potential. Recommend scheduling QBR.', confidence: 94, impact: 'high' as const, value: '$960K' },
  { id: 2, title: 'Churn Risk: DataBricks', description: 'Engagement metrics dropped 23% in Q4. Competitor activity detected.', confidence: 87, impact: 'critical' as const, value: '$1.8M' },
  { id: 3, title: 'Market Entry Window', description: 'Southeast Asian fintech market showing 340% YoY growth. First-mover advantage available.', confidence: 78, impact: 'medium' as const, value: '$4.2M' },
];

// CRM Pipeline Data
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';

export interface Deal {
  id: string;
  company: string;
  value: number;
  contact: string;
  contactRole: string;
  score: number;
  stage: DealStage;
  probability: number;
  daysInStage: number;
  avatar: string;
  industry: string;
  nextAction: string;
}

export const pipelineDeals: Deal[] = [
  { id: 'd1', company: 'Anthropic', value: 2400000, contact: 'Dario Amodei', contactRole: 'CEO', score: 92, stage: 'negotiation', probability: 85, daysInStage: 4, avatar: 'AN', industry: 'AI/ML', nextAction: 'Final contract review' },
  { id: 'd2', company: 'Figma', value: 1800000, contact: 'Dylan Field', contactRole: 'CEO', score: 88, stage: 'proposal', probability: 70, daysInStage: 7, avatar: 'FG', industry: 'Design', nextAction: 'Send revised proposal' },
  { id: 'd3', company: 'Notion', value: 3200000, contact: 'Ivan Zhao', contactRole: 'CEO', score: 95, stage: 'closed', probability: 100, daysInStage: 1, avatar: 'NT', industry: 'Productivity', nextAction: 'Onboarding kickoff' },
  { id: 'd4', company: 'Linear', value: 960000, contact: 'Karri Saarinen', contactRole: 'CEO', score: 76, stage: 'qualified', probability: 45, daysInStage: 12, avatar: 'LN', industry: 'DevTools', nextAction: 'Technical deep-dive' },
  { id: 'd5', company: 'Vercel', value: 2100000, contact: 'Guillermo Rauch', contactRole: 'CEO', score: 90, stage: 'negotiation', probability: 80, daysInStage: 3, avatar: 'VC', industry: 'Infrastructure', nextAction: 'Pricing discussion' },
  { id: 'd6', company: 'Supabase', value: 780000, contact: 'Paul Copplestone', contactRole: 'CEO', score: 72, stage: 'lead', probability: 25, daysInStage: 5, avatar: 'SB', industry: 'Database', nextAction: 'Discovery call' },
  { id: 'd7', company: 'Planetscale', value: 1500000, contact: 'Sam Lambert', contactRole: 'CEO', score: 84, stage: 'proposal', probability: 60, daysInStage: 9, avatar: 'PS', industry: 'Database', nextAction: 'Demo scheduled' },
  { id: 'd8', company: 'Resend', value: 640000, contact: 'Zeno Rocha', contactRole: 'CEO', score: 68, stage: 'lead', probability: 20, daysInStage: 2, avatar: 'RS', industry: 'DevTools', nextAction: 'Initial outreach' },
  { id: 'd9', company: 'Clerk', value: 1100000, contact: 'Colin Sidoti', contactRole: 'CEO', score: 81, stage: 'qualified', probability: 50, daysInStage: 8, avatar: 'CK', industry: 'Auth', nextAction: 'Requirements gathering' },
  { id: 'd10', company: 'Neon', value: 1900000, contact: 'Nikita Shamgunov', contactRole: 'CEO', score: 86, stage: 'negotiation', probability: 75, daysInStage: 6, avatar: 'NE', industry: 'Database', nextAction: 'Legal review' },
];

export const pipelineStages: { key: DealStage; label: string; color: string }[] = [
  { key: 'lead', label: 'New Leads', color: '#64748b' },
  { key: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { key: 'proposal', label: 'Proposal', color: '#00f0ff' },
  { key: 'negotiation', label: 'Negotiation', color: '#f59e0b' },
  { key: 'closed', label: 'Closed Won', color: '#10b981' },
];

// Market Intelligence Data
export const marketTicker = [
  { symbol: 'AI/ML', value: 847.2, change: 12.4 },
  { symbol: 'SAAS', value: 423.8, change: 5.7 },
  { symbol: 'FINTECH', value: 312.1, change: -2.3 },
  { symbol: 'CYBERSEC', value: 567.9, change: 8.1 },
  { symbol: 'CLOUD', value: 789.4, change: 3.2 },
  { symbol: 'WEB3', value: 156.3, change: -5.8 },
  { symbol: 'BIOTECH', value: 634.7, change: 15.2 },
  { symbol: 'EDGE', value: 298.5, change: 7.9 },
  { symbol: 'QUANTUM', value: 445.6, change: 22.1 },
  { symbol: 'ROBOTICS', value: 512.3, change: 11.3 },
];

export const competitorData = [
  { name: 'Palantir', marketShare: 28, growth: 24, threat: 'high' as const, score: 88, strengths: ['Data integration', 'Government contracts'], revenue: 2800 },
  { name: 'Tableau', marketShare: 22, growth: 12, threat: 'medium' as const, score: 72, strengths: ['Visualization', 'Enterprise adoption'], revenue: 2200 },
  { name: 'Looker', marketShare: 15, growth: 18, threat: 'medium' as const, score: 68, strengths: ['Google ecosystem', 'SQL-first'], revenue: 1500 },
  { name: 'ThoughtSpot', marketShare: 8, growth: 32, threat: 'rising' as const, score: 74, strengths: ['AI search', 'Natural language'], revenue: 800 },
  { name: 'Domo', marketShare: 6, growth: 8, threat: 'low' as const, score: 52, strengths: ['Mobile BI', 'Real-time'], revenue: 600 },
];

export const sentimentData = [
  { category: 'Product Quality', positive: 82, neutral: 12, negative: 6 },
  { category: 'Customer Support', positive: 74, neutral: 18, negative: 8 },
  { category: 'Pricing', positive: 56, neutral: 28, negative: 16 },
  { category: 'Innovation', positive: 91, neutral: 6, negative: 3 },
  { category: 'Reliability', positive: 88, neutral: 8, negative: 4 },
];

export const trendHeatmapData = [
  { sector: 'Enterprise AI', q1: 85, q2: 92, q3: 97, q4: 99 },
  { sector: 'Cloud Native', q1: 72, q2: 78, q3: 82, q4: 88 },
  { sector: 'Data Mesh', q1: 45, q2: 58, q3: 71, q4: 84 },
  { sector: 'Edge Computing', q1: 38, q2: 52, q3: 67, q4: 79 },
  { sector: 'Zero Trust', q1: 65, q2: 73, q3: 81, q4: 90 },
  { sector: 'Generative AI', q1: 55, q2: 78, q3: 95, q4: 99 },
  { sector: 'Quantum ML', q1: 15, q2: 28, q3: 42, q4: 58 },
  { sector: 'Digital Twin', q1: 42, q2: 55, q3: 64, q4: 72 },
];

// Investor Page Data
export const investorMetrics = [
  { label: 'Total Funding Raised', value: 186000000, prefix: '$' },
  { label: 'Pre-Money Valuation', value: 2400000000, prefix: '$' },
  { label: 'Revenue Multiple', value: 18.4, suffix: 'x' },
  { label: 'Net Revenue Retention', value: 142, suffix: '%' },
  { label: 'CAC Payback', value: 8.2, suffix: ' mo' },
  { label: 'LTV:CAC Ratio', value: 12.6, suffix: 'x' },
];

export const growthProjections = [
  { year: '2022', revenue: 8, arr: 7.2 },
  { year: '2023', revenue: 16, arr: 14.8 },
  { year: '2024', revenue: 32, arr: 29.4 },
  { year: '2025', revenue: 58, arr: 54.2 },
  { year: '2026', revenue: 98, arr: 92.6 },
  { year: '2027P', revenue: 156, arr: 148 },
  { year: '2028P', revenue: 240, arr: 228 },
];

export const roadmapData = [
  { quarter: 'Q1 2025', title: 'Neural Engine v3', description: 'Advanced predictive analytics with 99.2% accuracy', status: 'completed' as const },
  { quarter: 'Q2 2025', title: 'Global Expansion', description: 'EMEA and APAC market entry with local data centers', status: 'completed' as const },
  { quarter: 'Q3 2025', title: 'Enterprise SSO + SOC2', description: 'Enterprise-grade security and compliance framework', status: 'completed' as const },
  { quarter: 'Q4 2025', title: 'AI Copilot Launch', description: 'Natural language business strategy assistant', status: 'completed' as const },
  { quarter: 'Q1 2026', title: 'Autonomous Analytics', description: 'Self-driving analytics with zero-config insights', status: 'current' as const },
  { quarter: 'Q2 2026', title: 'Industry Verticals', description: 'Healthcare, fintech, and manufacturing specializations', status: 'upcoming' as const },
  { quarter: 'Q3 2026', title: 'Platform Marketplace', description: 'Third-party plugin and integration ecosystem', status: 'upcoming' as const },
  { quarter: 'Q4 2026', title: 'Quantum-Ready Pipeline', description: 'Quantum computing integration for complex simulations', status: 'upcoming' as const },
];

// Analytics Lab Data
export const scatterData = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 40 + 10,
  category: ['Enterprise', 'Mid-Market', 'SMB', 'Startup'][Math.floor(Math.random() * 4)],
}));

export const analyticsTimeSeriesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 0, i + 1);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    users: Math.floor(1200 + i * 45 + Math.random() * 200),
    sessions: Math.floor(3400 + i * 120 + Math.random() * 500),
    conversions: Math.floor(180 + i * 8 + Math.random() * 40),
    revenue: Math.floor(45000 + i * 2200 + Math.random() * 8000),
  };
});

export const cohortData = [
  { cohort: 'Jan 2026', m0: 100, m1: 82, m2: 74, m3: 68, m4: 63, m5: 59 },
  { cohort: 'Feb 2026', m0: 100, m1: 85, m2: 76, m3: 71, m4: 66, m5: null },
  { cohort: 'Mar 2026', m0: 100, m1: 88, m2: 79, m3: 73, m4: null, m5: null },
  { cohort: 'Apr 2026', m0: 100, m1: 86, m2: 78, m3: null, m4: null, m5: null },
  { cohort: 'May 2026', m0: 100, m1: 90, m2: null, m3: null, m4: null, m5: null },
];

// AI Command Center Data
export const aiSystemModules = [
  { name: 'Neural Prediction Engine', status: 'active' as const, load: 78, accuracy: 97.2, requests: 14200 },
  { name: 'Anomaly Detection', status: 'active' as const, load: 42, accuracy: 99.1, requests: 8400 },
  { name: 'Natural Language Processor', status: 'active' as const, load: 65, accuracy: 94.8, requests: 22100 },
  { name: 'Computer Vision Pipeline', status: 'idle' as const, load: 12, accuracy: 96.5, requests: 3200 },
  { name: 'Recommendation Engine', status: 'active' as const, load: 89, accuracy: 92.3, requests: 31400 },
  { name: 'Risk Assessment Model', status: 'warning' as const, load: 94, accuracy: 88.7, requests: 5800 },
  { name: 'Sentiment Analyzer', status: 'active' as const, load: 56, accuracy: 91.4, requests: 17600 },
  { name: 'Forecasting Module', status: 'active' as const, load: 71, accuracy: 95.9, requests: 9300 },
];

export const aiSignals = [
  { id: 1, type: 'expansion' as const, message: 'Market expansion signal detected in APAC fintech sector', strength: 92, time: '2 min ago' },
  { id: 2, type: 'risk' as const, message: 'Competitor pricing change detected: Palantir reduced enterprise tier by 15%', strength: 78, time: '8 min ago' },
  { id: 3, type: 'opportunity' as const, message: 'Acquisition target identified: DataMesh Corp (Series B, $42M revenue)', strength: 85, time: '15 min ago' },
  { id: 4, type: 'anomaly' as const, message: 'Unusual engagement pattern in healthcare vertical — 340% spike', strength: 96, time: '22 min ago' },
  { id: 5, type: 'prediction' as const, message: 'Q2 revenue projected to exceed target by 12.4% based on pipeline velocity', strength: 88, time: '35 min ago' },
  { id: 6, type: 'expansion' as const, message: 'Strategic partnership opportunity with Snowflake identified', strength: 74, time: '1 hr ago' },
];

export const notifications = [
  { id: 1, type: 'alert' as const, title: 'Revenue Target Hit', message: 'Q1 revenue target of $7.2M achieved 3 days ahead of schedule', time: '5 min ago', read: false },
  { id: 2, type: 'insight' as const, title: 'AI Insight', message: 'Customer churn risk increased by 12% in healthcare segment', time: '18 min ago', read: false },
  { id: 3, type: 'update' as const, title: 'Pipeline Update', message: 'Anthropic deal moved to negotiation stage — $2.4M', time: '1 hr ago', read: true },
  { id: 4, type: 'alert' as const, title: 'System Alert', message: 'Neural Engine processing at 94% capacity', time: '2 hr ago', read: true },
  { id: 5, type: 'insight' as const, title: 'Market Alert', message: 'Competitor Tableau acquired by Salesforce — market shift expected', time: '3 hr ago', read: true },
];

export const commandPaletteActions = [
  { id: 'nav-dashboard', category: 'Navigation', label: 'Go to Dashboard', icon: 'LayoutDashboard', shortcut: '⌘1' },
  { id: 'nav-crm', category: 'Navigation', label: 'Go to CRM Pipeline', icon: 'Kanban', shortcut: '⌘2' },
  { id: 'nav-market', category: 'Navigation', label: 'Go to Market Intelligence', icon: 'TrendingUp', shortcut: '⌘3' },
  { id: 'nav-investor', category: 'Navigation', label: 'Go to Investor', icon: 'PresentationIcon', shortcut: '⌘4' },
  { id: 'nav-analytics', category: 'Navigation', label: 'Go to Analytics Lab', icon: 'FlaskConical', shortcut: '⌘5' },
  { id: 'nav-ai', category: 'Navigation', label: 'Go to AI Command Center', icon: 'Brain', shortcut: '⌘6' },
  { id: 'action-search', category: 'Actions', label: 'Search deals...', icon: 'Search' },
  { id: 'action-new-deal', category: 'Actions', label: 'Create new deal', icon: 'Plus' },
  { id: 'action-export', category: 'Actions', label: 'Export report', icon: 'Download' },
  { id: 'action-ai-analyze', category: 'Actions', label: 'AI Analyze pipeline', icon: 'Sparkles' },
  { id: 'action-team', category: 'Actions', label: 'View team performance', icon: 'Users' },
  { id: 'action-settings', category: 'Settings', label: 'Open settings', icon: 'Settings' },
  { id: 'action-theme', category: 'Settings', label: 'Toggle dark mode', icon: 'Moon' },
];
