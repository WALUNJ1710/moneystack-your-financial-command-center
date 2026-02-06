import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Receipt, 
  Plus, 
  Calendar, 
  AlertCircle, 
  CreditCard,
  Tv,
  Music,
  Wifi,
  Zap,
  Home,
  Car,
  Smartphone,
  Dumbbell,
  ShieldCheck,
  LayoutGrid,
  List,
  Clock,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillCard } from "@/components/bills/BillCard";
import { SubscriptionCard } from "@/components/bills/SubscriptionCard";
import { EMICard } from "@/components/bills/EMICard";
import { BillsCalendar } from "@/components/bills/BillsCalendar";
import { toast } from "sonner";

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue" | "due-soon";
  category: string;
  icon: LucideIcon;
  color: string;
  recurring: boolean;
}

interface Subscription {
  id: number;
  name: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  nextBilling: string;
  icon: LucideIcon;
  color: string;
  status: "active" | "paused" | "cancelled";
}

interface EMI {
  id: number;
  name: string;
  totalAmount: number;
  paidAmount: number;
  emiAmount: number;
  remainingEmis: number;
  totalEmis: number;
  nextDueDate: string;
}

const initialBills: Bill[] = [
  { id: 1, name: "Rent", amount: 1850, dueDate: "2025-02-01", status: "paid", category: "Housing", icon: Home, color: "bg-primary", recurring: true },
  { id: 2, name: "Electric Bill", amount: 128, dueDate: "2025-02-08", status: "due-soon", category: "Utilities", icon: Zap, color: "bg-yellow-500", recurring: true },
  { id: 3, name: "Internet", amount: 79.99, dueDate: "2025-02-10", status: "due-soon", category: "Utilities", icon: Wifi, color: "bg-blue-500", recurring: true },
  { id: 4, name: "Phone Bill", amount: 85, dueDate: "2025-02-15", status: "upcoming", category: "Utilities", icon: Smartphone, color: "bg-purple-500", recurring: true },
  { id: 5, name: "Car Insurance", amount: 145, dueDate: "2025-02-03", status: "overdue", category: "Insurance", icon: ShieldCheck, color: "bg-red-500", recurring: true },
  { id: 6, name: "Gas Bill", amount: 65, dueDate: "2025-02-20", status: "upcoming", category: "Utilities", icon: Zap, color: "bg-orange-500", recurring: true },
];

const initialSubscriptions: Subscription[] = [
  { id: 1, name: "Netflix", amount: 15.99, billingCycle: "monthly", nextBilling: "2025-02-20", icon: Tv, color: "bg-red-500", status: "active" },
  { id: 2, name: "Spotify", amount: 9.99, billingCycle: "monthly", nextBilling: "2025-02-15", icon: Music, color: "bg-green-500", status: "active" },
  { id: 3, name: "Gym Membership", amount: 49.99, billingCycle: "monthly", nextBilling: "2025-02-25", icon: Dumbbell, color: "bg-orange-500", status: "active" },
  { id: 4, name: "iCloud Storage", amount: 2.99, billingCycle: "monthly", nextBilling: "2025-02-18", icon: CreditCard, color: "bg-blue-500", status: "active" },
  { id: 5, name: "Disney+", amount: 7.99, billingCycle: "monthly", nextBilling: "2025-02-22", icon: Tv, color: "bg-indigo-500", status: "paused" },
];

const initialEMIs: EMI[] = [
  { id: 1, name: "Car Loan", totalAmount: 25000, paidAmount: 15000, emiAmount: 450, remainingEmis: 22, totalEmis: 60, nextDueDate: "2025-02-05" },
  { id: 2, name: "MacBook Pro", totalAmount: 3000, paidAmount: 1500, emiAmount: 250, remainingEmis: 6, totalEmis: 12, nextDueDate: "2025-02-10" },
  { id: 3, name: "Home Appliances", totalAmount: 2400, paidAmount: 800, emiAmount: 200, remainingEmis: 8, totalEmis: 12, nextDueDate: "2025-02-15" },
];

