import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Server, ShieldCheck, Database, HardDrive, Wifi, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DiagnosticsPanel() {
  const { diagnosticsOpen, setDiagnosticsOpen } = useApp();

  const metrics = [
    { label: 'CPU Cluster Load', value: '18.4%', status: 'optimal', icon: Cpu },
    { label: 'Heap Memory Allocation', value: '254MB / 8GB', status: 'optimal', icon: HardDrive },
    { label: 'Network Latency Vector', value: '14 ms', status: 'optimal', icon: Wifi },
    { label: 'SOC-2 Compliance Authorization', value: 'Authorized', status: 'optimal', icon: ShieldCheck }
  ];

  const dbLogs = [
    { name: 'PLTR Foundry Datastore', status: 'SYNCED', latency: '4ms', color: 'text-accent-emerald' },
    { name: 'Looker Analytics Engine API', status: 'SYNCED', latency: '8ms', color: 'text-accent-emerald' },
    { name: 'Domo Connector Pipelines', status: 'STAGNANT', latency: '--', color: 'text-accent-amber' },
    { name: 'Tableau Reader Interface', status: 'SYNCED', latency: '12ms', color: 'text-accent-emerald' }
  ];

  if (!diagnosticsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDiagnosticsOpen(false)}>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-bg-surface border-l border-white/[0.08] shadow-2xl p-6 flex flex-col justify-between select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center text-white glow-cyan">
                <Server className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  System Diagnostics
                </h3>
                <p className="text-[9px] text-text-muted mt-0.5">
                  Cluster Node Telemetry Active
                </p>
              </div>
            </div>
            <button
              onClick={() => setDiagnosticsOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Telemetry Stream */}
          <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
            {/* Core Load Metrics */}
            <div className="space-y-3">
              <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted px-1 block">
                Cluster Core Indicators
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-text-muted mb-2">
                      <span className="text-[8px] font-bold uppercase tracking-wider truncate mr-1">{m.label}</span>
                      <m.icon className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                    </div>
                    <h4 className="text-xs font-black text-text-primary mt-1">{m.value}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Datastore Pipelines Sync Status */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-[8px] font-bold uppercase tracking-wider text-text-muted">
                  Warehouse Pipeline Synchronizers
                </span>
                <span className="text-[8px] font-mono text-accent-cyan flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin-slow" /> ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {dbLogs.map((log) => (
                  <div
                    key={log.name}
                    className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span className="text-[10px] font-semibold text-text-primary truncate" style={{ maxWidth: '160px' }}>
                        {log.name}
                      </span>
                    </div>
                    <div className="text-right flex items-center gap-2 font-mono text-[8px]">
                      <span className={`font-bold ${log.color}`}>{log.status}</span>
                      <span className="text-text-muted">({log.latency})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Node Info */}
          <div className="border-t border-white/[0.06] pt-4 shrink-0 text-center">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">
              Diagnostic Cluster ID: MP-NODE-5174-SEC
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
