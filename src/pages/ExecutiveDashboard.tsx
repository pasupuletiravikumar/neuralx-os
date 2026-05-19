import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  TrendingUp,
  Activity,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Globe,
  Download,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { competitors, marketTrends } from '../data/mockData';
import GlassCard from '../components/ui/GlassCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function ExecutiveDashboard() {
  const { setActivePage, setSelectedCompetitorId, setCopilotOpen } = useApp();

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showScanModal, setShowScanModal] = useState(false);

  const totalMarketSize = marketTrends.reduce((acc, curr) => acc + curr.marketSize, 0).toFixed(1);
  const avgSentiment = Math.round(
    competitors.reduce((acc, curr) => acc + curr.sentiment, 0) / competitors.length
  );
  const topCompetitor = competitors.reduce((prev, current) =>
    prev.marketShare > current.marketShare ? prev : current
  );

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Prepare chart data combining competitors
  const marketShareChartData = competitors.map((c) => ({
    name: c.name,
    share: c.marketShare,
    revenue: c.revenue
  }));

  // Trigger high-fidelity diagnostic opportunity scanning animation
  const triggerOpportunityScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowScanModal(true);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  // Strategic report generation and dynamic file downloader
  const handleExportReport = () => {
    const reportText = `============================================================
MARKETPULSE AI — ENTERPRISE STRATEGIC BRIEFING REPORT
Generated: ${new Date().toLocaleDateString()} | Node: MP-NODE-5174-SEC
============================================================

[I] EXECUTIVE MARKET OVERVIEW
* Total Sector Market Size: $${totalMarketSize} Billion
* Avg Competitor Sentiment Score: ${avgSentiment}% Positive
* Sector CAGR Index Pace: 22.8% YoY
* Primary Market Leader: ${topCompetitor.name} (${topCompetitor.marketShare}% Share)

[II] COMPETITIVE MARKET INDEXES
${competitors.map((c, i) => `${i+1}. ${c.name}
   - Revenue Capture: $${c.revenue}M
   - Segment Target: ${c.targetAudience}
   - Acquisition Buying viability index: ${c.acquisitionProbability}%`).join('\n')}

[III] REGIONAL INTEL FORECASTS
${marketTrends.map((t) => `- ${t.sector} (MP Symbol: ${t.tickerSymbol})
   - Size: $${t.marketSize}B | Sentiment Index: ${t.sentimentScore}/100
   - Regional YoY growth vectors: NA (+${t.regionalGrowth.na}%), EU (+${t.regionalGrowth.eu}%), APAC (+${t.regionalGrowth.apac}%)`).join('\n')}

============================================================
AI PLATFORM FORECAST ADVISORY
Generative AI analysis highlights strong buyability opportunities for Domo Inc (+${competitors[4].acquisitionProbability}% buyout probability) to instantly capture their 1000+ local data stream pipelines. Fast-track regional EdTech node scaling.
============================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MarketPulse_Strategic_Briefing_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto p-6 space-y-6 select-none"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent-cyan mb-1.5">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Operational Overview</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary">
            EXECUTIVE STRATEGY DASHBOARD
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time market analytics, competitive positioning indicators, and AI forecasts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportReport}
            className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-text-secondary hover:text-text-primary font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
            title="Download formatted Strategic Intelligence briefing report"
          >
            <Download className="w-3.5 h-3.5" /> Export Strategic Report
          </button>
          <button
            onClick={triggerOpportunityScan}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet hover:from-accent-cyan/95 hover:to-accent-violet/95 text-white font-bold text-xs flex items-center gap-2 glow-cyan transition-all shadow-md animate-pulse"
            title="Scan database parameters to discover high-yield opportunities"
          >
            <Sparkles className="w-3.5 h-3.5" /> Detect Opportunities
          </button>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Sector Value',
            value: `$${totalMarketSize}B`,
            change: '+24.5%',
            positive: true,
            icon: Globe,
            desc: 'Aggregate value of tracked markets',
            glow: 'cyan' as const
          },
          {
            label: 'Leader Position',
            value: topCompetitor.name,
            change: `${topCompetitor.marketShare}% Share`,
            positive: true,
            icon: Award,
            desc: 'Primary competitor by market capture',
            glow: 'violet' as const
          },
          {
            label: 'Sector CAGR Index',
            value: '22.8%',
            change: '+3.1% YoY',
            positive: true,
            icon: TrendingUp,
            desc: 'Compound annual growth index',
            glow: 'emerald' as const
          },
          {
            label: 'Audience Sentiment',
            value: `${avgSentiment}%`,
            change: '-1.4% MoM',
            positive: false,
            icon: Activity,
            desc: 'Global customer experience score',
            glow: 'none' as const
          }
        ].map((kpi, idx) => (
          <GlassCard key={idx} glow={kpi.glow} className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                {kpi.label}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-text-secondary">
                <kpi.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-black text-text-primary tracking-tight leading-none">
                {kpi.value}
              </h2>
              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className={`inline-flex items-center text-[9px] font-bold ${
                    kpi.positive ? 'text-accent-emerald' : 'text-accent-rose'
                  }`}
                >
                  {kpi.positive ? (
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5" />
                  )}
                  {kpi.change}
                </span>
                <span className="text-[9px] text-text-muted">{kpi.desc}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Main interactive segment analysis & feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Analytics Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <GlassCard hover={false} className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Competitor Volume vs Share
                </h3>
              </div>
              <span className="text-[9px] font-mono text-text-muted">SYNCED: 100% CORRECT</span>
            </div>

            <div className="h-[280px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketShareChartData}>
                  <defs>
                    <linearGradient id="dashboardShareGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl text-[10px]">
                          <p className="font-bold text-accent-cyan">{data.name}</p>
                          <p className="text-text-secondary mt-1">Market Capture: {data.share}%</p>
                          <p className="text-text-secondary">Revenue: ${data.revenue}M</p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="share"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#dashboardShareGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Live strategic insights and feeds */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-violet" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Strategic Competitor Funnels
                </h3>
              </div>
              <span className="text-[9px] text-accent-cyan font-bold uppercase tracking-wider">Live</span>
            </div>

            <div className="mt-6 space-y-4 flex-1">
              {competitors.slice(0, 3).map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => {
                    setSelectedCompetitorId(comp.id);
                    setActivePage('competitors');
                  }}
                  className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl hover:border-accent-cyan/20 hover:bg-white/[0.02] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{comp.name}</h4>
                    <p className="text-[9px] text-text-secondary mt-0.5 leading-tight">
                      {comp.pricingModel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-text-primary">{comp.marketShare}%</span>
                    <p className="text-[8px] font-mono text-text-muted mt-0.5 uppercase">
                      CAGR: {comp.cagr}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePage('competitors')}
              className="w-full mt-4 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-accent-cyan border border-dashed border-white/[0.08] hover:border-accent-cyan/30 rounded-xl transition-all"
            >
              Analyze full SWOT profiles
            </button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Region Wise Growth Grid */}
      <motion.div variants={fadeUp}>
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] mb-6">
            <Globe className="w-4 h-4 text-accent-emerald" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Sector Demand & Heat Indicators
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTrends.map((trend) => (
              <div
                key={trend.sector}
                className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted tracking-wider">
                      {trend.tickerSymbol}
                    </span>
                    <span className="text-[9px] bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 px-1.5 py-0.5 rounded font-bold">
                      +{trend.growthRate}% YoY
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-text-primary mt-2">{trend.sector}</h4>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[9px] text-text-secondary mb-1">
                    <span>Demand Index:</span>
                    <span className="font-bold">{trend.demandIndex}/100</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald"
                      style={{ width: `${trend.demandIndex}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Opportunity Scanner Diagnostic Modal Overlay */}
      <AnimatePresence>
        {showScanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-bg-surface border border-white/[0.08] rounded-2xl shadow-2xl p-6 relative overflow-hidden select-none"
            >
              {/* Background scanning visual sweeps */}
              {isScanning && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-violet/5 animate-pulse pointer-events-none" />
              )}

              {/* Close Button */}
              <button
                onClick={() => setShowScanModal(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-lg font-bold w-7 h-7 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center transition-all"
                disabled={isScanning}
              >
                ✕
              </button>

              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center text-white glow-cyan">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-text-primary">
                    AI Opportunity Detector Scan
                  </h3>
                  <p className="text-[10px] text-text-muted mt-0.5 font-mono">
                    Node Vector: MP-NODE-5174-SEC
                  </p>
                </div>
              </div>

              {isScanning ? (
                <div className="py-6 text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-accent-cyan animate-spin mx-auto mb-2 glow-cyan" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block">
                    Scanning Database Pipelines...
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-xs mx-auto h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-150"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-text-muted block">
                    Analyzing SWOT matrix vectors... {scanProgress}%
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 py-2"
                >
                  <div className="p-4 bg-accent-emerald/5 border border-accent-emerald/20 rounded-xl flex items-start gap-3.5">
                    <Zap className="w-5 h-5 text-accent-emerald shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-emerald block font-mono">
                        [SUCCESS] HIGH-YIELD OPPORTUNITY DISCOVERED
                      </span>
                      <h4 className="text-xs font-bold text-text-primary mt-2">
                        Domo Inc Buyout & Channel Integration Playbook
                      </h4>
                      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                        Domo Inc presents an optimal acquisition score of **60%** due to its stagnating growth rate (+8.4% CAGR) and highly valuable datastore libraries. Fast-tracking integration yields a projected **+$4.8M** ARR margin contribution in NA and Europe.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                      <span className="text-[8px] font-bold text-text-secondary uppercase">Buyout Viability</span>
                      <h5 className="text-sm font-extrabold text-accent-cyan mt-1">High (60%)</h5>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                      <span className="text-[8px] font-bold text-text-secondary uppercase">Projected Yield</span>
                      <h5 className="text-sm font-extrabold text-accent-emerald mt-1">+$4.8M ARR</h5>
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-5">
                    <button
                      onClick={() => {
                        setShowScanModal(false);
                        setSelectedCompetitorId('comp5'); // Select Domo
                        setActivePage('competitors');
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-text-primary text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Inspect Domo SWOT
                    </button>
                    <button
                      onClick={() => {
                        setShowScanModal(false);
                        setCopilotOpen(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet hover:from-accent-cyan/90 hover:to-accent-violet/90 text-white text-xs font-bold uppercase tracking-wider glow-cyan transition-all shadow-md"
                    >
                      Draft Strategic Brief
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
