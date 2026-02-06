import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Music,
  Heart,
  GraduationCap,
  Plane,
  Shirt,
  Sparkles,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

interface Budget {
  id: number;
  name: string;
  icon: LucideIcon;
  allocated: number;
  spent: number;
  color: string;
  suggestedBudget?: number;
}

interface AddEditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: Budget | null;
  onSave: (budget: Partial<Budget>) => void;
}

const categories = [
  { name: "Housing", icon: Home, color: "bg-primary", suggestedPercent: 30 },
  { name: "Food & Dining", icon: Utensils, color: "bg-emerald-500", suggestedPercent: 15 },
  { name: "Transportation", icon: Car, color: "bg-cyan-500", suggestedPercent: 10 },
  { name: "Shopping", icon: ShoppingCart, color: "bg-warning", suggestedPercent: 10 },
  { name: "Utilities", icon: Zap, color: "bg-purple-500", suggestedPercent: 8 },
  { name: "Entertainment", icon: Music, color: "bg-pink-500", suggestedPercent: 5 },
  { name: "Healthcare", icon: Heart, color: "bg-red-500", suggestedPercent: 5 },
  { name: "Education", icon: GraduationCap, color: "bg-blue-500", suggestedPercent: 5 },
  { name: "Travel", icon: Plane, color: "bg-indigo-500", suggestedPercent: 5 },
  { name: "Clothing", icon: Shirt, color: "bg-orange-500", suggestedPercent: 5 },
];

export function AddEditBudgetModal({
  isOpen,
  onClose,
  budget,
  onSave,
}: AddEditBudgetModalProps) {
  const [step, setStep] = useState<"category" | "details">(budget ? "details" : "category");
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(5000); // Would come from user settings

  useEffect(() => {
    if (budget) {
      const cat = categories.find((c) => c.name === budget.name);
      setSelectedCategory(cat || null);
      setAmount(budget.allocated.toString());
      setStep("details");
    } else {
      setSelectedCategory(null);
      setAmount("");
      setStep("category");
    }
  }, [budget, isOpen]);

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    const suggested = Math.round((monthlyIncome * category.suggestedPercent) / 100);
    setAmount(suggested.toString());
    setStep("details");
  };

  const handleSave = () => {
    if (!selectedCategory || !amount) return;

    onSave({
      id: budget?.id,
      name: selectedCategory.name,
      icon: selectedCategory.icon,
      allocated: parseFloat(amount),
      color: selectedCategory.color,
      suggestedBudget: Math.round((monthlyIncome * selectedCategory.suggestedPercent) / 100),
    });

    onClose();
  };

  const suggestedAmount = selectedCategory
    ? Math.round((monthlyIncome * selectedCategory.suggestedPercent) / 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {budget ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "category" ? (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Select a category for your budget
              </p>

              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${category.color}/20 group-hover:${category.color}/30 transition-colors`}>
                        <category.icon className={`h-5 w-5 ${category.color.replace("bg-", "text-")}`} />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ~{category.suggestedPercent}% of income
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Selected Category Display */}
              {selectedCategory && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className={`p-3 rounded-xl ${selectedCategory.color}/20`}>
                    <selectedCategory.icon
                      className={`h-6 w-6 ${selectedCategory.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedCategory.name}</p>
                    <p className="text-sm text-muted-foreground">Monthly Budget</p>
                  </div>
                  {!budget && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("category")}
                      className="ml-auto text-muted-foreground"
                    >
                      Change
                    </Button>
                  )}
                </div>
              )}

              {/* Budget Amount */}
              <div className="space-y-3">
                <Label>Budget Amount</Label>
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

              {/* AI Suggestion */}
              {suggestedAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-primary mb-1">Smart Suggestion</p>
                      <p className="text-sm text-muted-foreground">
                        Based on your income of ${monthlyIncome.toLocaleString()}, we recommend
                        allocating{" "}
                        <span className="text-primary font-medium">
                          ${suggestedAmount.toLocaleString()}
                        </span>{" "}
                        ({selectedCategory?.suggestedPercent}%) for {selectedCategory?.name}.
                      </p>
                      {parseFloat(amount) !== suggestedAmount && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAmount(suggestedAmount.toString())}
                          className="mt-2 text-primary hover:text-primary"
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Apply Suggestion
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preview */}
              <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Preview</p>
                <div className="flex items-center justify-between">
                  <span>Daily Budget</span>
                  <span className="font-semibold">
                    ${amount ? (parseFloat(amount) / 30).toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Weekly Budget</span>
                  <span className="font-semibold">
                    ${amount ? (parseFloat(amount) / 4).toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {budget ? "Save Changes" : "Create Budget"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
