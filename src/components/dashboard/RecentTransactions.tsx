import { motion } from "framer-motion";
import {
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  Music,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Amazon Purchase",
    category: "Shopping",
    amount: -284.99,
    date: "Today, 2:30 PM",
    icon: ShoppingCart,
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "Income",
    amount: 5250.0,
    date: "Today, 9:00 AM",
    icon: ArrowDownLeft,
  },
  {
    id: 3,
    name: "Uber Eats",
    category: "Food & Dining",
    amount: -45.8,
    date: "Yesterday, 7:45 PM",
    icon: Utensils,
  },
  {
    id: 4,
    name: "Gas Station",
    category: "Transportation",
    amount: -62.5,
    date: "Yesterday, 3:20 PM",
    icon: Car,
  },
  {
    id: 5,
    name: "Electric Bill",
    category: "Utilities",
    amount: -128.0,
    date: "Feb 3, 2024",
    icon: Zap,
  },
  {
    id: 6,
    name: "Spotify Premium",
    category: "Entertainment",
    amount: -9.99,
    date: "Feb 2, 2024",
    icon: Music,
  },
];

export function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">
            Your latest financial activity
          </p>
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

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
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
  );
}