const Bills = () => {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [emis] = useState<EMI[]>(initialEMIs);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const stats = useMemo(() => {
    const overdueBills = bills.filter((b) => b.status === "overdue");
    const dueSoonBills = bills.filter((b) => b.status === "due-soon");
    const upcomingBills = bills.filter((b) => b.status === "upcoming" || b.status === "due-soon");
    const paidBills = bills.filter((b) => b.status === "paid");

    const upcomingTotal = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
    const overdueTotal = overdueBills.reduce((sum, b) => sum + b.amount, 0);
    const monthlySubscriptions = subscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => sum + (s.billingCycle === "monthly" ? s.amount : s.amount / 12), 0);
    const monthlyEMIs = emis.reduce((sum, e) => sum + e.emiAmount, 0);

    return {
      overdueBills,
      dueSoonBills,
      upcomingBills,
      paidBills,
      upcomingTotal,
      overdueTotal,
      monthlySubscriptions,
      monthlyEMIs,
      totalMonthly: upcomingTotal + monthlySubscriptions + monthlyEMIs,
    };
  }, [bills, subscriptions, emis]);

  const handlePayBill = (id: number) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "paid" as const } : b))
    );
    toast.success("Bill marked as paid!");
  };

  const handleEditBill = (id: number) => {
    toast.info("Edit bill modal would open here");
  };

  const handleRemindBill = (id: number) => {
    toast.success("Reminder set!");
  };

  const handlePauseSubscription = (id: number) => {
    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "paused" ? "active" as const : "paused" as const }
          : s
      )
    );
    toast.success("Subscription updated!");
  };

  const handleCancelSubscription = (id: number) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "cancelled" as const } : s))
    );
    toast.success("Subscription cancelled");
  };

  // Sort bills: overdue first, then due-soon, then upcoming, then paid
  const sortedBills = useMemo(() => {
    const statusOrder = { overdue: 0, "due-soon": 1, upcoming: 2, paid: 3 };
    return [...bills].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }, [bills]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Bills & Subscriptions</h1>
            <p className="text-muted-foreground">Manage your recurring payments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className="h-8"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Bill
            </Button>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Due This Month</span>
            </div>
            <p className="text-2xl font-bold">${stats.upcomingTotal.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.upcomingBills.length} bills upcoming
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/20">
                <Tv className="h-5 w-5 text-cyan-500" />
              </div>
              <span className="text-sm text-muted-foreground">Subscriptions</span>
            </div>
            <p className="text-2xl font-bold">${stats.monthlySubscriptions.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {subscriptions.filter((s) => s.status === "active").length} active
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-purple-500/20">
                <CreditCard className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">EMI Payments</span>
            </div>
            <p className="text-2xl font-bold">${stats.monthlyEMIs.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">{emis.length} active loans</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-success/20">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Total Monthly</span>
            </div>
            <p className="text-2xl font-bold">${stats.totalMonthly.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">recurring expenses</p>
          </motion.div>
        </div>

        {/* Overdue Alert */}
        {stats.overdueBills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 border-destructive/50 bg-destructive/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </motion.div>
                <div>
                  <p className="font-semibold text-destructive">
                    {stats.overdueBills.length} Overdue Bill{stats.overdueBills.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total: ${stats.overdueTotal.toFixed(2)} needs immediate attention
                  </p>
                </div>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => stats.overdueBills.forEach((b) => handlePayBill(b.id))}
              >
                Pay All Overdue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Due Soon Alert */}
        {stats.dueSoonBills.length > 0 && stats.overdueBills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 border-warning/50 bg-warning/10"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-warning">
                  {stats.dueSoonBills.length} bill{stats.dueSoonBills.length > 1 ? "s" : ""} due within 7 days
                </p>
                <p className="text-sm text-muted-foreground">
                  Total: ${stats.dueSoonBills.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        {viewMode === "calendar" ? (
          <BillsCalendar
            bills={bills.map((b) => ({ ...b, icon: undefined }))}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        ) : (
          <Tabs defaultValue="bills" className="space-y-4">
            <TabsList className="bg-secondary p-1">
              <TabsTrigger value="bills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Receipt className="h-4 w-4 mr-2" />
                Bills ({bills.length})
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Tv className="h-4 w-4 mr-2" />
                Subscriptions ({subscriptions.length})
              </TabsTrigger>
              <TabsTrigger value="emis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="h-4 w-4 mr-2" />
                EMIs ({emis.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bills" className="space-y-3">
              {sortedBills.map((bill, index) => (
                <BillCard
                  key={bill.id}
                  {...bill}
                  index={index}
                  onPay={handlePayBill}
                  onEdit={handleEditBill}
                  onRemind={handleRemindBill}
                />
              ))}
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptions.map((sub, index) => (
                  <SubscriptionCard
                    key={sub.id}
                    {...sub}
                    index={index}
                    onPause={handlePauseSubscription}
                    onCancel={handleCancelSubscription}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="emis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emis.map((emi, index) => (
                  <EMICard key={emi.id} {...emi} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Bills;
