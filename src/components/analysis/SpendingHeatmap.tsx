import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DayData {
  date: string;
  day: number;
  amount: number;
}

interface SpendingHeatmapProps {
  data: DayData[];
  month: string;
  delay?: number;
}

export function SpendingHeatmap({ data, month, delay = 0 }: SpendingHeatmapProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  const getColor = (amount: number) => {
    if (amount === 0) return "bg-secondary/30";
    const intensity = amount / maxAmount;
    if (intensity > 0.8) return "bg-destructive";
    if (intensity > 0.6) return "bg-orange-500";
    if (intensity > 0.4) return "bg-warning";
    if (intensity > 0.2) return "bg-primary/70";
    return "bg-primary/30";
  };

  const getGlow = (amount: number) => {
    if (amount === 0) return "";
    const intensity = amount / maxAmount;
    if (intensity > 0.6) return "shadow-[0_0_8px] shadow-destructive/50";
    if (intensity > 0.3) return "shadow-[0_0_6px] shadow-warning/40";
    return "";
  };

  // Get weeks from data
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  // Fill in empty days at start
  const firstDayOfWeek = new Date(data[0]?.date || new Date()).getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ date: "", day: 0, amount: 0 });
  }

  data.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    // Fill remaining days
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", day: 0, amount: 0 });
    }
    weeks.push(currentWeek);
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Daily Spending</h3>
          <p className="text-sm text-muted-foreground">{month} spending heatmap</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-secondary/30" />
            <div className="w-3 h-3 rounded-sm bg-primary/30" />
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <div className="w-3 h-3 rounded-sm bg-warning" />
            <div className="w-3 h-3 rounded-sm bg-orange-500" />
            <div className="w-3 h-3 rounded-sm bg-destructive" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Day labels */}
      <div className="flex mb-2">
        <div className="w-8" /> {/* Spacer for week column */}
        {dayLabels.map((day) => (
          <div key={day} className="flex-1 text-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <motion.div
            key={weekIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + weekIndex * 0.05 }}
            className="flex items-center gap-1"
          >
            <div className="w-8 text-xs text-muted-foreground">W{weekIndex + 1}</div>
            {week.map((day, dayIndex) => (
              <Tooltip key={dayIndex}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`flex-1 aspect-square rounded-md transition-all cursor-pointer ${getColor(
                      day.amount
                    )} ${getGlow(day.amount)} ${day.day === 0 ? "opacity-20" : ""}`}
                  />
                </TooltipTrigger>
                {day.day > 0 && (
                  <TooltipContent className="glass-card border-border">
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">
                      Spent: <span className="text-foreground">${day.amount.toFixed(2)}</span>
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Total Spent</p>
          <p className="font-bold">${data.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg/Day</p>
          <p className="font-bold">
            ${(data.reduce((sum, d) => sum + d.amount, 0) / data.filter(d => d.day > 0).length).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Highest Day</p>
          <p className="font-bold text-destructive">${maxAmount.toFixed(0)}</p>
        </div>
      </div>
    </motion.div>
  );
}
