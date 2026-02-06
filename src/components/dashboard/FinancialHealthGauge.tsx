import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface FinancialHealthGaugeProps {
  score: number; // 0-100
  delay?: number;
}

export function FinancialHealthGauge({ score, delay = 0 }: FinancialHealthGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gaugeRef.current) {
      observer.observe(gaugeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, isVisible]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 60) return "text-primary";
    if (s >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Needs Work";
  };

  const getGradient = (s: number) => {
    if (s >= 80) return "from-success to-emerald";
    if (s >= 60) return "from-primary to-emerald";
    if (s >= 40) return "from-warning to-orange-500";
    return "from-destructive to-red-400";
  };

  // Calculate the arc for the gauge (semi-circle)
  const radius = 80;
  const circumference = Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  return (
    <motion.div
      ref={gaugeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-2">Financial Health Score</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Based on your spending habits, savings, and goals
      </p>

      <div className="relative flex flex-col items-center">
        {/* Gauge SVG */}
        <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--destructive))" />
              <stop offset="33%" stopColor="hsl(var(--warning))" />
              <stop offset="66%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--success))" />
            </linearGradient>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            filter="url(#gaugeGlow)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 2, ease: "easeOut", delay }}
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick, i) => {
            const angle = Math.PI - (tick / 100) * Math.PI;
            const x1 = 100 + (radius - 20) * Math.cos(angle);
            const y1 = 100 + (radius - 20) * -Math.sin(angle);
            const x2 = 100 + (radius - 28) * Math.cos(angle);
            const y2 = 100 + (radius - 28) * -Math.sin(angle);
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Score Display */}
        <div className="absolute bottom-0 text-center">
          <motion.span
            className={`text-5xl font-bold ${getScoreColor(animatedScore)}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.3, type: "spring" }}
          >
            {animatedScore}
          </motion.span>
          <motion.p
            className={`text-sm font-medium ${getScoreColor(animatedScore)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.8 }}
          >
            {getScoreLabel(animatedScore)}
          </motion.p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        {[
          { label: "Savings", value: 85, icon: "📈" },
          { label: "Spending", value: 72, icon: "💳" },
          { label: "Goals", value: 68, icon: "🎯" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 1 + index * 0.1 }}
            className="p-2"
          >
            <span className="text-lg">{item.icon}</span>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            <p className="text-sm font-semibold">{item.value}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
