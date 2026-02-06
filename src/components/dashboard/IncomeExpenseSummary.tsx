import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface IncomeExpenseSummaryProps {
  income: number;
  expenses: number;
  delay?: number;
}

export function IncomeExpenseSummary({ income, expenses, delay = 0 }: IncomeExpenseSummaryProps) {
  const [animatedIncome, setAnimatedIncome] = useState(0);
  const [animatedExpenses, setAnimatedExpenses] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;

    const incomeIncrement = income / steps;
    const expenseIncrement = expenses / steps;

    let currentIncome = 0;
    let currentExpense = 0;

    const timer = setInterval(() => {
      currentIncome += incomeIncrement;
      currentExpense += expenseIncrement;

      if (currentIncome >= income) {
        setAnimatedIncome(income);
      } else {
        setAnimatedIncome(Math.floor(currentIncome));
      }

      if (currentExpense >= expenses) {
        setAnimatedExpenses(expenses);
      } else {
        setAnimatedExpenses(Math.floor(currentExpense));
      }

      if (currentIncome >= income && currentExpense >= expenses) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [income, expenses]);

  const netIncome = income - expenses;
  const savingsRate = ((netIncome / income) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Income */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="p-4 rounded-xl bg-success/10 border border-success/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-success/20">
              <ArrowDownLeft className="h-4 w-4 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <p className="text-2xl font-bold text-success">
            +${animatedIncome.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-success">
            <TrendingUp className="h-3 w-3" />
            <span>+12.5% vs last month</span>
          </div>
        </motion.div>

        {/* Expenses */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-destructive/20">
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
          <p className="text-2xl font-bold text-destructive">
            -${animatedExpenses.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
            <TrendingDown className="h-3 w-3" />
            <span>-3.2% vs last month</span>
          </div>
        </motion.div>
      </div>

      {/* Net Income */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.4 }}
        className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-emerald/10 border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net Income</p>
            <p className="text-3xl font-bold text-primary">
              +${netIncome.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <p className="text-2xl font-bold text-emerald">{savingsRate}%</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
