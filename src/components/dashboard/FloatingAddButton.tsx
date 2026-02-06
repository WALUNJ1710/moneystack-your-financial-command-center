import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Receipt, ArrowUpRight, ArrowDownLeft, Repeat } from "lucide-react";

const quickActions = [
  { id: 1, label: "Income", icon: ArrowDownLeft, color: "bg-success hover:bg-success/90" },
  { id: 2, label: "Expense", icon: ArrowUpRight, color: "bg-destructive hover:bg-destructive/90" },
  { id: 3, label: "Transfer", icon: Repeat, color: "bg-cyan hover:bg-cyan/90" },
];

export function FloatingAddButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Quick action buttons */}
            <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-primary-foreground shadow-lg ${action.color} transition-colors`}
                >
                  <span className="text-sm font-medium whitespace-nowrap">
                    Add {action.label}
                  </span>
                  <action.icon className="h-5 w-5" />
                </motion.button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-14 w-14 rounded-full bg-gradient-to-r from-primary via-emerald to-cyan shadow-lg shadow-primary/30 flex items-center justify-center group"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-emerald to-cyan blur-lg opacity-50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary-foreground" />
          ) : (
            <Plus className="h-6 w-6 text-primary-foreground" />
          )}
        </motion.div>

        {/* Tooltip */}
        {!isOpen && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute right-full mr-3 px-3 py-1.5 bg-card rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
          >
            Add Transaction
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
