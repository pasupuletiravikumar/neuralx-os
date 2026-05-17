import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Activity, Cpu, Wifi, Shield, Zap, AlertTriangle,
  Radio, Globe, Server, Eye, Target, TrendingUp
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import StatusIndicator from '../components/ui/StatusIndicator';
import { aiSystemModules, aiSignals } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const signalIcons = {
  expansion: Globe,
  risk: AlertTriangle,
  opportunity: Target,
  anomaly: Eye,
  prediction: TrendingUp,
};

const signalColors = {
  expansion: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
  risk: 'text-accent-rose bg-accent-rose/10 border-accent-rose/20',
  opportunity: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20',
  anomaly: 'text-accent-amber bg-accent-amber/10 border-accent-amber/20',
  prediction: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20',
};

function NeuralCore() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-accent-cyan/20"
        style={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.05)' }}
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-accent-violet/20"
      />
      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-accent-cyan/30"
      />
      {/* Core orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-12 rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 backdrop-blur-lg"
        style={{ boxShadow: '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(139, 92, 246, 0.1), inset 0 0 40px rgba(0, 240, 255, 0.1)' }}
      />
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-8 h-8 text-accent-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]" />
        </motion.div>
      </div>

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-accent-cyan' : 'bg-accent-violet'}`}
            style={{ boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(0,240,255,0.5)' : 'rgba(139,92,246,0.5)'}` }}
          />
        </motion.div>
      ))}

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
          className="absolute inset-12 rounded-full border border-accent-cyan/20"
        />
      ))}
    </div>
  );
}

export default function AICommandCenter() {
  const [liveLoad, setLiveLoad] = useState(aiSystemModules.map((m) => m.load));

  // Simulate live load changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLoad((prev) => prev.map((v) => Math.min(100, Math.max(10, v + (Math.random() - 0.5) * 8))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const avgLoad = Math.round(liveLoad.reduce((a, b) => a + b, 0) / liveLoad.length);
  const totalRequests = aiSystemModules.reduce((a, b) => a + b.requests, 0);
  const avgAccuracy = (aiSystemModules.reduce((a, b) => a + b.accuracy, 0) / aiSystemModules.length).toFixed(1);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-y-auto p-6 space-y-6">
      {/* Top Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Cpu, label: 'System Load', value: `${avgLoad}%`, color: avgLoad > 80 ? 'text-accent-amber' : 'text-accent-cyan' },
          { icon: Activity, label: 'Total Requests', value: `${(totalRequests / 1000).toFixed(1)}K`, color: 'text-accent-violet' },
          { icon: Shield, label: 'Avg Accuracy', value: `${avgAccuracy}%`, color: 'text-accent-emerald' },
          { icon: Wifi, label: 'Active Modules', value: `${aiSystemModules.filter((m) => m.status === 'active').length}/${aiSystemModules.length}`, color: 'text-accent-cyan' },
        ].map((stat, i) => (
          <div key={i} className="bg-bg-surface/50 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Neural Core Visualization */}
        <motion.div variants={fadeUp}>
          <GlassCard hover={false} className="h-full flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold mb-6 text-center">Neural Core</h3>
            <NeuralCore />
            <div className="mt-6 text-center">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[11px] text-accent-cyan font-medium"
              >
                Processing 2.4B data points/day
              </motion.p>
              <p className="text-[10px] text-text-muted mt-1">Neural Engine v3.2.1 — Active</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* System Modules */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-accent-violet" />
                <h3 className="text-sm font-semibold">AI System Modules</h3>
              </div>
              <StatusIndicator status="active" label="All Systems Nominal" />
            </div>
            <div className="space-y-2.5">
              {aiSystemModules.map((mod, i) => (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent-cyan/15 transition-all"
                >
                  <StatusIndicator status={mod.status as any} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-text-primary">{mod.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-text-muted">{mod.accuracy}% acc</span>
                        <span className="text-[10px] text-text-muted">{(mod.requests / 1000).toFixed(1)}K req</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${liveLoad[i]}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full rounded-full transition-colors ${
                            liveLoad[i] > 90 ? 'bg-accent-rose' :
                            liveLoad[i] > 75 ? 'bg-accent-amber' :
                            'bg-gradient-to-r from-accent-cyan to-accent-violet'
                          }`}
                        />
                      </div>
                      <span className={`text-[10px] font-semibold min-w-[32px] text-right ${
                        liveLoad[i] > 90 ? 'text-accent-rose' :
                        liveLoad[i] > 75 ? 'text-accent-amber' :
                        'text-accent-cyan'
                      }`}>
                        {Math.round(liveLoad[i])}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Signals */}
      <motion.div variants={fadeUp}>
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold">AI Signal Intelligence</h3>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent-cyan"
              />
            </div>
            <span className="text-[10px] text-text-muted">{aiSignals.length} active signals</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiSignals.map((signal, i) => {
              const Icon = signalIcons[signal.type];
              const colors = signalColors[signal.type];
              return (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`p-3 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all ${colors}`}
                >
                  <div className="flex items-start gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium leading-relaxed" style={{ color: 'inherit' }}>
                        {signal.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] opacity-70">{signal.time}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-semibold">Signal: {signal.strength}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Node Network Visualization */}
      <motion.div variants={fadeUp}>
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-accent-cyan" />
            <h3 className="text-sm font-semibold">Neural Network Topology</h3>
          </div>
          <div className="relative h-[200px] overflow-hidden rounded-xl">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              {/* Connection lines */}
              {[
                [100, 40, 250, 80], [100, 40, 250, 120], [100, 100, 250, 80], [100, 100, 250, 120], [100, 160, 250, 120], [100, 160, 250, 160],
                [250, 80, 400, 60], [250, 80, 400, 100], [250, 80, 400, 140], [250, 120, 400, 60], [250, 120, 400, 100], [250, 120, 400, 140], [250, 160, 400, 140],
                [400, 60, 550, 80], [400, 60, 550, 120], [400, 100, 550, 80], [400, 100, 550, 120], [400, 140, 550, 120],
                [550, 80, 700, 100], [550, 120, 700, 100],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(0, 240, 255, 0.1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
              ))}
              {/* Data flow animation */}
              {[
                [100, 40, 250, 80], [250, 80, 400, 100], [400, 100, 550, 120], [550, 120, 700, 100],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.circle
                  key={`flow-${i}`}
                  r="2"
                  fill="#00f0ff"
                  initial={{ cx: x1, cy: y1, opacity: 0 }}
                  animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.8))' }}
                />
              ))}
              {/* Nodes */}
              {[
                { x: 100, y: 40, label: 'Input' }, { x: 100, y: 100, label: '' }, { x: 100, y: 160, label: '' },
                { x: 250, y: 80, label: '' }, { x: 250, y: 120, label: '' }, { x: 250, y: 160, label: '' },
                { x: 400, y: 60, label: '' }, { x: 400, y: 100, label: 'Hidden' }, { x: 400, y: 140, label: '' },
                { x: 550, y: 80, label: '' }, { x: 550, y: 120, label: '' },
                { x: 700, y: 100, label: 'Output' },
              ].map((node, i) => (
                <g key={i}>
                  <motion.circle
                    cx={node.x} cy={node.y} r="8"
                    fill="rgba(0, 240, 255, 0.15)"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="1"
                    animate={{ r: [8, 10, 8] }}
                    transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.3))' }}
                  />
                  <circle cx={node.x} cy={node.y} r="3" fill="#00f0ff" />
                  {node.label && (
                    <text x={node.x} y={node.y + 22} textAnchor="middle" fill="#64748b" fontSize="9">{node.label}</text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
