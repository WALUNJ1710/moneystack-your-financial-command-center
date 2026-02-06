import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Repeat, Send } from "lucide-react";

const actions = [
  {
    id: 1,
    label: "Send Money",
    icon: Send,
    color: "bg-primary/20 text-primary hover:bg-primary/30",
  },
  {
    id: 2,
    label: "Receive",
    icon: ArrowDownLeft,
    color: "bg-emerald/20 text-emerald hover:bg-emerald/30",
  },
  {
    id: 3,
    label: "Transfer",
    icon: Repeat,
    color: "bg-cyan/20 text-cyan hover:bg-cyan/30",
  },
  {
    id: 4,
    label: "Invest",
    icon: ArrowUpRight,
    color: "bg-warning/20 text-warning hover:bg-warning/30",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${action.color}`}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
