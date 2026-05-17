import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  CheckCircle,
  Clock,
  Archive,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { StrategicRecommendation } from '../data/mockData';
import GlassCard from '../components/ui/GlassCard';

export default function AISecStrategyEngine() {
  const { activeRecommendations, setActiveRecommendations } = useApp();

  const changeStatus = (id: string, newStatus: StrategicRecommendation['status']) => {
    setActiveRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const totalProjectedARR = activeRecommendations
    .filter((r) => r.status !== 'Archived')
    .reduce((acc, curr) => acc + curr.projectedRevenue, 0)
    .toFixed(1);

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
          <div className="flex items-center gap-2 text-accent-amber mb-1.5">
            <Brain className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Tactical Strategy Engine</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary">
            AI STRATEGY & ADVISORY COMMAND
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Validate actionable commercial recommendations, compute ARR lifts, and approve strategic expansions.
          </p>
        </div>
        <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center gap-4">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted">
              Projected Annual Yield
            </span>
            <h4 className="text-base font-black text-accent-emerald leading-tight">
              ${totalProjectedARR} Million
            </h4>
          </div>
          <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Strategic recommendations grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeRecommendations.map((rec) => {
          const typeColor =
            rec.category === 'Expansion' ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20' :
            rec.category === 'Pricing' ? 'text-accent-violet bg-accent-violet/10 border-accent-violet/20' :
            rec.category === 'Acquisition' ? 'text-accent-rose bg-accent-rose/10 border-accent-rose/20' :
            'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20';

          const statusColor =
            rec.status === 'Ready' ? 'text-accent-cyan bg-accent-cyan/10' :
            rec.status === 'In Progress' ? 'text-accent-amber bg-accent-amber/10' :
            'text-text-muted bg-white/[0.02]';

          return (
            <GlassCard key={rec.id} hover={false} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 ${typeColor}`}>
                    {rec.category} Focus
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider rounded px-2 py-0.5 ${statusColor}`}>
                    {rec.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-text-primary mt-3 leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  {rec.description}
                </p>

                {/* Key diagnostics */}
                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted block">
                      Impact Index
                    </span>
                    <span className="text-xs font-black text-text-primary mt-1 block">
                      {rec.impactScore}/100
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted block">
                      Confidence
                    </span>
                    <span className="text-xs font-black text-accent-cyan mt-1 block">
                      {rec.confidenceRate}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted block">
                      Projected Lift
                    </span>
                    <span className="text-xs font-black text-accent-emerald mt-1 block">
                      +${rec.projectedRevenue}M
                    </span>
                  </div>
                </div>

                {/* Action steps */}
                <div className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-start gap-2.5">
                  <Award className="w-3.5 h-3.5 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent-amber">
                      Strategic Execution Target
                    </span>
                    <p className="text-[10px] text-text-primary mt-1 leading-snug">
                      {rec.actionItem}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status approval workflow triggers */}
              <div className="border-t border-white/[0.04] pt-4 mt-5 flex items-center justify-between gap-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted">
                  Update Stage
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => changeStatus(rec.id, 'Ready')}
                    disabled={rec.status === 'Ready'}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1 border ${
                      rec.status === 'Ready'
                        ? 'border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10 cursor-not-allowed'
                        : 'border-white/[0.06] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                    }`}
                  >
                    <CheckCircle className="w-3 h-3" /> Ready
                  </button>
                  <button
                    onClick={() => changeStatus(rec.id, 'In Progress')}
                    disabled={rec.status === 'In Progress'}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1 border ${
                      rec.status === 'In Progress'
                        ? 'border-accent-amber/30 text-accent-amber bg-accent-amber/10 cursor-not-allowed'
                        : 'border-white/[0.06] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                    }`}
                  >
                    <Clock className="w-3 h-3" /> In Progress
                  </button>
                  <button
                    onClick={() => changeStatus(rec.id, 'Archived')}
                    disabled={rec.status === 'Archived'}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1 border ${
                      rec.status === 'Archived'
                        ? 'border-accent-rose/30 text-accent-rose bg-accent-rose/10 cursor-not-allowed'
                        : 'border-white/[0.06] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                    }`}
                  >
                    <Archive className="w-3 h-3" /> Archive
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
