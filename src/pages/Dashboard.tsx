import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Users, Sparkles, Clock, Zap, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import StatusIndicator from '../components/ui/StatusIndicator';
import { kpiData, revenueChartData, activityFeed, teamData, aiRecommendations } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] text-text-muted mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-[11px] font-medium" style={{ color: p.color }}>
          {p.name}: ${(p.value / 1000000).toFixed(1)}M
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-y-auto p-6 space-y-6">
      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <GlassCard key={i} glow={i === 0 ? 'cyan' : 'none'} className="relative overflow-hidden group">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider">{kpi.label}</p>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${kpi.trend === 'up' ? 'text-accent-emerald' : 'text-accent-rose'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}%
              </div>
            </div>
            <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} className="text-2xl font-bold text-text-primary" />
            {/* Mini sparkline */}
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpi.sparkline.map((v, j) => ({ v, i: j }))}>
                  <defs>
                    <linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={i === 0 ? '#00f0ff' : '#8b5cf6'} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={i === 0 ? '#00f0ff' : '#8b5cf6'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={i === 0 ? '#00f0ff' : '#8b5cf6'} strokeWidth={1.5} fill={`url(#spark-${i})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Glow accent */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-cyan/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </GlassCard>
        ))}
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Analytics */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Revenue Analytics</h3>
                <p className="text-[11px] text-text-secondary mt-0.5">Monthly revenue vs projections</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                  <span className="text-[10px] text-text-secondary">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent-violet" />
                  <span className="text-[10px] text-text-secondary">Projected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-[10px] text-text-secondary">Last Year</span>
                </div>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000000}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="lastYear" stroke="rgba(255,255,255,0.15)" strokeWidth={1} fill="transparent" name="Last Year" />
                  <Area type="monotone" dataKey="projected" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#projGrad)" name="Projected" />
                  <Area type="monotone" dataKey="revenue" stroke="#00f0ff" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Forecasting */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">AI Forecasting</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text-secondary">Revenue Target</span>
                  <span className="text-[11px] font-semibold text-accent-emerald">94% on track</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1.5, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-emerald to-accent-cyan" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text-secondary">Pipeline Coverage</span>
                  <span className="text-[11px] font-semibold text-accent-cyan">3.2x</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text-secondary">Win Rate</span>
                  <span className="text-[11px] font-semibold text-accent-violet">68%</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-rose" />
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-3.5 h-3.5 text-accent-amber" />
                  <span className="text-[11px] font-semibold text-text-primary">Q2 Prediction</span>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-lg font-bold text-gradient-cyan">$8.4M</div>
                  <p className="text-[10px] text-text-secondary mt-0.5">Projected Q2 revenue (+12% over target)</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3.5 h-3.5 text-accent-cyan" />
                  <span className="text-[11px] font-semibold text-text-primary">Key Signals</span>
                </div>
                {['Enterprise pipeline +34%', 'Mid-market churn -8%', 'NRR trending to 148%'].map((signal, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-accent-cyan" />
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full max-h-[380px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Activity Feed</h3>
              </div>
              <StatusIndicator status="active" label="Live" />
            </div>
            <div className="space-y-1 overflow-y-auto max-h-[300px] pr-1">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 py-2.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] rounded-lg px-2 transition-colors cursor-pointer"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    item.type === 'ai' ? 'bg-accent-cyan/15 text-accent-cyan' :
                    item.type === 'deal' ? 'bg-accent-emerald/15 text-accent-emerald' :
                    item.type === 'alert' ? 'bg-accent-rose/15 text-accent-rose' :
                    'bg-accent-violet/15 text-accent-violet'
                  }`}>
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-text-primary">
                      <span className="font-medium">{item.user}</span>{' '}
                      <span className="text-text-secondary">{item.action}</span>{' '}
                      <span className="font-medium text-accent-cyan">{item.target}</span>
                      {item.value && <span className="text-accent-emerald font-semibold ml-1">{item.value}</span>}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Team Productivity */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full max-h-[380px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-violet" />
                <h3 className="text-sm font-semibold text-text-primary">Team Performance</h3>
              </div>
            </div>
            <div className="space-y-3">
              {teamData.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 group hover:bg-white/[0.02] rounded-xl p-2 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-text-primary shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-text-primary">{member.name}</p>
                      <span className="text-[10px] font-semibold text-accent-cyan">{member.progress}%</span>
                    </div>
                    <p className="text-[10px] text-text-muted">{member.role} · {member.deals} deals · ${(member.revenue / 1000000).toFixed(1)}M</p>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full max-h-[380px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">AI Recommendations</h3>
              </div>
            </div>
            <div className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className={`p-3 rounded-xl border cursor-pointer hover:bg-white/[0.03] transition-all ${
                    rec.impact === 'critical' ? 'border-accent-rose/20 bg-accent-rose/[0.03]' :
                    rec.impact === 'high' ? 'border-accent-cyan/20 bg-accent-cyan/[0.03]' :
                    'border-white/[0.06] bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-semibold text-text-primary">{rec.title}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      rec.impact === 'critical' ? 'bg-accent-rose/15 text-accent-rose' :
                      rec.impact === 'high' ? 'bg-accent-cyan/15 text-accent-cyan' :
                      'bg-accent-amber/15 text-accent-amber'
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-relaxed">{rec.description}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-muted">Confidence:</span>
                      <span className="text-[10px] font-semibold text-accent-cyan">{rec.confidence}%</span>
                    </div>
                    <span className="text-[10px] font-semibold text-accent-emerald">{rec.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
