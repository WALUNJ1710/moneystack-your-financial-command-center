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
  Plane,
  Home,
  Car,
  GraduationCap,
  Heart,
  ShieldCheck,
  Gift,
  Laptop,
  Sparkles,
  Calendar,
  Target,
  LucideIcon,
} from "lucide-react";

interface Goal {
  id: number;
  name: string;
  icon: LucideIcon;
  target: number;
  saved: number;
  deadline: string;
  color: string;
}

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal | null;
  onSave: (goal: Partial<Goal>) => void;
}

const goalTemplates = [
  { name: "Vacation", icon: Plane, color: "bg-cyan-500", suggestedAmount: 3000 },
  { name: "Emergency Fund", icon: ShieldCheck, color: "bg-emerald-500", suggestedAmount: 10000 },
  { name: "New Home", icon: Home, color: "bg-primary", suggestedAmount: 50000 },
  { name: "New Car", icon: Car, color: "bg-blue-500", suggestedAmount: 25000 },
  { name: "Education", icon: GraduationCap, color: "bg-purple-500", suggestedAmount: 15000 },
  { name: "Wedding", icon: Heart, color: "bg-pink-500", suggestedAmount: 20000 },
  { name: "Gift Fund", icon: Gift, color: "bg-orange-500", suggestedAmount: 1000 },
  { name: "Tech Upgrade", icon: Laptop, color: "bg-indigo-500", suggestedAmount: 2000 },
];

export function AddGoalModal({
  isOpen,
  onClose,
  goal,
  onSave,
}: AddGoalModalProps) {
  const [step, setStep] = useState<"template" | "details">(goal ? "details" : "template");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof goalTemplates[0] | null>(null);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (goal) {
      const template = goalTemplates.find((t) => t.name === goal.name);
      setSelectedTemplate(template || goalTemplates[0]);
      setName(goal.name);
      setTargetAmount(goal.target.toString());
      setDeadline(goal.deadline);
      setStep("details");
    } else {
      setSelectedTemplate(null);
      setName("");
      setTargetAmount("");
      setDeadline("");
      setStep("template");
    }
  }, [goal, isOpen]);

  const handleTemplateSelect = (template: typeof goalTemplates[0]) => {
    setSelectedTemplate(template);
    setName(template.name);
    setTargetAmount(template.suggestedAmount.toString());
    // Default deadline: 1 year from now
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    setDeadline(oneYearFromNow.toISOString().split("T")[0]);
    setStep("details");
  };

  const handleSave = () => {
    if (!selectedTemplate || !name || !targetAmount || !deadline) return;

    onSave({
      id: goal?.id,
      name,
      icon: selectedTemplate.icon,
      target: parseFloat(targetAmount),
      saved: goal?.saved || 0,
      deadline,
      color: selectedTemplate.color,
    });

    onClose();
  };

  // Calculate monthly savings needed
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const monthsUntilDeadline = Math.max(
    Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)),
    1
  );
  const monthlySavingsNeeded = parseFloat(targetAmount) / monthsUntilDeadline;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {goal ? "Edit Goal" : "Create New Goal"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "template" ? (
            <motion.div
              key="template"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                What are you saving for?
              </p>

              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {goalTemplates.map((template) => (
                  <motion.button
                    key={template.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${template.color}/20`}>
                        <template.icon className={`h-5 w-5 ${template.color.replace("bg-", "text-")}`} />
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ~${template.suggestedAmount.toLocaleString()}
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
              {/* Selected Template Display */}
              {selectedTemplate && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className={`p-3 rounded-xl ${selectedTemplate.color}/20`}>
                    <selectedTemplate.icon
                      className={`h-6 w-6 ${selectedTemplate.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{selectedTemplate.name}</p>
                    <p className="text-sm text-muted-foreground">Savings Goal</p>
                  </div>
                  {!goal && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("template")}
                      className="text-muted-foreground"
                    >
                      Change
                    </Button>
                  )}
                </div>
              )}

              {/* Goal Name */}
              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Summer Vacation 2025"
                />
              </div>

              {/* Target Amount */}
              <div className="space-y-2">
                <Label>Target Amount</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="pl-8 text-xl h-12 font-semibold"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Target Date
                </Label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Savings Preview */}
              {targetAmount && deadline && (
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
                      <p className="font-medium text-primary mb-1">Savings Plan</p>
                      <p className="text-sm text-muted-foreground">
                        To reach your goal of{" "}
                        <span className="text-primary font-medium">
                          ${parseFloat(targetAmount).toLocaleString()}
                        </span>{" "}
                        by {new Date(deadline).toLocaleDateString()}, you'll need to save:
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="p-2 rounded-lg bg-secondary/50 text-center">
                          <p className="text-lg font-bold text-primary">
                            ${monthlySavingsNeeded.toFixed(0)}
                          </p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/50 text-center">
                          <p className="text-lg font-bold text-primary">
                            ${(monthlySavingsNeeded / 4).toFixed(0)}
                          </p>
                          <p className="text-xs text-muted-foreground">per week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!name || !targetAmount || !deadline || parseFloat(targetAmount) <= 0}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Target className="h-4 w-4 mr-2" />
                  {goal ? "Save Changes" : "Create Goal"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
