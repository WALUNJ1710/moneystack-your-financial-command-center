import { motion } from "framer-motion";

type TransactionType = "all" | "income" | "expense" | "transfer";

interface TransactionTypeToggleProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
  counts?: { income: number; expense: number; transfer: number };
}

export function TransactionTypeToggle({ value, onChange, counts }: TransactionTypeToggleProps) {
  const options: { id: TransactionType; label: string; color: string }[] = [
    { id: "all", label: "All", color: "bg-secondary" },
    { id: "income", label: "Income", color: "bg-success/20 text-success" },
    { id: "expense", label: "Expense", color: "bg-destructive/20 text-destructive" },
    { id: "transfer", label: "Transfer", color: "bg-cyan/20 text-cyan" },
  ];

  return (
    <div className="inline-flex p-1 bg-secondary/50 rounded-lg">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all ${
            value === option.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {value === option.id && (
            <motion.div
              layoutId="activeTab"
              className={`absolute inset-0 rounded-md ${
                option.id === "all"
                  ? "bg-secondary"
                  : option.id === "income"
                  ? "bg-success/20"
                  : option.id === "expense"
                  ? "bg-destructive/20"
                  : "bg-cyan/20"
              }`}
              transition={{ type: "spring", duration: 0.3 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {option.label}
            {counts && option.id !== "all" && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-background/50">
                {counts[option.id as keyof typeof counts]}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
