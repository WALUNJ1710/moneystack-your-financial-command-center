import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Sparkles } from "lucide-react";

interface TotalBalanceCardProps {
  balance: number;
  change: number;
  delay?: number;
}

export function TotalBalanceCard({ balance, change, delay = 0 }: TotalBalanceCardProps) {
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 80;
    const increment = balance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= balance) {
        setDisplayBalance(balance);
        clearInterval(timer);
      } else {
        setDisplayBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [balance]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-card via-card to-secondary/50"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-emerald/10 to-cyan/10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald/20 to-transparent rounded-full blur-2xl translate-y-24 -translate-x-24" />

      {/* Sparkle effects */}
      <motion.div
        className="absolute top-8 right-12"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="h-6 w-6 text-primary/50" />
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-24"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="h-4 w-4 text-emerald/50" />
      </motion.div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
            className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm"
          >
            <Wallet className="h-6 w-6 text-primary" />
          </motion.div>
          <div>
            <p className="text-muted-foreground text-sm">Total Balance</p>
            <p className="text-xs text-muted-foreground/60">All accounts combined</p>
          </div>
        </div>

        {/* Balance Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="mb-6"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-2xl font-light">$</span>
            <motion.span
              className="text-6xl font-bold tracking-tight gradient-text"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {displayBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </motion.span>
          </div>
        </motion.div>

        {/* Change indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.5 }}
          className="flex items-center gap-4"
        >
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            change >= 0 ? "bg-success/20" : "bg-destructive/20"
          }`}>
            <motion.span
              animate={{ y: change >= 0 ? [0, -2, 0] : [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`text-lg ${change >= 0 ? "text-success" : "text-destructive"}`}
            >
              {change >= 0 ? "↑" : "↓"}
            </motion.span>
            <span className={`font-semibold ${change >= 0 ? "text-success" : "text-destructive"}`}>
              {change >= 0 ? "+" : ""}{change}%
            </span>
          </div>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6 }}
          className="mt-8 pt-6 border-t border-border/50 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Checking", value: "$12,450" },
            { label: "Savings", value: "$28,340" },
            { label: "Investment", value: "$45,890" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.7 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
