import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Globe, TrendingUp, DollarSign, Target, Users, CheckCircle, Clock, Zap, Star } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { investorMetrics, growthProjections, roadmapData } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const metricIcons = [DollarSign, Target, TrendingUp, Users, Clock, Star];

export default function Investor() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-y-auto">
      {/* Hero Section */}
      <motion.div variants={fadeUp} className="relative px-6 py-16 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent-violet/[0.04] rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-[11px] font-semibold text-accent-cyan">Series C — $86M Raised</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
            The Future of{' '}
            <span className="text-gradient-cyan">Business Intelligence</span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            NeuralX is building the AI-native operating system for enterprise strategy — 
            transforming how companies discover, analyze, and act on market intelligence.
          </p>
        </motion.div>
      </motion.div>

      <div className="px-6 pb-8 space-y-8">
        {/* Investor Metrics */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {investorMetrics.map((metric, i) => {
            const Icon = metricIcons[i];
            return (
              <GlassCard key={i} glow={i === 0 ? 'cyan' : 'none'} className="text-center">
                <Icon className="w-4 h-4 text-accent-cyan mx-auto mb-2" />
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix || ''}
                  suffix={metric.suffix || ''}
                  className="text-xl font-bold text-text-primary block"
                />
                <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-wider">{metric.label}</p>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* Growth Projections */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold">Growth Trajectory</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                  <span className="text-[10px] text-text-secondary">Revenue ($M)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent-violet" />
                  <span className="text-[10px] text-text-secondary">ARR ($M)</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthProjections}>
                  <defs>
                    <linearGradient id="growthRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="growthArr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
                        <p className="text-[10px] text-text-muted mb-1">{label}</p>
                        {payload.map((p: any, i: number) => (
                          <p key={i} className="text-[11px] font-medium" style={{ color: p.color }}>${p.value}M</p>
                        ))}
                      </div>
                    );
                  }} />
                  <Area type="monotone" dataKey="arr" stroke="#8b5cf6" strokeWidth={2} fill="url(#growthArr)" name="ARR" />
                  <Area type="monotone" dataKey="revenue" stroke="#00f0ff" strokeWidth={2} fill="url(#growthRev)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Storytelling — Why NeuralX */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Globe, title: 'Global Scale', desc: 'Operating across 42 countries with 98.7% uptime SLA. Processing 2.4B data points daily.', color: 'cyan' },
            { icon: TrendingUp, title: 'Category Leader', desc: 'Ranked #1 in Gartner Magic Quadrant for AI-Native BI. 340% YoY growth in enterprise segment.', color: 'violet' },
            { icon: Target, title: 'Massive TAM', desc: '$84B total addressable market by 2028. Only 12% penetrated. First-mover advantage in AI-native BI.', color: 'emerald' },
          ].map((card, i) => (
            <GlassCard key={i} glow={card.color as any}>
              <card.icon className={`w-8 h-8 mb-3 ${card.color === 'cyan' ? 'text-accent-cyan' : card.color === 'violet' ? 'text-accent-violet' : 'text-accent-emerald'}`} />
              <h4 className="text-sm font-bold text-text-primary mb-2">{card.title}</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed">{card.desc}</p>
            </GlassCard>
          ))}
        </motion.div>

        {/* Enterprise Roadmap */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-4 h-4 text-accent-violet" />
              <h3 className="text-sm font-semibold">Enterprise Roadmap</h3>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[17px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/30 via-accent-violet/30 to-transparent" />
              
              <div className="space-y-4">
                {roadmapData.map((item, i) => (
                  <motion.div
                    key={item.quarter}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex gap-4 relative"
                  >
                    <div className={`w-[34px] h-[34px] rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                      item.status === 'completed' ? 'border-accent-emerald bg-accent-emerald/10' :
                      item.status === 'current' ? 'border-accent-cyan bg-accent-cyan/10 animate-pulse' :
                      'border-white/[0.15] bg-bg-elevated'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle className="w-4 h-4 text-accent-emerald" /> :
                       item.status === 'current' ? <Zap className="w-4 h-4 text-accent-cyan" /> :
                       <Clock className="w-3.5 h-3.5 text-text-muted" />}
                    </div>
                    <div className={`flex-1 pb-4 ${item.status === 'current' ? 'bg-accent-cyan/[0.03] -mx-2 px-4 py-3 rounded-xl border border-accent-cyan/10' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-accent-cyan uppercase tracking-wider">{item.quarter}</span>
                        {item.status === 'current' && (
                          <span className="text-[9px] font-bold bg-accent-cyan/15 text-accent-cyan px-2 py-0.5 rounded-full">CURRENT</span>
                        )}
                      </div>
                      <p className="text-[12px] font-semibold text-text-primary">{item.title}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
