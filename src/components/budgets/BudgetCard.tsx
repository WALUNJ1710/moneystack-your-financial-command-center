import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface BudgetCardProps {
  id: number;
  name: string;
  icon: LucideIcon;
  allocated: number;
  spent: number;
  color: string;
  suggestedBudget?: number;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function BudgetCard({
  id,
  name,
  icon: Icon,
  allocated,
  spent,
  color,
  suggestedBudget,
  index,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percentage = (spent / allocated) * 100;
  const isOverBudget = spent > allocated;
  const isNearLimit = percentage >= 80 && percentage < 100;
  const remaining = allocated - spent;

  // Determine status color
  const getStatusColor = () => {
    if (isOverBudget) return "destructive";
    if (isNearLimit) return "warning";
    return "success";
  };

  const statusColor = getStatusColor();

  // Trend calculation (mock - would be based on historical data)
  const trend = spent > allocated * 0.5 ? "up" : "down";
  const trendPercentage = Math.abs(Math.round((spent / allocated - 0.5) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 relative overflow-hidden transition-all duration-300 ${
        isOverBudget
          ? "border-destructive/50 shadow-[0_0_30px_-5px_hsl(var(--destructive)/0.3)]"
          : isNearLimit
          ? "border-warning/50 shadow-[0_0_30px_-5px_hsl(var(--warning)/0.3)]"
          : "hover:border-primary/30 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
      }`}
    >
      {/* AI Suggestion Badge */}
      {suggestedBudget && suggestedBudget !== allocated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-12 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 border border-primary/30"
        >
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-xs text-primary font-medium">
            Suggested: ${suggestedBudget.toLocaleString()}
          </span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-xl ${color}/20 relative`}
          >
            <Icon className={`h-5 w-5 ${color.replace("bg-", "text-")}`} />
            {isOverBudget && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-xl bg-destructive/20"
              />
            )}
          </motion.div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-xs text-muted-foreground">Monthly budget</p>
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
              Edit Budget
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

      {/* Amount Display */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${isOverBudget ? "text-destructive" : ""}`}>
            ${spent.toLocaleString()}
          </span>
          <span className="text-muted-foreground">/ ${allocated.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-4">
        <div className="relative">
          <Progress
            value={Math.min(percentage, 100)}
            className={`h-3 bg-secondary ${
              isOverBudget
                ? "[&>div]:bg-destructive"
                : isNearLimit
                ? "[&>div]:bg-warning"
                : "[&>div]:bg-success"
            }`}
          />
          {/* Threshold markers */}
          <div className="absolute top-0 left-[80%] w-px h-3 bg-warning/50" />
          
          {/* Animated glow effect when near/over limit */}
          {(isNearLimit || isOverBudget) && (
            <motion.div
              className="absolute top-0 left-0 h-3 rounded-full pointer-events-none"
              style={{ width: `${Math.min(percentage, 100)}%` }}
              animate={{
                boxShadow: isOverBudget
                  ? [
                      "0 0 10px hsl(var(--destructive) / 0.5)",
                      "0 0 20px hsl(var(--destructive) / 0.3)",
                      "0 0 10px hsl(var(--destructive) / 0.5)",
                    ]
                  : [
                      "0 0 10px hsl(var(--warning) / 0.5)",
                      "0 0 15px hsl(var(--warning) / 0.3)",
                      "0 0 10px hsl(var(--warning) / 0.5)",
                    ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Percentage and trend */}
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-medium ${
              isOverBudget
                ? "text-destructive"
                : isNearLimit
                ? "text-warning"
                : "text-success"
            }`}
          >
            {percentage.toFixed(0)}% used
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-destructive" />
            ) : (
              <TrendingDown className="h-3 w-3 text-success" />
            )}
            <span>{trendPercentage}% vs avg</span>
          </div>
        </div>
      </div>

      {/* Remaining / Over */}
      <div
        className={`p-3 rounded-xl ${
          isOverBudget
            ? "bg-destructive/10 border border-destructive/20"
            : isNearLimit
            ? "bg-warning/10 border border-warning/20"
            : "bg-success/10 border border-success/20"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            isOverBudget
              ? "text-destructive"
              : isNearLimit
              ? "text-warning"
              : "text-success"
          }`}
        >
          {isOverBudget
            ? `$${Math.abs(remaining).toLocaleString()} over budget`
            : `$${remaining.toLocaleString()} remaining`}
        </p>
      </div>
    </motion.div>
  );
}
