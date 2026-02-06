import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertCircle } from "lucide-react";

interface BudgetUsageCardProps {
  allocated: number;
  spent: number;
  delay?: number;
}

export function BudgetUsageCard({ allocated, spent, delay = 0 }: BudgetUsageCardProps) {
  const [animatedSpent, setAnimatedSpent] = useState(0);
  const percentage = (animatedSpent / allocated) * 100;
  const remaining = allocated - spent;
  const isOverBudget = spent > allocated;
  const daysLeft = 24; // Days left in month

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = spent / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= spent) {
        setAnimatedSpent(spent);
        clearInterval(timer);
      } else {
        setAnimatedSpent(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [spent]);

  const dailyBudget = remaining / daysLeft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Budget Usage</h3>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          isOverBudget 
            ? "bg-destructive/20 text-destructive" 
            : percentage > 80 
              ? "bg-warning/20 text-warning" 
              : "bg-success/20 text-success"
        }`}>
          {percentage.toFixed(0)}% used
        </span>
      </div>

      {/* Main progress */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Progress 
            value={Math.min(percentage, 100)} 
            className={`h-4 ${isOverBudget ? "[&>div]:bg-destructive" : percentage > 80 ? "[&>div]:bg-warning" : ""}`}
          />
          {/* Animated glow on progress */}
          <motion.div
            className="absolute top-0 left-0 h-4 rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
            animate={{ 
              boxShadow: isOverBudget 
                ? ["0 0 10px hsl(var(--destructive) / 0.5)", "0 0 20px hsl(var(--destructive) / 0.3)", "0 0 10px hsl(var(--destructive) / 0.5)"]
                : ["0 0 10px hsl(var(--primary) / 0.3)", "0 0 15px hsl(var(--primary) / 0.2)", "0 0 10px hsl(var(--primary) / 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            ${animatedSpent.toLocaleString()} spent
          </span>
          <span className="text-muted-foreground">
            ${allocated.toLocaleString()} budget
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="p-3 rounded-xl bg-secondary/50"
        >
          <p className="text-xs text-muted-foreground mb-1">Remaining</p>
          <p className={`text-xl font-bold ${isOverBudget ? "text-destructive" : "text-foreground"}`}>
            {isOverBudget ? "-" : ""}${Math.abs(remaining).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="p-3 rounded-xl bg-secondary/50"
        >
          <p className="text-xs text-muted-foreground mb-1">Daily Budget</p>
          <p className="text-xl font-bold text-primary">
            ${dailyBudget > 0 ? dailyBudget.toFixed(0) : 0}/day
          </p>
        </motion.div>
      </div>

      {/* Warning or tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.5 }}
        className={`mt-4 p-3 rounded-xl flex items-center gap-3 ${
          isOverBudget 
            ? "bg-destructive/10 border border-destructive/20" 
            : "bg-primary/10 border border-primary/20"
        }`}
      >
        {isOverBudget ? (
          <>
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">
              You're over budget! Consider reducing expenses.
            </p>
          </>
        ) : (
          <>
            <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              On track! You have <span className="text-primary font-medium">${remaining.toLocaleString()}</span> left for {daysLeft} days.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
