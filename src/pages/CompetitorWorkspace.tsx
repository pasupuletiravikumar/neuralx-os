import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { competitors } from '../data/mockData';
import GlassCard from '../components/ui/GlassCard';

export default function CompetitorWorkspace() {
  const { selectedCompetitorId, setSelectedCompetitorId, setCopilotOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'swot' | 'funnel' | 'matrix'>('swot');

  const selectedCompetitor = competitors.find((c) => c.id === selectedCompetitorId) || competitors[0];

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
          <div className="flex items-center gap-2 text-accent-violet mb-1.5">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Strategic Comparisons</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary">
            COMPETITOR INTELLIGENCE WORKSPACE
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Analyze market positioning matrices, SWOT vectors, and customer acquisition funnels.
          </p>
        </div>
      </motion.div>

      {/* Main Grid split: left selector, right Workspace details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Competitors List selector */}
        <motion.div variants={fadeUp} className="lg:col-span-1 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-1 block">
            Select Competitor
          </span>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {competitors.map((comp) => {
              const isSel = comp.id === selectedCompetitorId;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompetitorId(comp.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex flex-col justify-between shrink-0 lg:shrink transition-all ${
                    isSel
                      ? 'border-accent-violet/30 bg-accent-violet/5 shadow-md'
                      : 'border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                  style={{ minWidth: '180px' }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-text-primary">{comp.name}</span>
                    <span className="text-[9px] font-mono text-text-muted">{comp.marketShare}% Share</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-text-secondary">
                    <span>${comp.revenue}M Rev</span>
                    <span className={comp.growthVelocity === 'Accelerating' ? 'text-accent-emerald' : 'text-text-muted'}>
                      {comp.growthVelocity}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right workspace panels */}
        <motion.div variants={fadeUp} className="lg:col-span-3 space-y-6">
          {/* Header switch tabs */}
          <div className="flex bg-white/[0.02] border border-white/[0.04] p-1 rounded-xl w-fit">
            {[
              { key: 'swot' as const, label: 'SWOT Vector' },
              { key: 'funnel' as const, label: 'Acquisition Funnel' },
              { key: 'matrix' as const, label: 'Comparison Matrix' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel render */}
          <AnimatePresence mode="wait">
            {activeTab === 'swot' && (
              <motion.div
                key="swot"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Strengths */}
                <GlassCard hover={false} className="border-l-2 border-l-accent-emerald">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.04] mb-3">
                    <Award className="w-4 h-4 text-accent-emerald" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-emerald">
                      Strengths
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedCompetitor.swot.strengths.map((str, idx) => (
                      <li key={idx} className="text-xs text-text-primary leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald mt-1.5 shrink-0" />
                        {str}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* Weaknesses */}
                <GlassCard hover={false} className="border-l-2 border-l-accent-rose">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.04] mb-3">
                    <AlertTriangle className="w-4 h-4 text-accent-rose" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-rose">
                      Weaknesses
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedCompetitor.swot.weaknesses.map((weak, idx) => (
                      <li key={idx} className="text-xs text-text-primary leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-rose mt-1.5 shrink-0" />
                        {weak}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* Opportunities */}
                <GlassCard hover={false} className="border-l-2 border-l-accent-cyan">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.04] mb-3">
                    <TrendingUp className="w-4 h-4 text-accent-cyan" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                      Opportunities
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedCompetitor.swot.opportunities.map((opp, idx) => (
                      <li key={idx} className="text-xs text-text-primary leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 shrink-0" />
                        {opp}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* Threats */}
                <GlassCard hover={false} className="border-l-2 border-l-accent-amber">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.04] mb-3">
                    <Shield className="w-4 h-4 text-accent-amber" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-amber">
                      Threats
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedCompetitor.swot.threats.map((thr, idx) => (
                      <li key={idx} className="text-xs text-text-primary leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 shrink-0" />
                        {thr}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'funnel' && (
              <motion.div
                key="funnel"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-6"
              >
                <GlassCard hover={false}>
                  <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] mb-6">
                    <Target className="w-4 h-4 text-accent-violet" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Acquisition Funnel conversion
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: 'Awareness Rate', value: selectedCompetitor.funnel.awareness, color: 'from-accent-cyan to-accent-cyan/60' },
                      { label: 'Consideration Index', value: selectedCompetitor.funnel.consideration, color: 'from-accent-violet to-accent-violet/60' },
                      { label: 'Final Conversion Rate', value: selectedCompetitor.funnel.conversion, color: 'from-accent-emerald to-accent-emerald/60' }
                    ].map((step) => (
                      <div key={step.label} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-text-secondary">{step.label}</span>
                          <span className="text-text-primary">{step.value}%</span>
                        </div>
                        <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
                            style={{ width: `${step.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'matrix' && (
              <motion.div
                key="matrix"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <GlassCard hover={false}>
                  <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] mb-6">
                    <Activity className="w-4 h-4 text-accent-cyan" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Positioning Diagnostic Matrix
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Customer CAC', value: `$${selectedCompetitor.cac.toLocaleString()}`, note: 'Customer acquisition cost' },
                      { label: 'LTV Index', value: `$${selectedCompetitor.ltv.toLocaleString()}`, note: 'Customer lifetime value' },
                      { label: 'Acquisition Probability', value: `${selectedCompetitor.acquisitionProbability}%`, note: 'Corporate buyout viability' }
                    ].map((cell) => (
                      <div
                        key={cell.label}
                        className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          {cell.label}
                        </span>
                        <h4 className="text-lg font-black text-text-primary mt-2">{cell.value}</h4>
                        <p className="text-[8px] text-text-muted mt-1 uppercase font-mono">{cell.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-cyan">
                        AI Competitive Analyst Note
                      </span>
                      <p className="text-xs text-text-primary mt-1.5 leading-relaxed">
                        {selectedCompetitor.name} targets {selectedCompetitor.targetAudience} using a{' '}
                        {selectedCompetitor.pricingModel} model. Their estimated price point is{' '}
                        {selectedCompetitor.pricePoint}. With an acquisition probability of{' '}
                        {selectedCompetitor.acquisitionProbability}%, they represent a{' '}
                        {selectedCompetitor.acquisitionProbability > 30 ? 'High Viability' : 'Low Viability'}{' '}
                        strategic buyout target.
                      </p>
                      <button
                        onClick={() => setCopilotOpen(true)}
                        className="mt-3 text-[10px] font-bold text-accent-cyan hover:underline uppercase tracking-wider flex items-center gap-1"
                      >
                        Ask Copilot for custom comparison reports <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
