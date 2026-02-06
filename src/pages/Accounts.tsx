import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountCard } from "@/components/accounts/AccountCard";
import { AddAccountModal } from "@/components/accounts/AddAccountModal";
import { TransferModal } from "@/components/accounts/TransferModal";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  CreditCard,
  Smartphone,
  PiggyBank,
  TrendingUp,
  Plus,
  ArrowLeftRight,
  Search,
  Filter,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Grid3X3,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const initialAccounts = [
  {
    id: 1,
    name: "Main Checking",
    institution: "Chase Bank",
    number: "**** 4829",
    balance: 12450.0,
    type: "bank",
    icon: Building2,
    color: "from-primary to-emerald",
    trend: 5.2,
    isHidden: false,
  },
  {
    id: 2,
    name: "Savings Account",
    institution: "Chase Bank",
    number: "**** 7391",
    balance: 28340.5,
    type: "savings",
    icon: PiggyBank,
    color: "from-emerald to-green-400",
    trend: 12.8,
    isHidden: false,
  },
  {
    id: 3,
    name: "Cash Wallet",
    institution: undefined,
    number: undefined,
    balance: 450.0,
    type: "cash",
    icon: Wallet,
    color: "from-warning to-orange-500",
    trend: 0,
    isHidden: false,
  },
  {
    id: 4,
    name: "Investment Portfolio",
    institution: "Fidelity",
    number: "**** 2156",
    balance: 45890.25,
    type: "investment",
    icon: TrendingUp,
    color: "from-amber-500 to-yellow-400",
    trend: -2.4,
    isHidden: false,
  },
  {
    id: 5,
    name: "Platinum Credit",
    institution: "American Express",
    number: "**** 9012",
    balance: 2340.5,
    type: "credit",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
    trend: 0,
    isHidden: false,
  },
  {
    id: 6,
    name: "Google Pay",
    institution: "Digital Wallet",
    number: "alex@gmail.com",
    balance: 1250.0,
    type: "upi",
    icon: Smartphone,
    color: "from-cyan to-blue-500",
    trend: 8.5,
    isHidden: false,
  },
];

const accountTypeFilters = [
  { id: "all", label: "All Accounts" },
  { id: "bank", label: "Bank Accounts" },
  { id: "savings", label: "Savings" },
  { id: "cash", label: "Cash" },
  { id: "credit", label: "Credit Cards" },
  { id: "upi", label: "Digital Wallets" },
  { id: "investment", label: "Investments" },
];

const Accounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showHidden, setShowHidden] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Filter and search accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      // Filter by hidden status
      if (!showHidden && account.isHidden) return false;

      // Filter by type
      if (selectedFilter !== "all" && account.type !== selectedFilter) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          account.name.toLowerCase().includes(query) ||
          account.institution?.toLowerCase().includes(query) ||
          account.type.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [accounts, searchQuery, selectedFilter, showHidden]);

  // Calculate totals
  const totals = useMemo(() => {
    const visible = accounts.filter((a) => !a.isHidden);
    const assets = visible
      .filter((a) => a.type !== "credit")
      .reduce((sum, a) => sum + a.balance, 0);
    const liabilities = visible
      .filter((a) => a.type === "credit")
      .reduce((sum, a) => sum + a.balance, 0);
    return { assets, liabilities, netWorth: assets - liabilities };
  }, [accounts]);

  const handleHideAccount = (id: number) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isHidden: !a.isHidden } : a))
    );
  };

  const handleArchiveAccount = (id: number) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const hiddenCount = accounts.filter((a) => a.isHidden).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">Manage all your connected accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsTransferModalOpen(true)}
              className="border-border hover:border-primary/50"
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Transfer
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </motion.div>

        {/* Net Worth Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
            <p className="text-3xl font-bold text-success">
              ${totals.assets.toLocaleString()}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Liabilities</p>
            <p className="text-3xl font-bold text-destructive">
              -${totals.liabilities.toLocaleString()}
            </p>
          </div>
          <div className="glass-card p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-emerald/10" />
            <p className="text-sm text-muted-foreground mb-1 relative">Net Worth</p>
            <p className="text-3xl font-bold gradient-text relative">
              ${totals.netWorth.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border">
                <Filter className="h-4 w-4 mr-2" />
                {accountTypeFilters.find((f) => f.id === selectedFilter)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-border">
              {accountTypeFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`cursor-pointer ${
                    selectedFilter === filter.id ? "text-primary" : ""
                  }`}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-border">
              <DropdownMenuCheckboxItem
                checked={showHidden}
                onCheckedChange={setShowHidden}
              >
                {showHidden ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                Show hidden accounts ({hiddenCount})
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setViewMode("grid")} className="cursor-pointer">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid view
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("list")} className="cursor-pointer">
                <List className="h-4 w-4 mr-2" />
                List view
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Accounts Grid */}
        {filteredAccounts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            {filteredAccounts.map((account, index) => (
              <AccountCard
                key={account.id}
                {...account}
                delay={0.3 + index * 0.05}
                onHide={handleHideAccount}
                onArchive={handleArchiveAccount}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No accounts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No accounts match "${searchQuery}"`
                : "Try adjusting your filters or add a new account"}
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newAccount) => {
          const typeConfig = {
            bank: { icon: Building2, color: "from-primary to-emerald" },
            cash: { icon: Wallet, color: "from-warning to-orange-500" },
            credit: { icon: CreditCard, color: "from-purple-500 to-pink-500" },
            upi: { icon: Smartphone, color: "from-cyan to-blue-500" },
            savings: { icon: PiggyBank, color: "from-emerald to-green-400" },
            investment: { icon: TrendingUp, color: "from-amber-500 to-yellow-400" },
          };
          const config = typeConfig[newAccount.type as keyof typeof typeConfig];
          setAccounts((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: newAccount.name,
              institution: undefined,
              number: newAccount.number || undefined,
              balance: newAccount.balance,
              type: newAccount.type,
              icon: config.icon,
              color: config.color,
              trend: 0,
              isHidden: false,
            },
          ]);
        }}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        accounts={accounts.filter((a) => !a.isHidden)}
        onTransfer={(fromId, toId, amount) => {
          setAccounts((prev) =>
            prev.map((a) => {
              if (a.id === fromId) return { ...a, balance: a.balance - amount };
              if (a.id === toId) return { ...a, balance: a.balance + amount };
              return a;
            })
          );
        }}
      />
    </DashboardLayout>
  );
};

export default Accounts;
