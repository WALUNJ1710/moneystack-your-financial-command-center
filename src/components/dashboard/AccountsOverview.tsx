import { motion } from "framer-motion";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
  {
    id: 1,
    name: "Main Checking",
    number: "**** 4829",
    balance: 12450.0,
    type: "checking",
    color: "from-primary to-emerald",
  },
  {
    id: 2,
    name: "Savings Account",
    number: "**** 7391",
    balance: 28340.5,
    type: "savings",
    color: "from-emerald to-cyan",
  },
  {
    id: 3,
    name: "Investment",
    number: "**** 2156",
    balance: 45890.25,
    type: "investment",
    color: "from-cyan to-primary",
  },
];

export function AccountsOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Your Accounts</h3>
          <p className="text-sm text-muted-foreground">Quick overview</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Account
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-r ${account.color} cursor-pointer transition-transform`}
          >
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-12 -translate-x-12" />
            </div>

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">
                  {account.name}
                </p>
                <p className="text-2xl font-bold text-primary-foreground mt-1">
                  ${account.balance.toLocaleString()}
                </p>
                <p className="text-xs text-primary-foreground/60 mt-2 font-mono">
                  {account.number}
                </p>
              </div>
              <CreditCard className="h-6 w-6 text-primary-foreground/80" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
