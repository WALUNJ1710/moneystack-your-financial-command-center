import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeExpenseSummary } from "@/components/dashboard/IncomeExpenseSummary";
import { BudgetUsageCard } from "@/components/dashboard/BudgetUsageCard";
import { FinancialHealthGauge } from "@/components/dashboard/FinancialHealthGauge";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";
import { OverspendingAlert } from "@/components/dashboard/OverspendingAlert";
import { FloatingAddButton } from "@/components/dashboard/FloatingAddButton";
import { DashboardSkeleton, TransactionSkeleton } from "@/components/dashboard/DashboardSkeleton";
import {
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

const recentTransactions = [
  { id: 1, name: "Amazon Purchase", category: "Shopping", amount: -284.99, date: "Today, 2:30 PM", icon: ShoppingCart },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 5250.0, date: "Today, 9:00 AM", icon: ArrowDownLeft },
  { id: 3, name: "Uber Eats", category: "Food & Dining", amount: -45.8, date: "Yesterday, 7:45 PM", icon: Utensils },
  { id: 4, name: "Gas Station", category: "Transportation", amount: -62.5, date: "Yesterday, 3:20 PM", icon: Car },
  { id: 5, name: "Electric Bill", category: "Utilities", amount: -128.0, date: "Feb 3, 2024", icon: Zap },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-24">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">Alex</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview for February 2024
          </p>
        </motion.div>

        {/* Overspending Alert */}
        <OverspendingAlert
          category="Shopping"
          amount={680}
          budgetLimit={500}
          delay={0.1}
        />

        {/* Total Balance Card - Large Hero Section */}
        <TotalBalanceCard balance={86680.75} change={12.5} delay={0.2} />

        {/* Two Column Grid: Income/Expense + Budget Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpenseSummary income={12840} expenses={4320} delay={0.3} />
          <BudgetUsageCard allocated={4200} spent={3720} delay={0.4} />
        </div>

        {/* Three Column Grid: Health Gauge, Transactions, Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <p className="text-sm text-muted-foreground">Last 5 activities</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="space-y-2">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-xl ${
                      transaction.amount > 0
                        ? "bg-success/20 text-success"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <transaction.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0 ? "text-success" : "text-foreground"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Financial Health Gauge */}
          <FinancialHealthGauge score={74} delay={0.5} />
        </div>

        {/* Upcoming Bills */}
        <UpcomingBills delay={0.7} />
      </div>

      {/* Floating Add Transaction Button */}
      <FloatingAddButton />
    </DashboardLayout>
  );
};

export default Index;
