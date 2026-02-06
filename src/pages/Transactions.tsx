import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, ShoppingCart, Utensils, Car, Home, Zap, Music, Coffee, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: 1, name: "Amazon Purchase", category: "Shopping", amount: -284.99, date: "Feb 6, 2024", time: "2:30 PM", icon: ShoppingCart, status: "completed" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 5250.0, date: "Feb 6, 2024", time: "9:00 AM", icon: ArrowDownLeft, status: "completed" },
  { id: 3, name: "Uber Eats", category: "Food & Dining", amount: -45.8, date: "Feb 5, 2024", time: "7:45 PM", icon: Utensils, status: "completed" },
  { id: 4, name: "Gas Station", category: "Transportation", amount: -62.5, date: "Feb 5, 2024", time: "3:20 PM", icon: Car, status: "completed" },
  { id: 5, name: "Rent Payment", category: "Housing", amount: -1850.0, date: "Feb 4, 2024", time: "10:00 AM", icon: Home, status: "completed" },
  { id: 6, name: "Electric Bill", category: "Utilities", amount: -128.0, date: "Feb 3, 2024", time: "2:00 PM", icon: Zap, status: "completed" },
  { id: 7, name: "Spotify Premium", category: "Entertainment", amount: -9.99, date: "Feb 2, 2024", time: "12:00 AM", icon: Music, status: "completed" },
  { id: 8, name: "Starbucks", category: "Food & Dining", amount: -6.75, date: "Feb 2, 2024", time: "8:30 AM", icon: Coffee, status: "completed" },
  { id: 9, name: "Flight Booking", category: "Travel", amount: -489.0, date: "Feb 1, 2024", time: "4:15 PM", icon: Plane, status: "pending" },
  { id: 10, name: "Freelance Payment", category: "Income", amount: 1200.0, date: "Feb 1, 2024", time: "11:00 AM", icon: ArrowDownLeft, status: "completed" },
];

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View and manage all your transactions</p>
          </div>
          <Button variant="outline" className="border-border">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <Button variant="outline" className="border-border">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          <div className="divide-y divide-border">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <div className={`p-3 rounded-xl ${transaction.amount > 0 ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                  <transaction.icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{transaction.name}</p>
                    {transaction.status === "pending" && (
                      <span className="text-xs px-2 py-0.5 bg-warning/20 text-warning rounded-full">Pending</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-success' : ''}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
