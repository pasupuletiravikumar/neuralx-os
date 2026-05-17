import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { notifications } from '../../data/mockData';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  alert: AlertTriangle,
  insight: Sparkles,
  update: RefreshCw,
};

const typeColors = {
  alert: 'text-accent-amber',
  insight: 'text-accent-cyan',
  update: 'text-accent-violet',
};

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[380px] max-w-[90vw] bg-bg-elevated/95 backdrop-blur-2xl border-l border-white/[0.06] z-[91] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-accent-cyan" />
                <h2 className="text-sm font-semibold">Notifications</h2>
                <span className="text-[10px] bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded-full font-medium">
                  {notifications.filter((n) => !n.read).length} new
                </span>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex-1 overflow-y-auto py-2">
              {notifications.map((notif, i) => {
                const Icon = typeIcons[notif.type];
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                      !notif.read ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 ${typeColors[notif.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium text-text-primary">{notif.title}</p>
                          {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />}
                        </div>
                        <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-text-muted mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.06]">
              <button className="w-full text-center text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
