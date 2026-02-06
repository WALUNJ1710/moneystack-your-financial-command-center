import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  icon: LucideIcon;
  delay?: number;
  variant?: "default" | "primary" | "emerald" | "cyan";
}

export function StatCard({
  title,
  value,
  prefix = "$",
  suffix = "",
  change,
  icon: Icon,
  delay = 0,
  variant = "default",
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const variantStyles = {
    default: "from-card to-card",
    primary: "from-primary/10 to-card",
    emerald: "from-emerald/10 to-card",
    cyan: "from-cyan/10 to-card",
  };

  const iconStyles = {
    default: "bg-secondary text-muted-foreground",
    primary: "bg-primary/20 text-primary",
    emerald: "bg-emerald/20 text-emerald",
    cyan: "bg-cyan/20 text-cyan",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`stat-card bg-gradient-to-br ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {change !== undefined && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3 }}
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              change >= 0
                ? "bg-success/20 text-success"
                : "bg-destructive/20 text-destructive"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </motion.span>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <motion.p
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </motion.p>
      </div>
    </motion.div>
  );
}
