import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Pencil, Trash2, MoreHorizontal, Copy, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface Transaction {
  id: number;
  name: string;
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  date: string;
  time: string;
  account: string;
  status: "completed" | "pending" | "failed";
  notes?: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDuplicate?: (id: number) => void;
  isCompact?: boolean;
}

export function TransactionRow({
  transaction,
  onEdit,
  onDelete,
  onDuplicate,
  isCompact = false,
}: TransactionRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = transaction.categoryIcon;

  const getAmountColor = () => {
    if (transaction.type === "income") return "text-success";
    if (transaction.type === "expense") return "text-foreground";
    return "text-cyan";
  };

  const getAmountPrefix = () => {
    if (transaction.type === "income") return "+";
    if (transaction.type === "expense") return "-";
    return "";
  };

  const getStatusBadge = () => {
    const styles = {
      completed: "bg-success/20 text-success",
      pending: "bg-warning/20 text-warning",
      failed: "bg-destructive/20 text-destructive",
    };
    return styles[transaction.status];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center gap-4 px-4 border-b border-border/50 hover:bg-secondary/30 transition-all cursor-pointer ${
        isCompact ? "py-2" : "py-3"
      }`}
    >
      {/* Category Icon */}
      <div
        className={`flex-shrink-0 p-2.5 rounded-xl ${transaction.categoryColor}`}
      >
        <Icon className={`${isCompact ? "h-4 w-4" : "h-5 w-5"} text-primary-foreground`} />
      </div>

      {/* Transaction Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-medium truncate ${isCompact ? "text-sm" : ""}`}>
            {transaction.name}
          </p>
          {transaction.status !== "completed" && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusBadge()}`}>
              {transaction.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={`px-1.5 py-0.5 rounded ${transaction.categoryColor.replace(
              "bg-",
              "bg-opacity-20 text-"
            )}`}
            style={{
              backgroundColor: `hsl(var(--secondary))`,
            }}
          >
            {transaction.category}
          </span>
          <span>•</span>
          <span>{transaction.account}</span>
        </div>
      </div>

      {/* Date */}
      <div className="hidden md:block text-right min-w-[100px]">
        <p className="text-sm">{transaction.date}</p>
        <p className="text-xs text-muted-foreground">{transaction.time}</p>
      </div>

      {/* Amount */}
      <div className="text-right min-w-[100px]">
        <p className={`font-semibold ${getAmountColor()} ${isCompact ? "text-sm" : ""}`}>
          {getAmountPrefix()}${Math.abs(transaction.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{transaction.type}</p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-1 min-w-[80px] justify-end">
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(transaction.id);
                }}
                className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, delay: 0.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(transaction.id);
                }}
                className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card border-border">
            <DropdownMenuItem onClick={() => onEdit?.(transaction.id)} className="cursor-pointer">
              <Pencil className="h-4 w-4 mr-2" />
              Edit transaction
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(transaction.id)} className="cursor-pointer">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(transaction.id)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
