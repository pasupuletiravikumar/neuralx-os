import { motion } from 'framer-motion';
import {
  Cpu,
  Activity,
  Sliders,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { labTimeSeriesData, simulationFactors } from '../data/mockData';
import GlassCard from '../components/ui/GlassCard';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AnalyticsLab() {
  const { simParameters, setSimParameters } = useApp();

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Adjust time-series datasets based on simulation parameters dynamically
  const simulatedChartData = labTimeSeriesData.map((data, idx) => {
    const cacReductionFactor = 1 + (simParameters.cacReduction / 100) * (idx / 30);
    const cagrBoostFactor = 1 + (simParameters.cagrShift / 100) * (idx / 30);
    const retentionFactor = 1 + (simParameters.retentionGain / 100) * (idx / 30);

    return {
      ...data,
      cac: Math.round(data.cac * cacReductionFactor),
      revenue: Math.round(data.revenue * cagrBoostFactor * retentionFactor),
      traffic: Math.round(data.traffic * (1 + (simParameters.cagrShift / 200) * (idx / 30)))
    };
  });

  const latestSimData = simulatedChartData[simulatedChartData.length - 1];
  const initialSimData = simulatedChartData[0];
  const netRevenueGrowth = (((latestSimData.revenue - initialSimData.revenue) / initialSimData.revenue) * 100).toFixed(1);

  const handleSliderChange = (key: 'cacReduction' | 'cagrShift' | 'retentionGain', val: number) => {
    setSimParameters((prev) => ({ ...prev, [key]: val }));
  };

  const resetSimulation = () => {
    setSimParameters({
      cacReduction: -20,
      cagrShift: 15,
      retentionGain: 8
    });
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
          <div className="flex items-center gap-2 text-accent-rose mb-1.5">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Predictive Data Science Lab</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary">
            PREDICTIVE GROWTH SIMULATOR
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Re-plot daily forecasted revenue curves, optimize CAC limits, and test NRR compound assumptions.
          </p>
        </div>
      </motion.div>

      {/* Workspace Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Simulation Controllers */}
        <motion.div variants={fadeUp} className="space-y-4">
          <GlassCard hover={false} className="flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent-rose" />
                <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Simulation Parameters
                </span>
              </div>
              <button
                onClick={resetSimulation}
                className="p-1 rounded bg-white/[0.02] border border-white/[0.06] text-text-muted hover:text-accent-rose transition-colors"
                title="Reset simulation parameters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-6 flex-1 py-2">
              {simulationFactors.map((factor) => {
                const key = factor.key as 'cacReduction' | 'cagrShift' | 'retentionGain';
                const curVal = simParameters[key];

                return (
                  <div key={factor.key} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">{factor.label}</span>
                      <span className="font-bold text-accent-rose">
                        {curVal > 0 ? '+' : ''}
                        {curVal}
                        {factor.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={factor.min}
                      max={factor.max}
                      value={curVal}
                      onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-accent-rose"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-cyan">
                  Interactive Simulator Note
                </span>
                <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">
                  Moving controllers directly re-plots expected time-series growth curves. These formulas leverage the baseline CAGR indexes linked to competitors.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Simulated Chart Projections */}
        <motion.div variants={fadeUp} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard hover={false} className="md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-rose" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Simulated Time-Series Projections
                </h3>
              </div>
              <span className="text-[9px] text-accent-rose font-bold uppercase tracking-wider font-mono">
                NET REVENUE GROWTH: +{netRevenueGrowth}%
              </span>
            </div>

            <div className="h-[260px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={simulatedChartData}>
                  <defs>
                    <linearGradient id="labRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="date" tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} interval={6} />
                  <YAxis tick={{ fill: '#a1a1aa', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-bg-elevated/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl text-[10px]">
                          <p className="font-bold text-accent-rose">{data.date}</p>
                          <p className="text-text-secondary mt-1">Expected Revenue: ${data.revenue.toLocaleString()}</p>
                          <p className="text-text-secondary">Expected CAC: ${data.cac.toLocaleString()}</p>
                          <p className="text-text-secondary">System Traffic: {data.traffic.toLocaleString()}</p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fill="url(#labRevenueGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="cac"
                    stroke="#06b6d4"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Metrics Outlets */}
          {[
            { label: 'Simulated Target Revenue', value: `$${latestSimData.revenue.toLocaleString()}`, unit: 'ARR Projections' },
            { label: 'Optimized CAC Target', value: `$${latestSimData.cac.toLocaleString()}`, unit: 'Cost per Acquisition' }
          ].map((out) => (
            <div
              key={out.label}
              className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                {out.label}
              </span>
              <h4 className="text-lg font-black text-text-primary mt-2">{out.value}</h4>
              <p className="text-[8px] text-text-muted mt-1 uppercase font-mono">{out.unit}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
