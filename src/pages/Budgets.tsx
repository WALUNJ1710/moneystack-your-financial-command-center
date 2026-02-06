import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { ShoppingCart, Utensils, Car, Home, Zap, Music, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const budgets = [
  { id: 1, name: "Housing", icon: Home, allocated: 2000, spent: 1850, color: "bg-primary" },
  { id: 2, name: "Food & Dining", icon: Utensils, allocated: 800, spent: 620, color: "bg-emerald" },
  { id: 3, name: "Transportation", icon: Car, allocated: 400, spent: 340, color: "bg-cyan" },
  { id: 4, name: "Shopping", icon: ShoppingCart, allocated: 500, spent: 680, color: "bg-warning" },
  { id: 5, name: "Utilities", icon: Zap, allocated: 300, spent: 250, color: "bg-purple-500" },
  { id: 6, name: "Entertainment", icon: Music, allocated: 200, spent: 180, color: "bg-pink-500" },
];

const Budgets = () => {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Budgets</h1>
            <p className="text-muted-foreground">Track your spending limits</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Budget
          </Button>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Total Monthly Budget</p>
              <p className="text-3xl font-bold">${totalSpent.toLocaleString()} <span className="text-lg text-muted-foreground font-normal">/ ${totalAllocated.toLocaleString()}</span></p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Remaining</p>
              <p className={`text-2xl font-bold ${totalSpent > totalAllocated ? 'text-destructive' : 'text-success'}`}>
                ${(totalAllocated - totalSpent).toLocaleString()}
              </p>
            </div>
          </div>
          <Progress value={(totalSpent / totalAllocated) * 100} className="h-3 bg-secondary" />
          <p className="text-xs text-muted-foreground mt-2">{Math.round((totalSpent / totalAllocated) * 100)}% of budget used</p>
        </motion.div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const isOverBudget = budget.spent > budget.allocated;

            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${budget.color}/20`}>
                      <budget.icon className={`h-5 w-5 ${budget.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{budget.name}</h3>
                      <p className="text-xs text-muted-foreground">Monthly budget</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className={isOverBudget ? "text-destructive" : "text-foreground"}>
                      ${budget.spent.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">${budget.allocated.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-2 ${isOverBudget ? "[&>div]:bg-destructive" : ""}`}
                  />
                  <p className={`text-xs ${isOverBudget ? "text-destructive" : "text-muted-foreground"}`}>
                    {isOverBudget
                      ? `$${(budget.spent - budget.allocated).toLocaleString()} over budget`
                      : `$${(budget.allocated - budget.spent).toLocaleString()} remaining`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
