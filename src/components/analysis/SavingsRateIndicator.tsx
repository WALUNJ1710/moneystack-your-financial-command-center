import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SavingsRateIndicatorProps {
  rate: number;
  income: number;
  savings: number;
  previousRate?: number;
  delay?: number;
}

export function SavingsRateIndicator({
  rate,
  income,
  savings,
  previousRate,
  delay = 0,
}: SavingsRateIndicatorProps) {
  const [animatedRate, setAnimatedRate] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = rate / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= rate) {
        setAnimatedRate(rate);
        clearInterval(timer);
      } else {
        setAnimatedRate(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [rate]);

  const getColor = (r: number) => {
    if (r >= 30) return "text-success";
    if (r >= 20) return "text-primary";
    if (r >= 10) return "text-warning";
    return "text-destructive";
  };

  const getGradient = (r: number) => {
    if (r >= 30) return "from-success to-emerald-400";
    if (r >= 20) return "from-primary to-emerald";
    if (r >= 10) return "from-warning to-orange-400";
    return "from-destructive to-red-400";
  };

  const getMessage = (r: number) => {
    if (r >= 30) return "Excellent! You're saving like a pro 🏆";
    if (r >= 20) return "Great job! Keep up the good work 👏";
    if (r >= 10) return "Good start, but there's room to grow 📈";
    return "Consider cutting expenses to save more 💪";
  };

  const rateDiff = previousRate !== undefined ? rate - previousRate : 0;
  const circumference = 2 * Math.PI * 45;
  const progress = (animatedRate / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-2">Savings Rate</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Percentage of income saved
      </p>

      <div className="flex items-center gap-8">
        {/* Circular Progress */}
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--emerald))" />
              </linearGradient>
              <filter id="savingsGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="10"
            />

            {/* Progress circle */}
            <motion.circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="url(#savingsGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              transform="rotate(-90 60 60)"
              filter="url(#savingsGlow)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1.5, ease: "easeOut", delay }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`text-3xl font-bold ${getColor(animatedRate)}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
            >
              {animatedRate.toFixed(1)}%
            </motion.span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Monthly Income</p>
            <p className="text-xl font-bold text-success">${income.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Savings</p>
            <p className="text-xl font-bold text-primary">${savings.toLocaleString()}</p>
          </div>
          {previousRate !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${rateDiff >= 0 ? "text-success" : "text-destructive"}`}>
              {rateDiff >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{rateDiff >= 0 ? "+" : ""}{rateDiff.toFixed(1)}% vs last month</span>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1 }}
        className={`mt-6 p-3 rounded-xl bg-gradient-to-r ${getGradient(rate)}/10 border border-current/20`}
      >
        <p className={`text-sm font-medium ${getColor(rate)}`}>
          {getMessage(rate)}
        </p>
      </motion.div>
    </motion.div>
  );
}
