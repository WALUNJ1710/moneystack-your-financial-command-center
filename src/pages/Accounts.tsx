import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Wallet, Plus, MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
  {
    id: 1,
    name: "Main Checking",
    institution: "Chase Bank",
    number: "**** 4829",
    balance: 12450.0,
    type: "checking",
    lastTransaction: "Today",
    trend: 5.2,
  },
  {
    id: 2,
    name: "Savings Account",
    institution: "Chase Bank",
    number: "**** 7391",
    balance: 28340.5,
    type: "savings",
    lastTransaction: "2 days ago",
    trend: 12.8,
  },
  {
    id: 3,
    name: "Investment Portfolio",
    institution: "Fidelity",
    number: "**** 2156",
    balance: 45890.25,
    type: "investment",
    lastTransaction: "Today",
    trend: -2.4,
  },
  {
    id: 4,
    name: "Credit Card",
    institution: "American Express",
    number: "**** 9012",
    balance: -2340.5,
    type: "credit",
    lastTransaction: "Yesterday",
    trend: 0,
  },
];

const Accounts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">Manage all your connected accounts</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </motion.div>

        {/* Total Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 text-center"
        >
          <p className="text-muted-foreground mb-2">Total Net Worth</p>
          <p className="text-5xl font-bold gradient-text">$84,340.25</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+8.4% from last month</span>
          </div>
        </motion.div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-secondary">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.institution}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-2xl font-bold ${account.balance < 0 ? 'text-destructive' : ''}`}>
                    {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{account.number}</p>
                </div>
                {account.trend !== 0 && (
                  <div className={`flex items-center gap-1 text-sm ${account.trend > 0 ? 'text-success' : 'text-destructive'}`}>
                    {account.trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{Math.abs(account.trend)}%</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Last activity: {account.lastTransaction}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
