import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OverspendingAlertProps {
  category: string;
  amount: number;
  budgetLimit: number;
  delay?: number;
}

export function OverspendingAlert({
  category,
  amount,
  budgetLimit,
  delay = 0,
}: OverspendingAlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const overAmount = amount - budgetLimit;
  const percentOver = ((overAmount / budgetLimit) * 100).toFixed(0);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ delay, duration: 0.4, type: "spring" }}
        className="relative overflow-hidden rounded-xl border border-destructive/30 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent p-4"
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-destructive/5"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex items-start gap-4">
          {/* Alert Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-3 rounded-xl bg-destructive/20 flex-shrink-0"
          >
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-destructive flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Overspending Alert
                </h4>
                <p className="text-sm text-foreground mt-1">
                  You've exceeded your <span className="font-semibold">{category}</span> budget by{" "}
                  <span className="text-destructive font-bold">${overAmount.toFixed(2)}</span>{" "}
                  ({percentOver}% over limit)
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress bar showing overspend */}
            <div className="mt-3 mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Budget: ${budgetLimit}</span>
                <span>Spent: ${amount}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-warning via-destructive to-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
                  transition={{ delay: delay + 0.3, duration: 0.8 }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Adjust Budget
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                View Details
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
