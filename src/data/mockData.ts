// ============================================================
// MarketPulse AI — Enterprise High-Fidelity Mock Database
// ============================================================

export interface Competitor {
  id: string;
  name: string;
  marketShare: number;       // In %
  revenue: number;           // In $ millions
  cagr: number;              // In %
  cac: number;               // In $
  ltv: number;               // In $
  churn: number;             // In %
  sentiment: number;         // Out of 100
  targetAudience: string;
  pricingModel: string;
  pricePoint: string;
  strengths: string[];
  weaknesses: string[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  acquisitionProbability: number; // In %
  growthVelocity: 'Accelerating' | 'Steady' | 'Decelerating' | 'Stagnant';
  funnel: {
    awareness: number;      // In %
    consideration: number;  // In %
    conversion: number;     // In %
  };
}

export interface MarketTrend {
  sector: string;
  tickerSymbol: string;
  growthRate: number;      // YoY %
  demandIndex: number;     // Out of 100
  sentimentScore: number;  // Out of 100
  marketSize: number;      // In $ billions
  regionalGrowth: {
    na: number;            // In %
    eu: number;            // In %
    apac: number;          // In %
    latam: number;         // In %
  };
  forecastDemand: { month: string; value: number; upperLimit: number; lowerLimit: number }[];
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  category: 'Expansion' | 'Pricing' | 'Acquisition' | 'Partnership';
  description: string;
  impactScore: number;     // Out of 100
  confidenceRate: number;  // In %
  projectedRevenue: number; // In $ millions
  actionItem: string;
  status: 'Ready' | 'In Progress' | 'Archived';
}

export const competitors: Competitor[] = [
  {
    id: 'comp1',
    name: 'Palantir Foundry',
    marketShare: 32.4,
    revenue: 2230,
    cagr: 24.5,
    cac: 45000,
    ltv: 280000,
    churn: 2.1,
    sentiment: 88,
    targetAudience: 'Global Fortune 500 / Government Agencies',
    pricingModel: 'Enterprise Annual License (High Tier)',
    pricePoint: '$100K+ / month',
    strengths: ['Deep OS integration', 'Unrivaled security controls', 'Government trust'],
    weaknesses: ['Extremely high setup time', 'Complex query language', 'Inflexible contract sizing'],
    swot: {
      strengths: ['Massive institutional contracts', 'Proprietary network mapping', 'High customer retention'],
      weaknesses: ['Poor fit for mid-market', 'Heavy professional services reliance', 'Developer onboarding friction'],
      opportunities: ['SaaS platform tier launching', 'Expansion in APAC public sectors', 'Edge AI deployment frameworks'],
      threats: ['Open-source big data tools', 'Localized state-sponsored competitors', 'Pricing pressure in commercial markets']
    },
    acquisitionProbability: 12,
    growthVelocity: 'Accelerating',
    funnel: { awareness: 92, consideration: 78, conversion: 34 }
  },
  {
    id: 'comp2',
    name: 'Looker (Google Cloud)',
    marketShare: 22.8,
    revenue: 1540,
    cagr: 16.8,
    cac: 12500,
    ltv: 78000,
    churn: 5.4,
    sentiment: 76,
    targetAudience: 'Tech Startups / Google Cloud Enterprise',
    pricingModel: 'User-based Licensing + Computing Resource Fee',
    pricePoint: '$3.5K - $12K / month',
    strengths: ['LookML modeling power', 'Native BigQuery integrations', 'Dynamic dashboard builders'],
    weaknesses: ['Requires specialized LookML developers', 'Slow initial database queries', 'Stiff interface limits'],
    swot: {
      strengths: ['Backed by Google Cloud Suite', 'Superb database direct querying', 'Highly reusable data modules'],
      weaknesses: ['Steep learning curve', 'High costs for non-technical users', 'Weak standalone visualization widgets'],
      opportunities: ['Gemini AI integration for prompt-to-chart', 'Lower-tier SMB self-serve packages', 'Embedded analytics for third-party platforms'],
      threats: ['Vite-based customizable analytics dashboards', 'Direct competitors like Superset', 'Data warehouse lock-in resistance']
    },
    acquisitionProbability: 4,
    growthVelocity: 'Steady',
    funnel: { awareness: 84, consideration: 62, conversion: 22 }
  },
  {
    id: 'comp3',
    name: 'Tableau Software',
    marketShare: 24.1,
    revenue: 1850,
    cagr: 11.2,
    cac: 8200,
    ltv: 46000,
    churn: 7.2,
    sentiment: 72,
    targetAudience: 'General Business Analysts / Salesforce Clients',
    pricingModel: 'Desktop Creator + Server Viewer Licenses',
    pricePoint: '$1.5K - $5K / month',
    strengths: ['Exceptional visual designers', 'Huge globally-active community', 'Offline processing speed'],
    weaknesses: ['Weak automated data cleaning', 'Salesforce cross-platform sync friction', 'Desktop-first outdated release cycle'],
    swot: {
      strengths: ['Market leading user interface flexibility', 'Pre-installed custom drivers', 'Massive template ecosystem'],
      weaknesses: ['High cost of server self-hosting', 'Inefficient Web view editing tools', 'Lag in streaming API integrations'],
      opportunities: ['Direct integration into Salesforce CRM flow', 'AI dashboard generation plugins', 'Unified catalog matching engines'],
      threats: ['Modern cloud-native web UI tools', 'Drastic enterprise budget downsizing', 'Lower-cost direct replicas']
    },
    acquisitionProbability: 8,
    growthVelocity: 'Decelerating',
    funnel: { awareness: 96, consideration: 71, conversion: 19 }
  },
  {
    id: 'comp4',
    name: 'ThoughtSpot',
    marketShare: 11.5,
    revenue: 680,
    cagr: 32.1,
    cac: 18000,
    ltv: 112000,
    churn: 4.8,
    sentiment: 84,
    targetAudience: 'Ad-hoc Business Intelligence Teams',
    pricingModel: 'Search-query volume tiers + user licensing',
    pricePoint: '$2.5K - $8.5K / month',
    strengths: ['State-of-the-art Natural Language Search', 'Instant auto-generated charts', 'Mobile-first platform performance'],
    weaknesses: ['Difficult backend semantic layer setup', 'Limited pixel-perfect reporting controls', 'Price spikes for rapid querying'],
    swot: {
      strengths: ['AI-first natural search paradigm', 'Extremely intuitive for sales teams', 'Live query engine speed'],
      weaknesses: ['Hard to scale complex joins', 'Weak raw developer customization APIs', 'Smaller global developer community'],
      opportunities: ['LLM integration for strategic analysis', 'Strategic partnerships with Snowflake/Databricks', 'Mid-market automated expansion alerts'],
      threats: ['Google/Microsoft launching native search', 'Tight visual interface constraints driving developers away', 'High database compute overhead costs']
    },
    acquisitionProbability: 45,
    growthVelocity: 'Accelerating',
    funnel: { awareness: 68, consideration: 45, conversion: 28 }
  },
  {
    id: 'comp5',
    name: 'Domo Inc',
    marketShare: 9.2,
    revenue: 410,
    cagr: 8.4,
    cac: 9800,
    ltv: 52000,
    churn: 9.6,
    sentiment: 64,
    targetAudience: 'Mid-Market Operational Leaders',
    pricingModel: 'All-inclusive cloud platform license',
    pricePoint: '$1.8K - $4.5K / month',
    strengths: ['1000+ pre-built third party connector scripts', 'Easy drag-and-drop ETL data pipelines', 'Built-in chat systems'],
    weaknesses: ['Proprietary tech lock-in', 'Struggles with billion-record scale', 'Weak advanced statistical packages'],
    swot: {
      strengths: ['Extremely rapid out-of-the-box setups', 'Clean single interface dashboards', 'Mobile responsive defaults'],
      weaknesses: ['Poor custom rendering flexibility', 'High platform premium lock-in', 'Limited advanced machine learning integration'],
      opportunities: ['Turnkey solutions for specific verticals', 'AI automated data pipeline diagnostics', 'Affiliate consultant distribution network'],
      threats: ['Direct competition with PowerBI desktop tools', 'Customer migration to custom warehouse architecture', 'Shrinking capital access']
    },
    acquisitionProbability: 60,
    growthVelocity: 'Stagnant',
    funnel: { awareness: 58, consideration: 38, conversion: 15 }
  }
];

export const marketTrends: MarketTrend[] = [
  {
    sector: 'Generative AI Analytics',
    tickerSymbol: 'GENAI',
    growthRate: 340.5,
    demandIndex: 98,
    sentimentScore: 92,
    marketSize: 18.4,
    regionalGrowth: { na: 380, eu: 290, apac: 420, latam: 180 },
    forecastDemand: [
      { month: 'Jan', value: 20, upperLimit: 22, lowerLimit: 18 },
      { month: 'Feb', value: 34, upperLimit: 38, lowerLimit: 30 },
      { month: 'Mar', value: 48, upperLimit: 55, lowerLimit: 41 },
      { month: 'Apr', value: 65, upperLimit: 74, lowerLimit: 56 },
      { month: 'May', value: 88, upperLimit: 102, lowerLimit: 74 },
      { month: 'Jun', value: 120, upperLimit: 140, lowerLimit: 100 }
    ]
  },
  {
    sector: 'Cloud Data Warehouses',
    tickerSymbol: 'CLOUD',
    growthRate: 28.4,
    demandIndex: 86,
    sentimentScore: 84,
    marketSize: 64.2,
    regionalGrowth: { na: 30, eu: 24, apac: 38, latam: 15 },
    forecastDemand: [
      { month: 'Jan', value: 50, upperLimit: 52, lowerLimit: 48 },
      { month: 'Feb', value: 53, upperLimit: 56, lowerLimit: 50 },
      { month: 'Mar', value: 56, upperLimit: 60, lowerLimit: 52 },
      { month: 'Apr', value: 59, upperLimit: 64, lowerLimit: 54 },
      { month: 'May', value: 62, upperLimit: 68, lowerLimit: 56 },
      { month: 'Jun', value: 66, upperLimit: 73, lowerLimit: 59 }
    ]
  },
  {
    sector: 'Real-time Stream BI',
    tickerSymbol: 'STREAM',
    growthRate: 42.1,
    demandIndex: 78,
    sentimentScore: 78,
    marketSize: 12.8,
    regionalGrowth: { na: 48, eu: 36, apac: 52, latam: 22 },
    forecastDemand: [
      { month: 'Jan', value: 12, upperLimit: 13, lowerLimit: 11 },
      { month: 'Feb', value: 14, upperLimit: 16, lowerLimit: 12 },
      { month: 'Mar', value: 17, upperLimit: 20, lowerLimit: 14 },
      { month: 'Apr', value: 21, upperLimit: 25, lowerLimit: 17 },
      { month: 'May', value: 26, upperLimit: 31, lowerLimit: 21 },
      { month: 'Jun', value: 32, upperLimit: 38, lowerLimit: 26 }
    ]
  },
  {
    sector: 'No-Code Embedded BI',
    tickerSymbol: 'EMBED',
    growthRate: 18.2,
    demandIndex: 64,
    sentimentScore: 68,
    marketSize: 8.5,
    regionalGrowth: { na: 20, eu: 15, apac: 22, latam: 10 },
    forecastDemand: [
      { month: 'Jan', value: 8, upperLimit: 9, lowerLimit: 7 },
      { month: 'Feb', value: 8.4, upperLimit: 9.5, lowerLimit: 7.3 },
      { month: 'Mar', value: 8.9, upperLimit: 10.1, lowerLimit: 7.7 },
      { month: 'Apr', value: 9.5, upperLimit: 10.8, lowerLimit: 8.2 },
      { month: 'May', value: 10.2, upperLimit: 11.6, lowerLimit: 8.8 },
      { month: 'Jun', value: 11.0, upperLimit: 12.5, lowerLimit: 9.5 }
    ]
  }
];

export const strategicRecommendations: StrategicRecommendation[] = [
  {
    id: 'rec1',
    title: 'Deploy Gemini-Based Natural Language Query Tier',
    category: 'Pricing',
    description: 'Provide an interactive, lower-cost, prompt-to-chart operational workspace targeted at mid-market sales teams to directly compete with ThoughtSpot.',
    impactScore: 92,
    confidenceRate: 88,
    projectedRevenue: 4.8,
    actionItem: 'Develop LLM middleware integration and target 350+ leads in the pipeline.',
    status: 'Ready'
  },
  {
    id: 'rec2',
    title: 'Strategic APAC Regional Hub Expansion',
    category: 'Expansion',
    description: 'Direct sales efforts toward Tokyo, Japan and Sydney, Australia to capture localized Generative AI analytics momentum, projecting 420% market growth.',
    impactScore: 87,
    confidenceRate: 74,
    projectedRevenue: 12.5,
    actionItem: 'Set up edge-localized data warehouse clusters and hire local partnership managers.',
    status: 'In Progress'
  },
  {
    id: 'rec3',
    title: 'Acquisition Campaign targeting Domo Inc',
    category: 'Acquisition',
    description: 'Leverage Domo\'s current stagnant growth phase (8.4% YoY) and high acquisition probability (60%) to gain immediate access to their 1000+ data connectors.',
    impactScore: 81,
    confidenceRate: 65,
    projectedRevenue: 18.2,
    actionItem: 'Initiate standard corporate valuation check and secure credit lines for initial talks.',
    status: 'Ready'
  },
  {
    id: 'rec4',
    title: 'Data Warehousing Partnership Program with Snowflake',
    category: 'Partnership',
    description: 'Co-market a zero-ETL integration tool directly to Snowflake Enterprise users to bypass the developer overhead bottleneck looker is facing.',
    impactScore: 78,
    confidenceRate: 91,
    projectedRevenue: 6.4,
    actionItem: 'Finalize standard API contract sharing agreements and start beta trial program.',
    status: 'Ready'
  }
];

export const labTimeSeriesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 4, i + 1);
  const factor = 1 + i * 0.03 + Math.sin(i * 0.4) * 0.1;
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    traffic: Math.floor(18000 * factor),
    leadScore: Math.floor(62 + Math.cos(i * 0.5) * 8 + Math.random() * 4),
    cac: Math.floor(1420 - i * 15 + Math.sin(i) * 50),
    revenue: Math.floor(820000 + i * 25000 + Math.random() * 15000),
    confidenceIndex: Math.floor(84 + Math.sin(i * 0.3) * 5),
  };
});

