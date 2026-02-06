import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Target, Plus, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 15000,
    current: 12500,
    deadline: "Dec 2024",
    monthlyContribution: 500,
    color: "from-primary to-emerald",
  },
  {
    id: 2,
    name: "New Car",
    target: 35000,
    current: 18200,
    deadline: "Jun 2025",
    monthlyContribution: 1000,
    color: "from-emerald to-cyan",
  },
  {
    id: 3,
    name: "Vacation Fund",
    target: 5000,
    current: 3200,
    deadline: "Aug 2024",
    monthlyContribution: 300,
    color: "from-cyan to-primary",
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 60000,
    current: 22000,
    deadline: "Dec 2026",
    monthlyContribution: 1500,
    color: "from-warning to-orange-500",
  },
];

const Goals = () => {
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Goals</h1>
            <p className="text-muted-foreground">Track your financial milestones</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-muted-foreground text-sm">Total Goals</p>
            <p className="text-2xl font-bold">{goals.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-emerald" />
            <p className="text-muted-foreground text-sm">Total Saved</p>
            <p className="text-2xl font-bold">${totalCurrent.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 text-center"
          >
            <Calendar className="h-8 w-8 mx-auto mb-2 text-cyan" />
            <p className="text-muted-foreground text-sm">Overall Progress</p>
            <p className="text-2xl font-bold">{Math.round((totalCurrent / totalTarget) * 100)}%</p>
          </motion.div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${goal.color}`}>
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${goal.current.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">of ${goal.target.toLocaleString()}</p>
                  </div>
                </div>

                <Progress value={percentage} className="h-3 mb-3" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${remaining.toLocaleString()} remaining
                  </span>
                  <span className="text-primary font-medium">
                    ${goal.monthlyContribution}/month contribution
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
