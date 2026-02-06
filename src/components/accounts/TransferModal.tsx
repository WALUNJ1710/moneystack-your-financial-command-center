import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeftRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Account {
  id: number;
  name: string;
  balance: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onTransfer?: (from: number, to: number, amount: number) => void;
}

export function TransferModal({ isOpen, onClose, accounts, onTransfer }: TransferModalProps) {
  const [fromAccount, setFromAccount] = useState<number | null>(null);
  const [toAccount, setToAccount] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = () => {
    if (fromAccount !== null && toAccount !== null && parseFloat(amount) > 0) {
      onTransfer?.(fromAccount, toAccount, parseFloat(amount));
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setFromAccount(null);
    setToAccount(null);
    setAmount("");
    setIsSuccess(false);
    onClose();
  };

  const fromAccountData = accounts.find((a) => a.id === fromAccount);
  const toAccountData = accounts.find((a) => a.id === toAccount);
  const transferAmount = parseFloat(amount) || 0;
  const isValidTransfer =
    fromAccount !== null &&
    toAccount !== null &&
    fromAccount !== toAccount &&
    transferAmount > 0 &&
    fromAccountData &&
    transferAmount <= fromAccountData.balance;

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-card p-6 mx-4">
              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center"
                  >
                    <Check className="h-10 w-10 text-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-success mb-2">Transfer Complete!</h3>
                  <p className="text-muted-foreground">
                    ${transferAmount.toFixed(2)} transferred successfully
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/20">
                        <ArrowLeftRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Transfer Money</h2>
                        <p className="text-sm text-muted-foreground">Move funds between accounts</p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* From Account */}
                  <div className="space-y-2 mb-4">
                    <Label>From Account</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {accounts.filter(a => a.balance > 0).map((account) => (
                        <motion.button
                          key={account.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFromAccount(account.id)}
                          className={`p-3 rounded-xl border transition-all text-left ${
                            fromAccount === account.id
                              ? "border-primary bg-primary/10"
                              : "border-border bg-secondary/30 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${account.color}`}>
                              <account.icon className="h-3 w-3 text-primary-foreground" />
                            </div>
                            <span className="text-xs font-medium truncate">{account.name}</span>
                          </div>
                          <p className="text-sm font-bold">${account.balance.toLocaleString()}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="p-2 rounded-full bg-secondary"
                    >
                      <ArrowRight className="h-4 w-4 text-primary rotate-90" />
                    </motion.div>
                  </div>

                  {/* To Account */}
                  <div className="space-y-2 mb-4">
                    <Label>To Account</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {accounts.filter(a => a.id !== fromAccount).map((account) => (
                        <motion.button
                          key={account.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setToAccount(account.id)}
                          className={`p-3 rounded-xl border transition-all text-left ${
                            toAccount === account.id
                              ? "border-emerald bg-emerald/10"
                              : "border-border bg-secondary/30 hover:border-emerald/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${account.color}`}>
                              <account.icon className="h-3 w-3 text-primary-foreground" />
                            </div>
                            <span className="text-xs font-medium truncate">{account.name}</span>
                          </div>
                          <p className="text-sm font-bold">${account.balance.toLocaleString()}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="transferAmount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">$</span>
                      <Input
                        id="transferAmount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10 text-2xl h-14 bg-secondary/50 border-border focus:border-primary text-center font-bold"
                      />
                    </div>
                    {fromAccountData && transferAmount > fromAccountData.balance && (
                      <p className="text-xs text-destructive">Insufficient balance</p>
                    )}
                  </div>

                  {/* Transfer Button */}
                  <Button
                    onClick={handleTransfer}
                    disabled={!isValidTransfer}
                    className="w-full h-12 bg-gradient-to-r from-primary to-emerald text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    <ArrowLeftRight className="h-5 w-5 mr-2" />
                    Transfer ${transferAmount.toFixed(2)}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
