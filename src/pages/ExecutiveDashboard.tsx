import { motion } from 'framer-motion';
import {
  Compass,
  TrendingUp,
  Activity,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Globe
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
        <button
          onClick={() => setCopilotOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet hover:from-accent-cyan/95 hover:to-accent-violet/95 text-white font-bold text-xs flex items-center gap-2 glow-cyan transition-all shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" /> Ask AI Intelligence Core
        </button>
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
    </motion.div>
  );
}
