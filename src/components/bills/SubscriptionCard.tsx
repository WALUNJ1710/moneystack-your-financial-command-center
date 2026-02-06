import { motion } from "framer-motion";
import { 
  MoreHorizontal,
  Pause,
  Trash2,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubscriptionCardProps {
  id: number;
  name: string;
  amount: number;
  billingCycle: string;
  nextBilling: string;
  icon: LucideIcon;
  color: string;
  status: "active" | "paused" | "cancelled";
  index: number;
  onPause: (id: number) => void;
  onCancel: (id: number) => void;
}

export function SubscriptionCard({
  id,
  name,
  amount,
  billingCycle,
  nextBilling,
  icon: Icon,
  color,
  status,
  index,
  onPause,
  onCancel,
}: SubscriptionCardProps) {
  const isActive = status === "active";
  const isPaused = status === "paused";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-card p-5 relative overflow-hidden transition-all duration-300 ${
        isPaused ? "opacity-60" : "hover:border-primary/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-xl ${color}/20`}
          >
            <Icon className={`h-6 w-6 ${color.replace("bg-", "text-")}`} />
          </motion.div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-xs text-muted-foreground capitalize">{billingCycle}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Subscription
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPause(id)} className="cursor-pointer">
              <Pause className="h-4 w-4 mr-2" />
              {isPaused ? "Resume" : "Pause"}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onCancel(id)} 
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <p className="text-2xl font-bold">
          ${amount.toFixed(2)}
          <span className="text-sm text-muted-foreground font-normal">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
        </p>
      </div>

      {/* Status & Next Billing */}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${
          isActive 
            ? "bg-success/20 text-success" 
            : isPaused 
            ? "bg-warning/20 text-warning" 
            : "bg-destructive/20 text-destructive"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <p className="text-xs text-muted-foreground">
          Next: {new Date(nextBilling).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Decorative gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${color} opacity-50`} />
    </motion.div>
  );
}
