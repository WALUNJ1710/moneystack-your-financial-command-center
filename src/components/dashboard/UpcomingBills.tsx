import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingBills = [
  { id: 1, name: "Electric Bill", amount: 128, dueDate: "Feb 15", daysLeft: 9, status: "upcoming" },
  { id: 2, name: "Internet", amount: 79.99, dueDate: "Feb 18", daysLeft: 12, status: "upcoming" },
  { id: 3, name: "Netflix", amount: 15.99, dueDate: "Feb 20", daysLeft: 14, status: "upcoming" },
  { id: 4, name: "Phone Bill", amount: 85, dueDate: "Feb 22", daysLeft: 16, status: "upcoming" },
];

interface UpcomingBillsProps {
  delay?: number;
}

export function UpcomingBills({ delay = 0 }: UpcomingBillsProps) {
  const totalUpcoming = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-warning/20">
            <Calendar className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Upcoming Bills</h3>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${totalUpcoming.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">total due</p>
        </div>
      </div>

      <div className="space-y-3">
        {upcomingBills.map((bill, index) => (
          <motion.div
            key={bill.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                bill.daysLeft <= 3 ? "bg-destructive animate-pulse" :
                bill.daysLeft <= 7 ? "bg-warning" : "bg-muted-foreground"
              }`} />
              <div>
                <p className="font-medium text-sm">{bill.name}</p>
                <p className="text-xs text-muted-foreground">
                  Due {bill.dueDate} • {bill.daysLeft} days left
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">${bill.amount.toFixed(2)}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6 }}
        className="mt-4"
      >
        <Button
          variant="ghost"
          className="w-full text-primary hover:text-primary hover:bg-primary/10"
        >
          View all bills
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
