import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Shield, Sparkles, Database, Trash2, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationPanel() {
  const { notificationsOpen, setNotificationsOpen, alerts, setAlerts } = useApp();

  if (!notificationsOpen) return null;

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'acknowledged' as const } : a))
    );
  };

  const clearAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAll = () => {
    setAlerts([]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setNotificationsOpen(false)}>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-bg-surface border-l border-white/[0.08] shadow-2xl p-6 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-accent-violet/10 flex items-center justify-center text-accent-violet">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Operational Alerts
                </h3>
                <p className="text-[9px] text-text-muted mt-0.5">
                  {alerts.length} systems notifications active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {alerts.length > 0 && (
                <button
                  onClick={clearAll}
                  className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-text-muted hover:text-accent-rose hover:bg-accent-rose/10 transition-colors"
                  title="Clear all alerts"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setNotificationsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Alerts stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert) => {
                const Icon =
                  alert.type === 'opportunity' ? Sparkles :
                  alert.type === 'threat' ? Shield : Database;

                const borderClass =
                  alert.status === 'new'
                    ? alert.type === 'threat'
                      ? 'border-accent-rose/30 bg-accent-rose/5'
                      : alert.type === 'opportunity'
                      ? 'border-accent-emerald/30 bg-accent-emerald/5'
                      : 'border-accent-cyan/30 bg-accent-cyan/5'
                    : 'border-white/[0.04] bg-white/[0.01]';

                const iconClass =
                  alert.type === 'threat' ? 'text-accent-rose bg-accent-rose/10' :
                  alert.type === 'opportunity' ? 'text-accent-emerald bg-accent-emerald/10' :
                  'text-accent-cyan bg-accent-cyan/10';

                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-3.5 rounded-xl border flex gap-3 transition-all relative ${borderClass}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-[11px] font-medium leading-relaxed text-text-primary">
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[8px] font-mono text-text-muted">{alert.time}</span>
                        {alert.status === 'new' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute right-3 top-3 flex flex-col gap-1.5">
                      {alert.status === 'new' && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="text-text-muted hover:text-accent-emerald transition-colors"
                          title="Acknowledge alert"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => clearAlert(alert.id)}
                        className="text-text-muted hover:text-accent-rose transition-colors"
                        title="Dismiss alert"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                <CheckCircle className="w-8 h-8 text-accent-emerald mb-2 animate-bounce" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  All Systems Clear
                </h4>
                <p className="text-[10px] text-text-muted mt-1">
                  Zero active threats or competitive signals flagged.
                </p>
              </div>
            )}
          </div>

          {/* Footer diagnostic summary */}
          <div className="border-t border-white/[0.06] pt-4 shrink-0">
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between text-[10px] font-mono text-text-muted">
              <span>Threat Level:</span>
              <span className="text-accent-emerald font-bold uppercase">Nominal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
