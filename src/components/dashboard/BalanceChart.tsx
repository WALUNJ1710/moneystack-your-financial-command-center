import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", balance: 12400, income: 4000, expenses: 2400 },
  { name: "Feb", balance: 13500, income: 4500, expenses: 3400 },
  { name: "Mar", balance: 15800, income: 5200, expenses: 2900 },
  { name: "Apr", balance: 14200, income: 3800, expenses: 5400 },
  { name: "May", balance: 16900, income: 5500, expenses: 2800 },
  { name: "Jun", balance: 19200, income: 6100, expenses: 3800 },
  { name: "Jul", balance: 21800, income: 5800, expenses: 3200 },
  { name: "Aug", balance: 24500, income: 6500, expenses: 3800 },
  { name: "Sep", balance: 23100, income: 4200, expenses: 5600 },
  { name: "Oct", balance: 26400, income: 6800, expenses: 3500 },
  { name: "Nov", balance: 28900, income: 5900, expenses: 3400 },
  { name: "Dec", balance: 32450, income: 7200, expenses: 3650 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-glass">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function BalanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Balance Overview</h3>
          <p className="text-sm text-muted-foreground">
            Your financial performance this year
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(142, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0} />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220, 15%, 15%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(187, 85%, 53%)"
              strokeWidth={2}
              fill="url(#expensesGradient)"
              filter="url(#glow)"
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              filter="url(#glow)"
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="hsl(142, 100%, 50%)"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              filter="url(#glow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
