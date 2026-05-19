import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  Globe,
  Percent
} from 'lucide-react';
import { marketTrends } from '../data/mockData';
import GlassCard from '../components/ui/GlassCard';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function MarketTrendsTerminal() {
  const [selectedTrendIdx, setSelectedTrendIdx] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<'na' | 'eu' | 'apac' | 'latam'>('apac');
  const activeTrend = marketTrends[selectedTrendIdx];

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Convert regional growth object to array for chart visualization
  const regionalChartData = [
    { name: 'North America', growth: activeTrend.regionalGrowth.na },
    { name: 'Europe', growth: activeTrend.regionalGrowth.eu },
    { name: 'APAC', growth: activeTrend.regionalGrowth.apac },
    { name: 'Latin America', growth: activeTrend.regionalGrowth.latam }
  ];

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
          <div className="flex items-center gap-2 text-accent-emerald mb-1.5">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Market Intelligence Terminal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary">
            MARKET TRENDS & DEMAND TERMINAL
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Track industry CAGR paces, regional allocation matrices, and forecasted demand boundaries.
          </p>
        </div>
      </motion.div>

      {/* Grid split: Top level Selector listing, Bottom details charts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Trend listing */}
        <motion.div variants={fadeUp} className="lg:col-span-1 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-1 block">
            Select Trend Index
          </span>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {marketTrends.map((trend, idx) => {
              const isSel = idx === selectedTrendIdx;
              return (
                <button
                  key={trend.sector}
                  onClick={() => setSelectedTrendIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border flex flex-col justify-between shrink-0 lg:shrink transition-all ${
                    isSel
                      ? 'border-accent-emerald/30 bg-accent-emerald/5 shadow-md'
                      : 'border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                  style={{ minWidth: '180px' }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-text-primary truncate mr-2">
                      {trend.sector}
                    </span>
                    <span className="text-[9px] font-mono text-accent-emerald font-bold">
                      +{trend.growthRate}%
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-text-muted">
                    <span>MP Symbol: {trend.tickerSymbol}</span>
                    <span>Cap: ${trend.marketSize}B</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right detailed charts */}
        <motion.div variants={fadeUp} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Demand Forecast composed chart */}
          <GlassCard hover={false} className="md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  6-Month Demand Boundaries: {activeTrend.sector}
                </h3>
              </div>
              <span className="text-[9px] bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded text-text-muted font-mono">
                UPPER vs LOWER CONFIDENCE: 92%
              </span>
            </div>

            <div className="h-[240px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={activeTrend.forecastDemand}>
                  <defs>
                    <linearGradient id="forecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="month" tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl text-[10px]">
                          <p className="font-bold text-accent-emerald">{data.month} Demand</p>
                          <p className="text-text-secondary mt-1">Expected Demand: {data.value}/100</p>
                          <p className="text-text-secondary">Upper Boundary: {data.upperLimit}/100</p>
                          <p className="text-text-secondary">Lower Boundary: {data.lowerLimit}/100</p>
                        </div>
                      );
                    }}
                  />
                  {/* Area representing upper boundary confidence */}
                  <Area
                    type="monotone"
                    dataKey="upperLimit"
                    stroke="transparent"
                    fill="url(#forecastAreaGrad)"
                  />
                  {/* Expected value line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10b981', r: 3 }}
                  />
                  {/* Lower bound dash line */}
                  <Line
                    type="monotone"
                    dataKey="lowerLimit"
                    stroke="#fbbf24"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Regional Growth distribution Bar Chart */}
          <GlassCard hover={false} className="flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent-emerald" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Regional Growth distribution
                </h3>
              </div>
              <Percent className="w-3.5 h-3.5 text-text-muted" />
            </div>

            <div className="h-[180px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl text-[10px]">
                          <p className="font-bold text-text-primary">{data.name}</p>
                          <p className="text-accent-emerald mt-1">Growth: +{data.growth}%</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="growth" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {regionalChartData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={idx === 2 ? '#06b6d4' : '#10b981'} // Highlight APAC
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Strategic Action Summary */}
          <GlassCard hover={false} className="flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Sector Core Metrics & Regions
              </span>
              <span className="text-[9px] font-mono text-accent-emerald font-bold">
                SCORE: {activeTrend.sentimentScore}/100
              </span>
            </div>

            {/* Clickable Regional Tab Pill Selector */}
            <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.03]">
              {[
                { key: 'na' as const, label: 'NA' },
                { key: 'eu' as const, label: 'EU' },
                { key: 'apac' as const, label: 'APAC' },
                { key: 'latam' as const, label: 'LATAM' }
              ].map((reg) => (
                <button
                  key={reg.key}
                  onClick={() => setSelectedRegion(reg.key)}
                  className={`px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg border transition-all ${
                    selectedRegion === reg.key
                      ? 'border-accent-emerald/30 bg-accent-emerald/5 text-accent-emerald font-black shadow-sm'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            {(() => {
              let regionName = 'Asia-Pacific (APAC)';
              let growth = activeTrend.regionalGrowth.apac;
              let highlightColor = 'text-accent-cyan';
              let strategyText = `${activeTrend.sector} pacing at +${growth}% CAGR in APAC driven by rapid mobile intelligence and EdTech analytics adoption. Recommend fast-tracking early local cloud warehouse distribution node allocations.`;

              if (selectedRegion === 'na') {
                regionName = 'North America (NA)';
                growth = activeTrend.regionalGrowth.na;
                highlightColor = 'text-accent-cyan';
                strategyText = `${activeTrend.sector} pacing at +${growth}% CAGR in North America. Rapid enterprise cloud contract sizing by Palantir and Looker highlights high mid-market demands. Suggest deploying Generative SQL pipelines.`;
              } else if (selectedRegion === 'eu') {
                regionName = 'Europe (EU)';
                growth = activeTrend.regionalGrowth.eu;
                highlightColor = 'text-accent-violet';
                strategyText = `${activeTrend.sector} pacing at +${growth}% CAGR in Europe. Heavy regulatory compliance demands require isolated federated querying nodes to safely satisfy strict GDPR and localized server storage rules.`;
              } else if (selectedRegion === 'latam') {
                regionName = 'Latin America (LATAM)';
                growth = activeTrend.regionalGrowth.latam;
                highlightColor = 'text-accent-rose';
                strategyText = `${activeTrend.sector} pacing at +${growth}% CAGR in Latin America. Emerging fintech analytics hubs are accelerating. Excellent vector for a low-cost, lightweight cloud connector model subscription.`;
              }

              return (
                <>
                  <div className="mt-4 space-y-3.5 flex-1 justify-center flex flex-col">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">Market Size</span>
                      <span className="font-bold text-text-primary">${activeTrend.marketSize} Billion</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">Growth Rate Pace</span>
                      <span className="font-bold text-accent-emerald">+{activeTrend.growthRate}% YoY</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">Customer Sentiment</span>
                      <span className="font-bold text-text-primary">{activeTrend.sentimentScore}% Positive</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">Active Regional Growth</span>
                      <span className={`font-bold ${highlightColor}`}>+{growth}% ({regionName})</span>
                    </div>
                  </div>

                  <div className="mt-4 p-2 bg-white/[0.01] border border-white/[0.04] rounded-xl text-[10px] text-text-secondary leading-relaxed">
                    <span className={`font-bold uppercase ${highlightColor} block mb-1 text-[8px] tracking-wider`}>Regional Strategy Playbook</span>
                    {strategyText}
                  </div>
                </>
              );
            })()}
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
