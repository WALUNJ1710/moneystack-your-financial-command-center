import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DateRange } from "react-day-picker";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DateRangePicker } from "@/components/transactions/DateRangePicker";
import { TransactionRow, Transaction } from "@/components/transactions/TransactionRow";
import { TransactionTypeToggle } from "@/components/transactions/TransactionTypeToggle";
import { CategoryFilterDropdown, CategoryFilter } from "@/components/transactions/CategoryFilterDropdown";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Music,
  Coffee,
  Plane,
  Briefcase,
  Heart,
  Gift,
  Smartphone,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Category definitions with colors
const categoryConfig = {
  shopping: { icon: ShoppingCart, color: "bg-purple-500", label: "Shopping" },
  food: { icon: Utensils, color: "bg-orange-500", label: "Food & Dining" },
  transport: { icon: Car, color: "bg-blue-500", label: "Transportation" },
  housing: { icon: Home, color: "bg-emerald-600", label: "Housing" },
  utilities: { icon: Zap, color: "bg-yellow-500", label: "Utilities" },
  entertainment: { icon: Music, color: "bg-pink-500", label: "Entertainment" },
  coffee: { icon: Coffee, color: "bg-amber-700", label: "Coffee & Drinks" },
  travel: { icon: Plane, color: "bg-cyan-500", label: "Travel" },
  work: { icon: Briefcase, color: "bg-slate-600", label: "Work" },
  health: { icon: Heart, color: "bg-red-500", label: "Health" },
  gifts: { icon: Gift, color: "bg-violet-500", label: "Gifts" },
  tech: { icon: Smartphone, color: "bg-indigo-500", label: "Technology" },
  investment: { icon: TrendingUp, color: "bg-green-500", label: "Investment" },
  income: { icon: ArrowDownLeft, color: "bg-success", label: "Income" },
  transfer: { icon: Repeat, color: "bg-cyan", label: "Transfer" },
};

// Sample transactions
const sampleTransactions: Transaction[] = [
  { id: 1, name: "Amazon Purchase", category: "shopping", categoryIcon: ShoppingCart, categoryColor: "bg-purple-500", amount: 284.99, type: "expense", date: "Feb 6, 2024", time: "2:30 PM", account: "Main Checking", status: "completed" },
  { id: 2, name: "Salary Deposit", category: "income", categoryIcon: ArrowDownLeft, categoryColor: "bg-success", amount: 5250.0, type: "income", date: "Feb 6, 2024", time: "9:00 AM", account: "Main Checking", status: "completed" },
  { id: 3, name: "Uber Eats Order", category: "food", categoryIcon: Utensils, categoryColor: "bg-orange-500", amount: 45.8, type: "expense", date: "Feb 5, 2024", time: "7:45 PM", account: "Credit Card", status: "completed" },
  { id: 4, name: "Gas Station", category: "transport", categoryIcon: Car, categoryColor: "bg-blue-500", amount: 62.5, type: "expense", date: "Feb 5, 2024", time: "3:20 PM", account: "Main Checking", status: "completed" },
  { id: 5, name: "Rent Payment", category: "housing", categoryIcon: Home, categoryColor: "bg-emerald-600", amount: 1850.0, type: "expense", date: "Feb 4, 2024", time: "10:00 AM", account: "Main Checking", status: "completed" },
  { id: 6, name: "Electric Bill", category: "utilities", categoryIcon: Zap, categoryColor: "bg-yellow-500", amount: 128.0, type: "expense", date: "Feb 3, 2024", time: "2:00 PM", account: "Main Checking", status: "completed" },
  { id: 7, name: "Spotify Premium", category: "entertainment", categoryIcon: Music, categoryColor: "bg-pink-500", amount: 9.99, type: "expense", date: "Feb 2, 2024", time: "12:00 AM", account: "Credit Card", status: "completed" },
  { id: 8, name: "Starbucks", category: "coffee", categoryIcon: Coffee, categoryColor: "bg-amber-700", amount: 6.75, type: "expense", date: "Feb 2, 2024", time: "8:30 AM", account: "Google Pay", status: "completed" },
  { id: 9, name: "Flight to NYC", category: "travel", categoryIcon: Plane, categoryColor: "bg-cyan-500", amount: 489.0, type: "expense", date: "Feb 1, 2024", time: "4:15 PM", account: "Credit Card", status: "pending" },
  { id: 10, name: "Freelance Payment", category: "income", categoryIcon: ArrowDownLeft, categoryColor: "bg-success", amount: 1200.0, type: "income", date: "Feb 1, 2024", time: "11:00 AM", account: "Main Checking", status: "completed" },
  { id: 11, name: "Transfer to Savings", category: "transfer", categoryIcon: Repeat, categoryColor: "bg-cyan", amount: 500.0, type: "transfer", date: "Jan 31, 2024", time: "9:00 PM", account: "Main Checking → Savings", status: "completed" },
  { id: 12, name: "Gym Membership", category: "health", categoryIcon: Heart, categoryColor: "bg-red-500", amount: 49.99, type: "expense", date: "Jan 30, 2024", time: "6:00 AM", account: "Credit Card", status: "completed" },
  { id: 13, name: "Birthday Gift", category: "gifts", categoryIcon: Gift, categoryColor: "bg-violet-500", amount: 75.0, type: "expense", date: "Jan 29, 2024", time: "3:00 PM", account: "Main Checking", status: "completed" },
  { id: 14, name: "iPhone Case", category: "tech", categoryIcon: Smartphone, categoryColor: "bg-indigo-500", amount: 35.0, type: "expense", date: "Jan 28, 2024", time: "1:30 PM", account: "Credit Card", status: "completed" },
  { id: 15, name: "Stock Dividend", category: "investment", categoryIcon: TrendingUp, categoryColor: "bg-green-500", amount: 124.50, type: "income", date: "Jan 27, 2024", time: "4:00 PM", account: "Investment", status: "completed" },
];

