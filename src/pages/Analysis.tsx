import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", income: 4200, expenses: 3100 },
  { month: "Feb", income: 4800, expenses: 3400 },
  { month: "Mar", income: 5100, expenses: 2900 },
  { month: "Apr", income: 4600, expenses: 3800 },
  { month: "May", income: 5500, expenses: 3200 },
  { month: "Jun", income: 6200, expenses: 3600 },
];

const categoryData = [
  { name: "Housing", value: 1850, color: "hsl(142, 100%, 50%)" },
  { name: "Food", value: 620, color: "hsl(160, 84%, 39%)" },
  { name: "Transport", value: 340, color: "hsl(187, 85%, 53%)" },
  { name: "Shopping", value: 480, color: "hsl(38, 92%, 50%)" },
  { name: "Entertainment", value: 180, color: "hsl(280, 70%, 50%)" },
  { name: "Utilities", value: 250, color: "hsl(200, 70%, 50%)" },
];

const weeklySpending = [
  { day: "Mon", amount: 85 },
  { day: "Tue", amount: 120 },
  { day: "Wed", amount: 45 },
  { day: "Thu", amount: 180 },
  { day: "Fri", amount: 220 },
  { day: "Sat", amount: 340 },
  { day: "Sun", amount: 95 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-glass">
        <p className="text-sm font-medium mb-1">{label}</p>
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

const Analysis = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Analysis</h1>
          <p className="text-muted-foreground">Deep dive into your financial patterns</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Average Monthly Income", value: "$5,066", trend: "+12.4%" },
            { label: "Average Monthly Expenses", value: "$3,333", trend: "-5.2%" },
            { label: "Net Savings Rate", value: "34.2%", trend: "+8.1%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                {stat.trend} vs last period
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(142, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" stroke="hsl(142, 100%, 50%)" strokeWidth={2} fill="url(#incomeGradient)" />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(187, 85%, 53%)" strokeWidth={2} fill="url(#expenseGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Spending by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => <span className="text-muted-foreground text-xs">{value}</span>}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Spending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-4">Weekly Spending Pattern</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="hsl(142, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
