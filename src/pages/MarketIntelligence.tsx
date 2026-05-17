
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell,
} from 'recharts';
import { Shield, Target, Eye, Sparkles, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { marketTicker, competitorData, sentimentData, trendHeatmapData } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const positioningData = competitorData.map((c) => ({
  x: c.marketShare,
  y: c.growth,
  z: c.revenue / 100,
  name: c.name,
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-[11px] font-medium" style={{ color: p.color || '#e2e8f0' }}>
          {p.name || p.dataKey}: {p.value}
        </p>
      ))}
    </div>
  );
};

const heatColor = (value: number) => {
  if (value >= 90) return 'bg-accent-cyan/40 text-accent-cyan';
  if (value >= 75) return 'bg-accent-cyan/25 text-accent-cyan/90';
  if (value >= 60) return 'bg-accent-violet/25 text-accent-violet';
  if (value >= 40) return 'bg-accent-amber/20 text-accent-amber';
  return 'bg-white/[0.06] text-text-muted';
};

export default function MarketIntelligence() {

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-y-auto">
      {/* Market Ticker */}
      <motion.div variants={fadeUp} className="border-b border-white/[0.04] bg-bg-surface/30 backdrop-blur-xl overflow-hidden">
        <div className="animate-ticker flex items-center gap-8 py-2.5 px-4 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marketTicker, ...marketTicker].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-text-primary">{item.symbol}</span>
              <span className="text-[11px] text-text-secondary">{item.value.toFixed(1)}</span>
              <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${item.change >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}`}>
                {item.change >= 0 ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                {Math.abs(item.change)}%
              </span>
              <div className="w-px h-3 bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* AI Insights Banner */}
        <motion.div variants={fadeUp} className="bg-gradient-to-r from-accent-cyan/[0.08] to-accent-violet/[0.08] border border-accent-cyan/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-accent-cyan" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-text-primary">AI Market Insight</p>
            <p className="text-[11px] text-text-secondary mt-0.5">Enterprise AI sector showing strongest momentum (+22.1% QoQ). Generative AI adoption accelerating 3x faster than traditional ML solutions. Recommend increasing sector allocation by 15%.</p>
          </div>
          <button className="text-[10px] text-accent-cyan font-semibold px-3 py-1.5 rounded-lg bg-accent-cyan/10 hover:bg-accent-cyan/20 transition-colors shrink-0">
            View Details
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Competitor Analysis */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent-violet" />
                  <h3 className="text-sm font-semibold">Competitor Analysis</h3>
                </div>
              </div>
              <div className="space-y-2.5">
                {competitorData.map((comp, i) => (
                  <motion.div
                    key={comp.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent-cyan/15 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 flex items-center justify-center text-[10px] font-bold text-text-primary">
                      {comp.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-text-primary">{comp.name}</p>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                          comp.threat === 'high' ? 'bg-accent-rose/10 text-accent-rose' :
                          comp.threat === 'rising' ? 'bg-accent-amber/10 text-accent-amber' :
                          comp.threat === 'medium' ? 'bg-accent-cyan/10 text-accent-cyan' :
                          'bg-white/[0.06] text-text-muted'
                        }`}>
                          {comp.threat} threat
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[10px] text-text-muted">Share: {comp.marketShare}%</span>
                        <span className="text-[10px] text-text-muted">Growth: {comp.growth}%</span>
                        <span className="text-[10px] text-text-muted">${(comp.revenue)}M</span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.06] rounded-full mt-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${comp.score}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Strategic Positioning Matrix */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent-cyan" />
                  <h3 className="text-sm font-semibold">Strategic Positioning</h3>
                </div>
                <span className="text-[10px] text-text-muted">Market Share vs Growth</span>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis type="number" dataKey="x" name="Market Share" unit="%" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                    <YAxis type="number" dataKey="y" name="Growth" unit="%" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                    <ZAxis type="number" dataKey="z" range={[60, 300]} />
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
                          <p className="text-[11px] font-semibold text-text-primary">{data.name}</p>
                          <p className="text-[10px] text-text-secondary">Share: {data.x}% · Growth: {data.y}%</p>
                        </div>
                      );
                    }} />
                    <Scatter data={positioningData} fill="#00f0ff">
                      {positioningData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#f43f5e' : i === 3 ? '#f59e0b' : '#00f0ff'} fillOpacity={0.7} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Trend Heatmap */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent-amber" />
                  <h3 className="text-sm font-semibold">Trend Heatmap</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-[10px] text-text-muted font-medium pb-2 pr-3">Sector</th>
                      <th className="text-center text-[10px] text-text-muted font-medium pb-2 px-2">Q1</th>
                      <th className="text-center text-[10px] text-text-muted font-medium pb-2 px-2">Q2</th>
                      <th className="text-center text-[10px] text-text-muted font-medium pb-2 px-2">Q3</th>
                      <th className="text-center text-[10px] text-text-muted font-medium pb-2 px-2">Q4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendHeatmapData.map((row, i) => (
                      <motion.tr
                        key={row.sector}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <td className="text-[11px] text-text-primary py-1.5 pr-3 font-medium">{row.sector}</td>
                        {[row.q1, row.q2, row.q3, row.q4].map((val, j) => (
                          <td key={j} className="p-1">
                            <div className={`text-center text-[10px] font-semibold rounded-lg py-1.5 ${heatColor(val)}`}>
                              {val}
                            </div>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Sentiment Analysis */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent-emerald" />
                  <h3 className="text-sm font-semibold">Sentiment Analysis</h3>
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sentimentData} layout="vertical" barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Positive" />
                    <Bar dataKey="neutral" stackId="a" fill="#64748b" name="Neutral" />
                    <Bar dataKey="negative" stackId="a" fill="#f43f5e" radius={[0, 4, 4, 0]} name="Negative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-emerald" /><span className="text-[10px] text-text-secondary">Positive</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-text-secondary" /><span className="text-[10px] text-text-secondary">Neutral</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-rose" /><span className="text-[10px] text-text-secondary">Negative</span></div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
