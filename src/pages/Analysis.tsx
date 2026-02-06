import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MonthYearSelector } from "@/components/analysis/MonthYearSelector";
import { ViewToggle } from "@/components/analysis/ViewToggle";
import { SavingsRateIndicator } from "@/components/analysis/SavingsRateIndicator";
import { SpendingHeatmap } from "@/components/analysis/SpendingHeatmap";
import { DateRangePicker } from "@/components/transactions/DateRangePicker";
import { DateRange } from "react-day-picker";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Activity } from "lucide-react";

// Monthly income vs expense data
const monthlyData = [
  { month: "Jan", income: 5200, expense: 3800, savings: 1400 },
  { month: "Feb", income: 5500, expense: 4100, savings: 1400 },
  { month: "Mar", income: 4800, expense: 3500, savings: 1300 },
  { month: "Apr", income: 6200, expense: 4200, savings: 2000 },
  { month: "May", income: 5800, expense: 3900, savings: 1900 },
  { month: "Jun", income: 6500, expense: 4500, savings: 2000 },
  { month: "Jul", income: 5900, expense: 4100, savings: 1800 },
  { month: "Aug", income: 6100, expense: 4300, savings: 1800 },
  { month: "Sep", income: 5700, expense: 4000, savings: 1700 },
  { month: "Oct", income: 6400, expense: 4600, savings: 1800 },
  { month: "Nov", income: 5500, expense: 3800, savings: 1700 },
  { month: "Dec", income: 7200, expense: 5200, savings: 2000 },
];

// Category spending data
const categoryData = [
  { name: "Housing", value: 1850, color: "hsl(160, 84%, 39%)" },
  { name: "Food", value: 680, color: "hsl(30, 100%, 50%)" },
  { name: "Transport", value: 420, color: "hsl(210, 100%, 50%)" },
  { name: "Shopping", value: 580, color: "hsl(280, 70%, 60%)" },
  { name: "Entertainment", value: 280, color: "hsl(330, 80%, 60%)" },
  { name: "Utilities", value: 320, color: "hsl(50, 100%, 50%)" },
  { name: "Health", value: 180, color: "hsl(0, 70%, 50%)" },
  { name: "Other", value: 150, color: "hsl(220, 10%, 50%)" },
];

// Account spending data
const accountData = [
  { name: "Main Checking", value: 2800, color: "hsl(142, 100%, 50%)" },
  { name: "Credit Card", value: 1200, color: "hsl(280, 70%, 60%)" },
  { name: "Savings", value: 450, color: "hsl(160, 84%, 39%)" },
  { name: "Google Pay", value: 380, color: "hsl(187, 85%, 53%)" },
  { name: "Cash", value: 230, color: "hsl(38, 92%, 50%)" },
];

// Weekly spending trend
const weeklyTrend = [
  { week: "Week 1", amount: 980, budget: 1050 },
  { week: "Week 2", amount: 1120, budget: 1050 },
  { week: "Week 3", amount: 890, budget: 1050 },
  { week: "Week 4", amount: 1250, budget: 1050 },
];

// Generate heatmap data
const generateHeatmapData = () => {
  const data = [];
  const daysInMonth = 28;
  for (let i = 1; i <= daysInMonth; i++) {
    data.push({
      date: `Feb ${i}, 2024`,
      day: i,
      amount: Math.random() * 300 + (Math.random() > 0.7 ? 200 : 0),
    });
  }
  return data;
};

const heatmapData = generateHeatmapData();

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-lg border-border">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">${entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analysis = () => {
  const [month, setMonth] = useState(1); // February
  const [year, setYear] = useState(2024);
  const [viewType, setViewType] = useState<"category" | "account">("category");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const pieData = viewType === "category" ? categoryData : accountData;
  const totalSpending = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Analysis</h1>
            <p className="text-muted-foreground">
              Deep insights into your financial patterns
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <MonthYearSelector
              month={month}
              year={year}
              onChange={(m, y) => {
                setMonth(m);
                setYear(y);
              }}
            />
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Income", value: "$6,500", change: "+12.5%", icon: TrendingUp, positive: true },
            { label: "Total Expenses", value: "$4,460", change: "-3.2%", icon: TrendingDown, positive: true },
            { label: "Net Savings", value: "$2,040", change: "+18.4%", icon: DollarSign, positive: true },
            { label: "Avg Daily", value: "$148", change: "+2.1%", icon: Activity, positive: true },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="glass-card p-4 group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className={`text-xs font-medium ${metric.positive ? "text-success" : "text-destructive"}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expense Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Income vs Expenses</h3>
                <p className="text-sm text-muted-foreground">Monthly comparison over time</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <span className="text-muted-foreground">Expenses</span>
                </div>
              </div>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGradientAnalysis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGradientAnalysis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glowGreen">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowRed">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="hsl(0, 72%, 51%)"
                    strokeWidth={2}
                    fill="url(#expenseGradientAnalysis)"
                    filter="url(#glowRed)"
                    name="Expenses"
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth={2}
                    fill="url(#incomeGradientAnalysis)"
                    filter="url(#glowGreen)"
                    name="Income"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Spending Breakdown</h3>
                <p className="text-sm text-muted-foreground">By {viewType}</p>
              </div>
              <ViewToggle value={viewType} onChange={setViewType} />
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="pieGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    filter="url(#pieGlow)"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2 max-h-[120px] overflow-y-auto">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${item.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({((item.value / totalSpending) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Spending Trend Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Weekly Spending</h3>
                <p className="text-sm text-muted-foreground">Compared to budget</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Spent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border-2 border-dashed border-muted-foreground" />
                  <span className="text-muted-foreground">Budget</span>
                </div>
              </div>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrend} barGap={8}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142, 100%, 50%)" />
                      <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
                    </linearGradient>
                    <filter id="barGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="amount"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    filter="url(#barGlow)"
                    name="Spent"
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="hsl(220, 10%, 50%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Budget"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Savings Rate */}
          <SavingsRateIndicator
            rate={31.4}
            income={6500}
            savings={2040}
            previousRate={28.2}
            delay={0.35}
          />
        </div>

        {/* Heatmap */}
        <SpendingHeatmap data={heatmapData} month="February 2024" delay={0.4} />
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
