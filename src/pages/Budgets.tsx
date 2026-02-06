import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Utensils, 
  Car, 
  Home, 
  Zap, 
  Music, 
  Plus, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { AddEditBudgetModal } from "@/components/budgets/AddEditBudgetModal";
import { LucideIcon } from "lucide-react";

interface Budget {
  id: number;
  name: string;
  icon: LucideIcon;
  allocated: number;
  spent: number;
  color: string;
  suggestedBudget?: number;
}

const initialBudgets: Budget[] = [
  { id: 1, name: "Housing", icon: Home, allocated: 2000, spent: 1850, color: "bg-primary", suggestedBudget: 1500 },
  { id: 2, name: "Food & Dining", icon: Utensils, allocated: 800, spent: 620, color: "bg-emerald-500", suggestedBudget: 750 },
  { id: 3, name: "Transportation", icon: Car, allocated: 400, spent: 340, color: "bg-cyan-500", suggestedBudget: 500 },
  { id: 4, name: "Shopping", icon: ShoppingCart, allocated: 500, spent: 680, color: "bg-warning", suggestedBudget: 500 },
  { id: 5, name: "Utilities", icon: Zap, allocated: 300, spent: 250, color: "bg-purple-500", suggestedBudget: 400 },
  { id: 6, name: "Entertainment", icon: Music, allocated: 200, spent: 180, color: "bg-pink-500", suggestedBudget: 250 },
];

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const stats = useMemo(() => {
    const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overBudgetCount = budgets.filter((b) => b.spent > b.allocated).length;
    const nearLimitCount = budgets.filter((b) => {
      const percentage = (b.spent / b.allocated) * 100;
      return percentage >= 80 && percentage < 100;
    }).length;
    const onTrackCount = budgets.filter((b) => {
      const percentage = (b.spent / b.allocated) * 100;
      return percentage < 80;
    }).length;

    return {
      totalAllocated,
      totalSpent,
      remaining: totalAllocated - totalSpent,
      percentage: (totalSpent / totalAllocated) * 100,
      overBudgetCount,
      nearLimitCount,
      onTrackCount,
    };
  }, [budgets]);

  const handleEdit = (id: number) => {
    const budget = budgets.find((b) => b.id === id);
    if (budget) {
      setEditingBudget(budget);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSave = (budgetData: Partial<Budget>) => {
    if (budgetData.id) {
      // Edit existing
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === budgetData.id ? { ...b, ...budgetData } : b
        )
      );
    } else {
      // Add new
      const newBudget: Budget = {
        id: Date.now(),
        name: budgetData.name || "New Budget",
        icon: budgetData.icon || ShoppingCart,
        allocated: budgetData.allocated || 0,
        spent: 0,
        color: budgetData.color || "bg-primary",
        suggestedBudget: budgetData.suggestedBudget,
      };
      setBudgets((prev) => [...prev, newBudget]);
    }
    setEditingBudget(null);
  };

  const openAddModal = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Budgets</h1>
            <p className="text-muted-foreground">Track and manage your spending limits</p>
          </div>
          <Button 
            onClick={openAddModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Budget
          </Button>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-success/20">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{stats.onTrackCount}</p>
              <p className="text-sm text-muted-foreground">On Track</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-warning/20">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{stats.nearLimitCount}</p>
              <p className="text-sm text-muted-foreground">Near Limit</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-destructive/20">
              <TrendingUp className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{stats.overBudgetCount}</p>
              <p className="text-sm text-muted-foreground">Over Budget</p>
            </div>
          </motion.div>
        </div>

        {/* Total Budget Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Monthly Budget</p>
                <p className="text-3xl font-bold">
                  ${stats.totalSpent.toLocaleString()}{" "}
                  <span className="text-lg text-muted-foreground font-normal">
                    / ${stats.totalAllocated.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Remaining</p>
              <p
                className={`text-2xl font-bold ${
                  stats.remaining < 0 ? "text-destructive" : "text-success"
                }`}
              >
                {stats.remaining < 0 ? "-" : ""}${Math.abs(stats.remaining).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="relative mb-3">
            <Progress
              value={Math.min(stats.percentage, 100)}
              className={`h-4 bg-secondary ${
                stats.percentage > 100
                  ? "[&>div]:bg-destructive"
                  : stats.percentage > 80
                  ? "[&>div]:bg-warning"
                  : "[&>div]:bg-success"
              }`}
            />
            {/* Threshold markers */}
            <div className="absolute top-0 left-[80%] w-0.5 h-4 bg-warning/70" />
            <div className="absolute top-0 left-[100%] w-0.5 h-4 bg-destructive/70 -translate-x-0.5" />

            {/* Animated glow */}
            {stats.percentage >= 80 && (
              <motion.div
                className="absolute top-0 left-0 h-4 rounded-full pointer-events-none"
                style={{ width: `${Math.min(stats.percentage, 100)}%` }}
                animate={{
                  boxShadow:
                    stats.percentage > 100
                      ? [
                          "0 0 15px hsl(var(--destructive) / 0.5)",
                          "0 0 25px hsl(var(--destructive) / 0.3)",
                          "0 0 15px hsl(var(--destructive) / 0.5)",
                        ]
                      : [
                          "0 0 15px hsl(var(--warning) / 0.5)",
                          "0 0 25px hsl(var(--warning) / 0.3)",
                          "0 0 15px hsl(var(--warning) / 0.5)",
                        ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {stats.percentage.toFixed(0)}% of budget used
            </span>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Safe (0-80%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-muted-foreground">Warning (80-100%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Over (100%+)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Suggestions Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 border-primary/30 bg-primary/5"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-3 rounded-xl bg-primary/20"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <div className="flex-1">
              <p className="font-semibold text-primary">Smart Budget Suggestions</p>
              <p className="text-sm text-muted-foreground">
                Based on your spending patterns, we have suggestions for{" "}
                {budgets.filter((b) => b.suggestedBudget && b.suggestedBudget !== b.allocated).length}{" "}
                budgets. Look for the <Sparkles className="inline h-3 w-3 text-primary" /> icon on
                budget cards.
              </p>
            </div>
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              Review All
            </Button>
          </div>
        </motion.div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget, index) => (
            <BudgetCard
              key={budget.id}
              {...budget}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddEditBudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        budget={editingBudget}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
};

export default Budgets;
