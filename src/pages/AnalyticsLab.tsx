import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, ComposedChart, Line, Cell, ZAxis,
  RadialBarChart, RadialBar,
} from 'recharts';
import { FlaskConical, Filter, Layers, TrendingUp, BarChart3, Activity, ArrowUpRight, RefreshCw } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { analyticsTimeSeriesData, cohortData, scatterData } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const categoryColors: Record<string, string> = {
  Enterprise: '#00f0ff',
  'Mid-Market': '#8b5cf6',
  SMB: '#10b981',
  Startup: '#f59e0b',
};

const radialData = [
  { name: 'Conversion', value: 68, fill: '#00f0ff' },
  { name: 'Retention', value: 82, fill: '#8b5cf6' },
  { name: 'Engagement', value: 91, fill: '#10b981' },
  { name: 'NPS', value: 76, fill: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] text-text-muted mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-[11px] font-medium" style={{ color: p.color || p.stroke }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `${(p.value / 1000).toFixed(1)}K` : p.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsLab() {
  const [timeRange, setTimeRange] = useState('30d');
  const [metric, setMetric] = useState<'users' | 'sessions' | 'conversions' | 'revenue'>('users');

  const latestData = analyticsTimeSeriesData[analyticsTimeSeriesData.length - 1];
  const prevData = analyticsTimeSeriesData[analyticsTimeSeriesData.length - 8];

  const summaryCards = [
    { label: 'Total Users', value: latestData.users, prev: prevData.users, color: '#00f0ff' },
    { label: 'Sessions', value: latestData.sessions, prev: prevData.sessions, color: '#8b5cf6' },
    { label: 'Conversions', value: latestData.conversions, prev: prevData.conversions, color: '#10b981' },
    { label: 'Revenue', value: latestData.revenue, prev: prevData.revenue, color: '#f59e0b', prefix: '$' },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-y-auto p-6 space-y-6">
      {/* Controls */}
      <motion.div variants={fadeUp} className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-accent-cyan" />
          <h2 className="text-sm font-semibold text-text-primary">Analytics Lab</h2>
          <span className="text-[10px] bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded-full font-medium">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-bg-surface/50 border border-white/[0.06] rounded-xl overflow-hidden">
            {['7d', '30d', '90d', '1y'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 text-[10px] font-semibold transition-all ${
                  timeRange === r ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="w-8 h-8 rounded-xl bg-bg-surface/50 border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-accent-cyan transition-colors">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-xl bg-bg-surface/50 border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-accent-cyan transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((card, i) => {
          const change = ((card.value - card.prev) / card.prev * 100).toFixed(1);
          return (
            <GlassCard key={i} glow={i === 0 ? 'cyan' : 'none'} onClick={() => setMetric(['users', 'sessions', 'conversions', 'revenue'][i] as any)} className={metric === ['users', 'sessions', 'conversions', 'revenue'][i] ? 'ring-1 ring-accent-cyan/30' : ''}>
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{card.label}</p>
              <AnimatedCounter value={card.value} prefix={card.prefix || ''} className="text-xl font-bold text-text-primary" />
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-accent-emerald" />
                <span className="text-[10px] font-semibold text-accent-emerald">+{change}%</span>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Time Series */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold">Time Series Analysis</h3>
              </div>
              <div className="flex gap-2">
                {(['users', 'sessions', 'conversions', 'revenue'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg transition-all capitalize ${
                      metric === m ? 'bg-accent-cyan/10 text-accent-cyan font-semibold' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsTimeSeriesData}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey={metric} stroke="#00f0ff" strokeWidth={2} fill="url(#areaGrad)" />
                  <Line type="monotone" dataKey={metric} stroke="#8b5cf6" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Radial Metrics */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-accent-violet" />
              <h3 className="text-sm font-semibold">Key Metrics</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
                  <RadialBar background={{ fill: 'rgba(255,255,255,0.03)' }} dataKey="value" cornerRadius={8} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {radialData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                  <span className="text-[10px] text-text-secondary">{d.name}</span>
                  <span className="text-[10px] font-semibold text-text-primary ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Scatter Plot */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-emerald" />
                <h3 className="text-sm font-semibold">Customer Segmentation</h3>
              </div>
              <div className="flex items-center gap-3">
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div key={cat} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-text-muted">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis type="number" dataKey="x" name="Engagement" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                  <YAxis type="number" dataKey="y" name="Revenue" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                  <ZAxis type="number" dataKey="z" range={[20, 200]} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2">
                        <p className="text-[10px] font-semibold" style={{ color: categoryColors[d.category] }}>{d.category}</p>
                        <p className="text-[10px] text-text-secondary">Engagement: {d.x.toFixed(0)} · Revenue: {d.y.toFixed(0)}</p>
                      </div>
                    );
                  }} />
                  <Scatter data={scatterData}>
                    {scatterData.map((entry, i) => (
                      <Cell key={i} fill={categoryColors[entry.category]} fillOpacity={0.6} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Cohort Analysis */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-amber" />
                <h3 className="text-sm font-semibold">Cohort Retention</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-text-muted font-medium pb-2 pr-4">Cohort</th>
                    {['M0', 'M1', 'M2', 'M3', 'M4', 'M5'].map((m) => (
                      <th key={m} className="text-center text-[10px] text-text-muted font-medium pb-2 px-2">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((row, i) => (
                    <motion.tr
                      key={row.cohort}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <td className="text-[11px] text-text-primary py-1.5 pr-4 font-medium whitespace-nowrap">{row.cohort}</td>
                      {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, j) => (
                        <td key={j} className="p-1">
                          {val !== null ? (
                            <div className={`text-center text-[10px] font-semibold rounded-lg py-1.5 ${
                              val >= 80 ? 'bg-accent-emerald/20 text-accent-emerald' :
                              val >= 65 ? 'bg-accent-cyan/15 text-accent-cyan' :
                              val >= 50 ? 'bg-accent-amber/15 text-accent-amber' :
                              'bg-white/[0.04] text-text-secondary'
                            }`}>
                              {val}%
                            </div>
                          ) : (
                            <div className="text-center text-[10px] text-text-muted py-1.5">—</div>
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
