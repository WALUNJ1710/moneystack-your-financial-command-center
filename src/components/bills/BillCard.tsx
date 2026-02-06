import { motion } from "framer-motion";
import { 
  Receipt, 
  Calendar as CalendarIcon, 
  AlertCircle, 
  Bell,
  CreditCard,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BillCardProps {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue" | "due-soon";
  category: string;
  icon: LucideIcon;
  color: string;
  index: number;
  onPay: (id: number) => void;
  onEdit: (id: number) => void;
  onRemind: (id: number) => void;
}

export function BillCard({
  id,
  name,
  amount,
  dueDate,
  status,
  category,
  icon: Icon,
  color,
  index,
  onPay,
  onEdit,
  onRemind,
}: BillCardProps) {
  const isOverdue = status === "overdue";
  const isDueSoon = status === "due-soon";
  const isPaid = status === "paid";

  // Calculate days until due
  const dueDateObj = new Date(dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.03 }}
      whileHover={{ y: -2 }}
      className={`glass-card p-4 relative overflow-hidden transition-all duration-300 ${
        isOverdue
          ? "border-destructive/50 shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.3)]"
          : isDueSoon
          ? "border-warning/50 shadow-[0_0_20px_-5px_hsl(var(--warning)/0.3)]"
          : isPaid
          ? "border-success/30 opacity-75"
          : "hover:border-primary/30"
      }`}
    >
      {/* Urgency indicator strip */}
      {(isOverdue || isDueSoon) && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute top-0 left-0 right-0 h-1 ${
            isOverdue ? "bg-destructive" : "bg-warning"
          }`}
        />
      )}

      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`p-3 rounded-xl ${color}/20`}>
          <Icon className={`h-5 w-5 ${color.replace("bg-", "text-")}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold truncate">{name}</p>
            {isPaid && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                Paid
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>

        {/* Due Date */}
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className={`text-sm font-medium ${
              isOverdue ? "text-destructive" : isDueSoon ? "text-warning" : "text-muted-foreground"
            }`}>
              {new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className={`text-xs ${
            isOverdue ? "text-destructive" : isDueSoon ? "text-warning" : "text-muted-foreground"
          }`}>
            {isOverdue 
              ? `${Math.abs(daysUntilDue)} days overdue`
              : isPaid 
              ? "Completed"
              : daysUntilDue === 0 
              ? "Due today" 
              : `${daysUntilDue} days left`}
          </p>
        </div>

        {/* Amount */}
        <div className="text-right min-w-[80px]">
          <p className={`text-lg font-bold ${isPaid ? "text-muted-foreground line-through" : ""}`}>
            ${amount.toFixed(2)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isPaid && (
            <Button
              size="sm"
              onClick={() => onPay(id)}
              className={`h-8 ${
                isOverdue 
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Pay Now
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer">
                <Receipt className="h-4 w-4 mr-2" />
                Edit Bill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemind(id)} className="cursor-pointer">
                <Bell className="h-4 w-4 mr-2" />
                Set Reminder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