type SortField = "date" | "amount" | "name" | "category";
type SortOrder = "asc" | "desc";

const Transactions = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [transactionType, setTransactionType] = useState<"all" | "income" | "expense" | "transfer">("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [categories, setCategories] = useState<CategoryFilter[]>(
    Object.entries(categoryConfig).map(([id, config]) => ({
      id,
      label: config.label,
      icon: config.icon,
      color: config.color,
      checked: true,
    }))
  );

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.account.toLowerCase().includes(query)
      );
    }

    // Filter by transaction type
    if (transactionType !== "all") {
      result = result.filter((t) => t.type === transactionType);
    }

    // Filter by categories
    const checkedCategories = categories.filter((c) => c.checked).map((c) => c.id);
    result = result.filter((t) => checkedCategories.includes(t.category));

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "date":
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case "amount":
          comparison = b.amount - a.amount;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === "asc" ? -comparison : comparison;
    });

    return result;
  }, [transactions, searchQuery, transactionType, categories, sortField, sortOrder]);

  // Calculate totals
  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const transfer = filteredTransactions
      .filter((t) => t.type === "transfer")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, transfer, net: income - expense };
  }, [filteredTransactions]);

  const typeCounts = useMemo(() => ({
    income: transactions.filter((t) => t.type === "income").length,
    expense: transactions.filter((t) => t.type === "expense").length,
    transfer: transactions.filter((t) => t.type === "transfer").length,
  }), [transactions]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleCategoryChange = (id: string, checked: boolean) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked } : c))
    );
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Time", "Name", "Category", "Type", "Amount", "Account", "Status"];
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.time,
      t.name,
      t.category,
      t.type,
      t.amount.toString(),
      t.account,
      t.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border hover:border-primary/50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="border-border hover:border-primary/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Income</p>
            <p className="text-xl font-bold text-success">+${totals.income.toLocaleString()}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
            <p className="text-xl font-bold text-foreground">-${totals.expense.toLocaleString()}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Transfers</p>
            <p className="text-xl font-bold text-cyan">${totals.transfer.toLocaleString()}</p>
          </div>
          <div className="glass-card p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-emerald/5" />
            <p className="text-xs text-muted-foreground mb-1 relative">Net</p>
            <p className={`text-xl font-bold relative ${totals.net >= 0 ? "text-success" : "text-destructive"}`}>
              {totals.net >= 0 ? "+" : "-"}${Math.abs(totals.net).toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col lg:flex-row gap-3"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          {/* Date Range */}
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            className="w-auto"
          />

          {/* Category Filter */}
          <CategoryFilterDropdown
            categories={categories}
            onChange={handleCategoryChange}
            onClearAll={() => setCategories((prev) => prev.map((c) => ({ ...c, checked: false })))}
            onSelectAll={() => setCategories((prev) => prev.map((c) => ({ ...c, checked: true })))}
          />

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border hover:border-primary/50">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-border">
              {[
                { field: "date" as const, label: "Date" },
                { field: "amount" as const, label: "Amount" },
                { field: "name" as const, label: "Name" },
                { field: "category" as const, label: "Category" },
              ].map((option) => (
                <DropdownMenuItem
                  key={option.field}
                  onClick={() => handleSort(option.field)}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {sortField === option.field && (
                    sortOrder === "desc" ? (
                      <ChevronDown className="h-4 w-4 text-primary" />
                    ) : (
                      <ChevronUp className="h-4 w-4 text-primary" />
                    )
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TransactionTypeToggle
            value={transactionType}
            onChange={setTransactionType}
            counts={typeCounts}
          />
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">
            <div className="w-12" /> {/* Icon space */}
            <div className="flex-1">Transaction</div>
            <div className="hidden md:block w-[100px] text-right">Date</div>
            <div className="w-[100px] text-right">Amount</div>
            <div className="w-[80px]" /> {/* Actions space */}
          </div>

          {/* Transactions List */}
          <div className="divide-y divide-border/30">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={handleDelete}
                  onEdit={(id) => console.log("Edit", id)}
                  onDuplicate={(id) => {
                    const original = transactions.find((t) => t.id === id);
                    if (original) {
                      setTransactions((prev) => [
                        { ...original, id: Date.now() },
                        ...prev,
                      ]);
                    }
                  }}
                />
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          {filteredTransactions.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTransactions.length} transactions
              </p>
              <Button variant="ghost" size="sm" className="text-primary">
                Load more
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
