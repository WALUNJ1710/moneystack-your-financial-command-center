import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard,
  Calendar,
  TrendingDown,
} from "lucide-react";

interface EMICardProps {
  id: number;
  name: string;
  totalAmount: number;
  paidAmount: number;
  emiAmount: number;
  remainingEmis: number;
  totalEmis: number;
  nextDueDate: string;
  index: number;
}

export function EMICard({
  id,
  name,
  totalAmount,
  paidAmount,
  emiAmount,
  remainingEmis,
  totalEmis,
  nextDueDate,
  index,
}: EMICardProps) {
  const percentage = (paidAmount / totalAmount) * 100;
  const completedEmis = totalEmis - remainingEmis;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -2 }}
      className="glass-card p-5 hover:border-primary/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-primary/20">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-xs text-muted-foreground">
            {completedEmis} of {totalEmis} EMIs paid
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${emiAmount.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">/month</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2 mb-4">
        <div className="relative">
          <Progress
            value={percentage}
            className="h-2.5 bg-secondary [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-success"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${paidAmount.toLocaleString()} paid</span>
          <span>${(totalAmount - paidAmount).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Next EMI: <span className="font-medium">{new Date(nextDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-success text-sm">
          <TrendingDown className="h-4 w-4" />
          <span>{remainingEmis} left</span>
        </div>
      </div>
    </motion.div>
  );
}
