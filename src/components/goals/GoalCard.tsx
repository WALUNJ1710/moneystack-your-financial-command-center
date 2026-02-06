import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Calendar,
  TrendingUp,
  Sparkles,
  PartyPopper,
  LucideIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import confetti from "canvas-confetti";

interface GoalCardProps {
  id: number;
  name: string;
  icon: LucideIcon;
  target: number;
  saved: number;
  deadline: string;
  color: string;
  index: number;
  onContribute: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function GoalCard({
  id,
  name,
  icon: Icon,
  target,
  saved,
  deadline,
  color,
  index,
  onContribute,
  onEdit,
  onDelete,
}: GoalCardProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const percentage = Math.min((saved / target) * 100, 100);
  const isComplete = saved >= target;
  const remaining = target - saved;

  // Calculate days until deadline
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0;
  const isUrgent = daysLeft <= 30 && daysLeft > 0;

  // Calculate monthly contribution needed
  const monthsLeft = Math.max(Math.ceil(daysLeft / 30), 1);
  const monthlyNeeded = remaining > 0 ? remaining / monthsLeft : 0;

  // Circle progress
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const triggerCelebration = () => {
    setShowCelebration(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#22c55e', '#4ade80', '#86efac'],
    });
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 relative overflow-hidden transition-all duration-300 ${
        isComplete 
          ? "border-success/50 shadow-[0_0_30px_-5px_hsl(var(--success)/0.3)]"
          : "hover:border-primary/30 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
      }`}
    >
      {/* Completion Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-success/10 flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="text-center"
            >
              <PartyPopper className="h-16 w-16 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">Goal Achieved!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-xl ${color}/20`}
          >
            <Icon className={`h-5 w-5 ${color.replace("bg-", "text-")}`} />
          </motion.div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {isOverdue ? (
                <span className="text-destructive">Overdue by {Math.abs(daysLeft)} days</span>
              ) : (
                <span className={isUrgent ? "text-warning" : ""}>
                  {daysLeft} days left
                </span>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Goal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center my-6">
        <div className="relative">
          <svg width="140" height="140" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="hsl(var(--secondary))"
              strokeWidth="10"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke={isComplete ? "hsl(var(--success))" : `hsl(var(--primary))`}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            />
            {/* Glow effect */}
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke={isComplete ? "hsl(var(--success))" : "hsl(var(--primary))"}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter="blur(8px)"
              opacity={0.5}
              className="transform -rotate-90"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isComplete ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1 }}
              >
                <Sparkles className="h-8 w-8 text-success" />
              </motion.div>
            ) : (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold"
                >
                  {percentage.toFixed(0)}%
                </motion.span>
                <span className="text-xs text-muted-foreground">complete</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Amount Info */}
      <div className="text-center mb-4">
        <p className="text-2xl font-bold">
          ${saved.toLocaleString()}
          <span className="text-lg text-muted-foreground font-normal">
            {" "}/ ${target.toLocaleString()}
          </span>
        </p>
        {!isComplete && remaining > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            ${remaining.toLocaleString()} to go
          </p>
        )}
      </div>

      {/* Monthly contribution needed */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <p className="text-sm">
              Save <span className="font-semibold text-primary">${monthlyNeeded.toFixed(0)}/month</span> to reach your goal
            </p>
          </div>
        </motion.div>
      )}

      {/* Action Button */}
      {isComplete ? (
        <Button 
          onClick={triggerCelebration}
          className="w-full bg-success text-success-foreground hover:bg-success/90"
        >
          <PartyPopper className="h-4 w-4 mr-2" />
          Celebrate!
        </Button>
      ) : (
        <Button 
          onClick={() => onContribute(id)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contribution
        </Button>
      )}
    </motion.div>
  );
}
