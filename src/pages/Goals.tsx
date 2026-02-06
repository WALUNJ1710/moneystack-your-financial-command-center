import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Plus, 
  Target,
  TrendingUp,
  Calendar,
  Sparkles,
  Trophy,
  Flame,
  Plane,
  ShieldCheck,
  Home,
  Car,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GoalCard } from "@/components/goals/GoalCard";
import { AddContributionModal } from "@/components/goals/AddContributionModal";
import { AddGoalModal } from "@/components/goals/AddGoalModal";

interface Goal {
  id: number;
  name: string;
  icon: LucideIcon;
  target: number;
  saved: number;
  deadline: string;
  color: string;
}

const initialGoals: Goal[] = [
  { id: 1, name: "Summer Vacation", icon: Plane, target: 5000, saved: 3250, deadline: "2025-07-01", color: "bg-cyan-500" },
  { id: 2, name: "Emergency Fund", icon: ShieldCheck, target: 10000, saved: 8500, deadline: "2025-12-31", color: "bg-emerald-500" },
  { id: 3, name: "New Home Down Payment", icon: Home, target: 50000, saved: 22000, deadline: "2026-06-01", color: "bg-primary" },
  { id: 4, name: "New Car", icon: Car, target: 25000, saved: 25000, deadline: "2025-03-01", color: "bg-blue-500" },
];

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const stats = useMemo(() => {
    const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
    const completedGoals = goals.filter((g) => g.saved >= g.target).length;
    const activeGoals = goals.length - completedGoals;

    // Calculate current month's savings (mock)
    const thisMonthSavings = 1250;
    const savingsStreak = 5; // months in a row

    return {
      totalTarget,
      totalSaved,
      overallPercentage: (totalSaved / totalTarget) * 100,
      completedGoals,
      activeGoals,
      thisMonthSavings,
      savingsStreak,
    };
  }, [goals]);

  const handleContribute = (id: number) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setSelectedGoal(goal);
      setIsContributionModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setEditingGoal(goal);
      setIsGoalModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSaveGoal = (goalData: Partial<Goal>) => {
    if (goalData.id) {
      setGoals((prev) =>
        prev.map((g) => (g.id === goalData.id ? { ...g, ...goalData } : g))
      );
    } else {
      const newGoal: Goal = {
        id: Date.now(),
        name: goalData.name || "New Goal",
        icon: goalData.icon || Target,
        target: goalData.target || 0,
        saved: goalData.saved || 0,
        deadline: goalData.deadline || new Date().toISOString(),
        color: goalData.color || "bg-primary",
      };
      setGoals((prev) => [...prev, newGoal]);
    }
    setEditingGoal(null);
  };

  const handleContributionSave = (goalId: number, amount: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, saved: Math.min(g.saved + amount, g.target) } : g
      )
    );
  };

  const openAddModal = () => {
    setEditingGoal(null);
    setIsGoalModalOpen(true);
  };

  // Separate active and completed goals
  const activeGoals = goals.filter((g) => g.saved < g.target);
  const completedGoals = goals.filter((g) => g.saved >= g.target);

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
            <h1 className="text-3xl font-bold">Goals</h1>
            <p className="text-muted-foreground">Track your savings and reach your dreams</p>
          </div>
          <Button 
            onClick={openAddModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </motion.div>

        {/* Motivational Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Saved</span>
            </div>
            <p className="text-2xl font-bold">${stats.totalSaved.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              of ${stats.totalTarget.toLocaleString()} goal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-success/20">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <p className="text-2xl font-bold text-success">
              +${stats.thisMonthSavings.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">saved so far</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-orange-500/20">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Savings Streak</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">{stats.savingsStreak} months</p>
            <p className="text-xs text-muted-foreground mt-1">keep it up! 🔥</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/20">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-yellow-500">{stats.completedGoals}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.activeGoals} still active
            </p>
          </motion.div>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="p-3 rounded-xl bg-primary/20"
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  You're {stats.overallPercentage.toFixed(0)}% of the way to all your goals!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {stats.overallPercentage.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="relative">
            <Progress
              value={stats.overallPercentage}
              className="h-4 bg-secondary [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-success"
            />
            <motion.div
              className="absolute top-0 left-0 h-4 rounded-full pointer-events-none"
              style={{ width: `${stats.overallPercentage}%` }}
              animate={{
                boxShadow: [
                  "0 0 10px hsl(var(--primary) / 0.5)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 10px hsl(var(--primary) / 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <span>${stats.totalSaved.toLocaleString()} saved</span>
            <span>${(stats.totalTarget - stats.totalSaved).toLocaleString()} to go</span>
          </div>
        </motion.div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Active Goals</h2>
              <span className="text-sm text-muted-foreground">({activeGoals.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGoals.map((goal, index) => (
                <GoalCard
                  key={goal.id}
                  {...goal}
                  index={index}
                  onContribute={handleContribute}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Completed Goals</h2>
              <span className="text-sm text-muted-foreground">({completedGoals.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedGoals.map((goal, index) => (
                <GoalCard
                  key={goal.id}
                  {...goal}
                  index={index}
                  onContribute={handleContribute}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="p-4 rounded-full bg-primary/20 w-fit mx-auto mb-4">
              <Target className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your savings journey by creating your first goal!
            </p>
            <Button onClick={openAddModal} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AddGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false);
          setEditingGoal(null);
        }}
        goal={editingGoal}
        onSave={handleSaveGoal}
      />

      <AddContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => {
          setIsContributionModalOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
        onSave={handleContributionSave}
      />
    </DashboardLayout>
  );
};

export default Goals;
