import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { AccountsOverview } from "@/components/dashboard/AccountsOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Alex</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your finances today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Balance"
            value={86680}
            icon={Wallet}
            change={12.5}
            delay={0}
            variant="primary"
          />
          <StatCard
            title="Monthly Income"
            value={12840}
            icon={TrendingUp}
            change={8.2}
            delay={0.1}
            variant="emerald"
          />
          <StatCard
            title="Monthly Expenses"
            value={4320}
            icon={TrendingDown}
            change={-3.1}
            delay={0.2}
            variant="cyan"
          />
          <StatCard
            title="Savings Goal"
            value={45000}
            icon={PiggyBank}
            suffix=" / $60k"
            prefix="$"
            delay={0.3}
            variant="default"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>

          {/* Accounts Overview */}
          <div className="lg:col-span-1">
            <AccountsOverview />
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
};

export default Index;
