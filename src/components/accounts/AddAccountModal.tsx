import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Wallet, CreditCard, Smartphone, PiggyBank, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (account: any) => void;
}

const accountTypes = [
  { id: "bank", name: "Bank Account", icon: Building2, color: "from-primary to-emerald" },
  { id: "cash", name: "Cash", icon: Wallet, color: "from-warning to-orange-500" },
  { id: "credit", name: "Credit Card", icon: CreditCard, color: "from-purple-500 to-pink-500" },
  { id: "upi", name: "UPI / Digital Wallet", icon: Smartphone, color: "from-cyan to-blue-500" },
  { id: "savings", name: "Savings Account", icon: PiggyBank, color: "from-emerald to-green-400" },
  { id: "investment", name: "Investment", icon: TrendingUp, color: "from-amber-500 to-yellow-400" },
];

export function AddAccountModal({ isOpen, onClose, onAdd }: AddAccountModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleSubmit = () => {
    if (selectedType && accountName) {
      onAdd?.({
        type: selectedType,
        name: accountName,
        number: accountNumber,
        balance: parseFloat(initialBalance) || 0,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedType(null);
    setAccountName("");
    setAccountNumber("");
    setInitialBalance("");
    onClose();
  };

  const selectedTypeData = accountTypes.find((t) => t.id === selectedType);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="glass-card p-6 mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    {step === 1 ? "Add New Account" : "Account Details"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {step === 1
                      ? "Select the type of account you want to add"
                      : `Configure your ${selectedTypeData?.name}`}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Step 1: Account Type Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {accountTypes.map((type, index) => (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedType(type.id);
                        setStep(2);
                      }}
                      className={`group relative p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 transition-all duration-300 text-left`}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} 
                      />
                      
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${type.color} w-fit mb-3`}>
                        <type.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <p className="font-medium text-sm">{type.name}</p>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Account Details */}
              {step === 2 && selectedTypeData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* Selected Type Preview */}
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedTypeData.color} flex items-center gap-3`}>
                    <selectedTypeData.icon className="h-6 w-6 text-primary-foreground" />
                    <span className="font-medium text-primary-foreground">{selectedTypeData.name}</span>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        placeholder="e.g., Main Checking"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="mt-1.5 bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">Account Number (Optional)</Label>
                      <Input
                        id="accountNumber"
                        placeholder="**** **** **** 1234"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="mt-1.5 bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="initialBalance">Initial Balance</Label>
                      <div className="relative mt-1.5">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="initialBalance"
                          type="number"
                          placeholder="0.00"
                          value={initialBalance}
                          onChange={(e) => setInitialBalance(e.target.value)}
                          className="pl-7 bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!accountName}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
