import { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DollarSign, User, Star, TrendingUp, Briefcase } from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { pipelineDeals, pipelineStages } from '../data/mockData';
import type { Deal } from '../data/mockData';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

function DealCard({ deal, isDragging = false }: { deal: Deal; isDragging?: boolean }) {
  const scoreColor = deal.score >= 85 ? 'text-accent-emerald bg-accent-emerald/10' : deal.score >= 70 ? 'text-accent-cyan bg-accent-cyan/10' : 'text-accent-amber bg-accent-amber/10';

  return (
    <div className={`bg-bg-elevated/80 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3.5 cursor-grab active:cursor-grabbing group transition-all hover:border-accent-cyan/20 ${isDragging ? 'shadow-2xl shadow-accent-cyan/10 scale-105 rotate-2' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-text-primary">
            {deal.avatar}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-text-primary">{deal.company}</p>
            <p className="text-[10px] text-text-muted">{deal.industry}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${scoreColor}`}>
          {deal.score}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-sm font-bold text-accent-cyan">${(deal.value / 1000000).toFixed(1)}M</span>
        <span className="text-[10px] text-text-muted">{deal.probability}% prob</span>
      </div>
      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/[0.04]">
        <User className="w-3 h-3 text-text-muted" />
        <span className="text-[10px] text-text-secondary">{deal.contact}</span>
      </div>
      <p className="text-[10px] text-text-muted mt-1.5 italic">{deal.nextAction}</p>
    </div>
  );
}

function SortableDealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: deal.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DealCard deal={deal} />
    </div>
  );
}

export default function CRMPipeline() {
  const [deals, setDeals] = useState(pipelineDeals);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);


  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find((d) => d.id === event.active.id);
    if (deal) setActiveDeal(deal);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDeal(null);
    const { active, over } = event;
    if (!over) return;

    const overId = over.id as string;
    // Check if dropped on a stage column
    const targetStage = pipelineStages.find((s) => s.key === overId);
    if (targetStage) {
      setDeals((prev) => prev.map((d) => d.id === active.id ? { ...d, stage: targetStage.key } : d));
      return;
    }
    // Check if dropped on another deal
    const overDeal = deals.find((d) => d.id === overId);
    if (overDeal) {
      setDeals((prev) => prev.map((d) => d.id === active.id ? { ...d, stage: overDeal.stage } : d));
    }
  };

  const stageMetrics = pipelineStages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage.key);
    return {
      ...stage,
      count: stageDeals.length,
      value: stageDeals.reduce((sum, d) => sum + d.value, 0),
    };
  });

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const avgScore = Math.round(deals.reduce((sum, d) => sum + d.score, 0) / deals.length);
  const weightedPipeline = deals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="h-full overflow-hidden flex flex-col">
      {/* Top Metrics */}
      <motion.div variants={fadeUp} className="px-6 pt-5 pb-3 grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        <div className="bg-bg-surface/50 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-accent-cyan" />
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Total Pipeline</p>
            <AnimatedCounter value={totalValue} prefix="$" className="text-lg font-bold text-text-primary" />
          </div>
        </div>
        <div className="bg-bg-surface/50 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-violet/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-accent-violet" />
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Active Deals</p>
            <p className="text-lg font-bold text-text-primary">{deals.length}</p>
          </div>
        </div>
        <div className="bg-bg-surface/50 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-emerald/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-accent-emerald" />
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Weighted Pipeline</p>
            <AnimatedCounter value={weightedPipeline} prefix="$" className="text-lg font-bold text-text-primary" />
          </div>
        </div>
        <div className="bg-bg-surface/50 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-amber/10 flex items-center justify-center">
            <Star className="w-4 h-4 text-accent-amber" />
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Avg Lead Score</p>
            <p className="text-lg font-bold text-text-primary">{avgScore}</p>
          </div>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <motion.div variants={fadeUp} className="flex-1 overflow-x-auto px-6 pb-4">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 h-full min-w-max">
            {stageMetrics.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage.key);
              return (
                <SortableContext key={stage.key} id={stage.key} items={stageDeals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
                  <div className="w-[280px] flex flex-col bg-bg-surface/30 backdrop-blur-lg border border-white/[0.04] rounded-2xl overflow-hidden shrink-0">
                    {/* Column Header */}
                    <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                        <span className="text-xs font-semibold text-text-primary">{stage.label}</span>
                        <span className="text-[10px] bg-white/[0.06] text-text-secondary px-1.5 py-0.5 rounded-full">{stage.count}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-text-secondary">${(stage.value / 1000000).toFixed(1)}M</span>
                    </div>
                    {/* Cards */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                      {stageDeals.map((deal) => (
                        <SortableDealCard key={deal.id} deal={deal} />
                      ))}
                    </div>
                  </div>
                </SortableContext>
              );
            })}
          </div>
          <DragOverlay>
            {activeDeal && <DealCard deal={activeDeal} isDragging />}
          </DragOverlay>
        </DndContext>
      </motion.div>
    </motion.div>
  );
}
