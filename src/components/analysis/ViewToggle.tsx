import { motion } from "framer-motion";

type ViewType = "category" | "account";

interface ViewToggleProps {
  value: ViewType;
  onChange: (value: ViewType) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex p-1 bg-secondary/50 rounded-lg">
      {(["category", "account"] as ViewType[]).map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            value === type
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {value === type && (
            <motion.div
              layoutId="viewToggle"
              className="absolute inset-0 rounded-md bg-primary/20"
              transition={{ type: "spring", duration: 0.3 }}
            />
          )}
          <span className="relative capitalize">{type}-wise</span>
        </button>
      ))}
    </div>
  );
}
