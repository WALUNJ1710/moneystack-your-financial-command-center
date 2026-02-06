import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Receipt, Plus, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const bills = [
  { id: 1, name: "Rent", amount: 1850, dueDate: "Feb 1", status: "paid", category: "Housing", recurring: true },
  { id: 2, name: "Electric Bill", amount: 128, dueDate: "Feb 15", status: "upcoming", category: "Utilities", recurring: true },
  { id: 3, name: "Internet", amount: 79.99, dueDate: "Feb 18", status: "upcoming", category: "Utilities", recurring: true },
  { id: 4, name: "Netflix", amount: 15.99, dueDate: "Feb 20", status: "upcoming", category: "Entertainment", recurring: true },
  { id: 5, name: "Spotify", amount: 9.99, dueDate: "Feb 2", status: "paid", category: "Entertainment", recurring: true },
  { id: 6, name: "Car Insurance", amount: 145, dueDate: "Feb 5", status: "overdue", category: "Insurance", recurring: true },
  { id: 7, name: "Phone Bill", amount: 85, dueDate: "Feb 22", status: "upcoming", category: "Utilities", recurring: true },
  { id: 8, name: "Gym Membership", amount: 49.99, dueDate: "Feb 25", status: "upcoming", category: "Health", recurring: true },
];

const statusConfig = {
  paid: { icon: CheckCircle2, color: "text-success", bg: "bg-success/20", label: "Paid" },
  upcoming: { icon: Clock, color: "text-cyan", bg: "bg-cyan/20", label: "Upcoming" },
  overdue: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/20", label: "Overdue" },
};

const Bills = () => {
  const paidBills = bills.filter(b => b.status === "paid");
  const upcomingBills = bills.filter(b => b.status === "upcoming");
  const overdueBills = bills.filter(b => b.status === "overdue");
  const upcomingTotal = upcomingBills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Bills</h1>
            <p className="text-muted-foreground">Manage your recurring payments</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Bill
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bills", value: bills.length, color: "text-foreground" },
            { label: "Paid This Month", value: paidBills.length, color: "text-success" },
            { label: "Upcoming", value: upcomingBills.length, color: "text-cyan" },
            { label: "Upcoming Total", value: `$${upcomingTotal.toFixed(2)}`, color: "text-primary" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card p-4 text-center"
            >
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Overdue Alert */}
        {overdueBills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 border-destructive/50 bg-destructive/10"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">You have {overdueBills.length} overdue bill(s)</p>
                <p className="text-sm text-muted-foreground">
                  Total: ${overdueBills.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bills List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="divide-y divide-border">
            {bills.map((bill, index) => {
              const status = statusConfig[bill.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={bill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-secondary">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bill.name}</p>
                      {bill.recurring && (
                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">Recurring</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{bill.category}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{bill.dueDate}</span>
                  </div>

                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </div>

                  <p className="font-semibold w-24 text-right">${bill.amount.toFixed(2)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Bills;
