import { motion } from "framer-motion";
import { LucideIcon, MoreHorizontal, TrendingUp, TrendingDown, Eye, EyeOff, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AccountCardProps {
  id: number;
  name: string;
  institution?: string;
  number?: string;
  balance: number;
  type: string;
  icon: LucideIcon;
  color: string;
  trend?: number;
  isHidden?: boolean;
  delay?: number;
  onHide?: (id: number) => void;
  onArchive?: (id: number) => void;
}

export function AccountCard({
  id,
  name,
  institution,
  number,
  balance,
  type,
  icon: Icon,
  color,
  trend,
  isHidden = false,
  delay = 0,
  onHide,
  onArchive,
}: AccountCardProps) {
  const isCredit = type === "credit";
  const displayBalance = isCredit ? -Math.abs(balance) : balance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl p-5 bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20 ${
        isHidden ? "opacity-60" : ""
      }`}
    >
      {/* Neon glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Hidden indicator */}
      {isHidden && (
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs flex items-center gap-1">
          <EyeOff className="h-3 w-3" />
          Hidden
        </div>
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
          >
            <Icon className="h-6 w-6 text-primary-foreground" />
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-border">
              <DropdownMenuItem onClick={() => onHide?.(id)} className="cursor-pointer">
                {isHidden ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Account
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Account
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onArchive?.(id)}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Account Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          {institution && (
            <p className="text-sm text-muted-foreground">{institution}</p>
          )}
        </div>

        {/* Balance */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Balance</p>
            <p
              className={`text-2xl font-bold ${
                displayBalance < 0 ? "text-destructive" : "text-foreground"
              }`}
            >
              {displayBalance < 0 ? "-" : ""}${Math.abs(balance).toLocaleString()}
            </p>
          </div>

          {trend !== undefined && trend !== 0 && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend > 0 ? "text-success" : "text-destructive"
              }`}
            >
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Account Number */}
        {number && (
          <p className="text-xs text-muted-foreground font-mono mt-3 pt-3 border-t border-border/50">
            {number}
          </p>
        )}
      </div>
    </motion.div>
  );
}
