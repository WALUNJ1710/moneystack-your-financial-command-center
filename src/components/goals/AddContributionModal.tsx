import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  TrendingUp, 
  Target,
  Sparkles,
  LucideIcon
} from "lucide-react";

interface Goal {
  id: number;
  name: string;
  icon: LucideIcon;
  target: number;
  saved: number;
  deadline: string;
  color: string;
}

interface AddContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
  onSave: (goalId: number, amount: number) => void;
}

const quickAmounts = [50, 100, 250, 500, 1000];

export function AddContributionModal({
  isOpen,
  onClose,
  goal,
  onSave,
}: AddContributionModalProps) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  if (!goal) return null;

  const remaining = goal.target - goal.saved;
  const newTotal = goal.saved + (parseFloat(amount) || 0);
  const newPercentage = Math.min((newTotal / goal.target) * 100, 100);
  const willComplete = newTotal >= goal.target;

  const handleSave = () => {
    const contributionAmount = parseFloat(amount);
    if (contributionAmount > 0) {
      onSave(goal.id, contributionAmount);
      onClose();
    }
  };

  const GoalIcon = goal.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Contribution</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Goal Info */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className={`p-3 rounded-xl ${goal.color}/20`}>
              <GoalIcon className={`h-6 w-6 ${goal.color.replace("bg-", "text-")}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{goal.name}</p>
              <p className="text-sm text-muted-foreground">
                ${goal.saved.toLocaleString()} / ${goal.target.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="font-semibold text-primary">${remaining.toLocaleString()}</p>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((quickAmount) => (
                <motion.button
                  key={quickAmount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAmount(quickAmount.toString())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === quickAmount.toString()
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  ${quickAmount}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAmount(remaining.toString())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  amount === remaining.toString()
                    ? "bg-success text-success-foreground"
                    : "bg-success/20 text-success hover:bg-success/30"
                }`}
              >
                <Target className="h-3 w-3 inline mr-1" />
                Complete Goal
              </motion.button>
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label>Custom Amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                $
              </span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-2xl h-14 font-semibold"
                placeholder="0"
              />
            </div>
          </div>

          {/* Preview */}
          {parseFloat(amount) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                willComplete 
                  ? "bg-success/10 border border-success/20" 
                  : "bg-primary/10 border border-primary/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {willComplete ? (
                  <Sparkles className="h-5 w-5 text-success" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-primary" />
                )}
                <p className={`font-medium ${willComplete ? "text-success" : "text-primary"}`}>
                  {willComplete ? "You'll complete this goal! 🎉" : "Progress Preview"}
                </p>
              </div>
              
              {/* Progress bar preview */}
              <div className="relative h-3 bg-secondary rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: `${(goal.saved / goal.target) * 100}%` }}
                  animate={{ width: `${newPercentage}%` }}
                  className={`h-full rounded-full ${willComplete ? "bg-success" : "bg-primary"}`}
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  New total: <span className="font-medium text-foreground">${newTotal.toLocaleString()}</span>
                </span>
                <span className={willComplete ? "text-success" : "text-primary"}>
                  {newPercentage.toFixed(0)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Source Account (Mock) */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">From: Main Checking</p>
              <p className="text-xs text-muted-foreground">Available: $3,450.00</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!amount || parseFloat(amount) <= 0}
              className={`flex-1 ${
                willComplete 
                  ? "bg-success text-success-foreground hover:bg-success/90" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {willComplete ? "Complete Goal" : "Add Contribution"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