export const simulationFactors = [
  { key: 'cacReduction', label: 'CAC Optimization Rate', min: -50, max: 0, default: -20, unit: '%' },
  { key: 'cagrShift', label: 'Target CAGR Boost', min: 0, max: 40, default: 15, unit: '%' },
  { key: 'retentionGain', label: 'NRR Growth Index', min: 0, max: 20, default: 8, unit: '%' },
];

export const systemAlerts = [
  { id: 'a1', type: 'opportunity', message: 'Domo Inc stock pressure creates target window. Yield: $18.2M.', time: '4 min ago', status: 'new' },
  { id: 'a2', type: 'threat', message: 'Palantir launched APAC edge tier. Enterprise pipeline risk increased.', time: '18 min ago', status: 'acknowledged' },
  { id: 'a3', type: 'growth', message: 'APEC sector Generative AI queries jumped 340%. Immediate entry window open.', time: '1 hr ago', status: 'new' },
  { id: 'a4', type: 'system', message: 'Market data feed synced: 42 database drivers validated successfully.', time: '3 hr ago', status: 'acknowledged' }
];

export const tickerFeed = [
  { symbol: 'GENAI', price: '18.4B', change: '+340.5%', up: true },
  { symbol: 'PLTR', price: '2.23B', change: '+24.5%', up: true },
  { symbol: 'GOOGL', price: '1.54B', change: '+16.8%', up: true },
  { symbol: 'CRM', price: '1.85B', change: '+11.2%', up: true },
  { symbol: 'STREAM', price: '12.8B', change: '+42.1%', up: true },
  { symbol: 'EMBED', price: '8.5B', change: '+18.2%', up: true },
  { symbol: 'DOMO', price: '410M', change: '-5.2%', up: false }
];
