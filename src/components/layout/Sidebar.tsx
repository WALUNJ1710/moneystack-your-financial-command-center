import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Wallet,
  ArrowLeftRight,
  BarChart3,
  PiggyBank,
  Target,
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Wallet, label: "Accounts", path: "/accounts" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
  { icon: BarChart3, label: "Analysis", path: "/analysis" },
  { icon: PiggyBank, label: "Budgets", path: "/budgets" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: Receipt, label: "Bills", path: "/bills" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <motion.img
          src={logo}
          alt="MoneyStack"
          className="h-10 w-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold"
          >
            <span className="text-foreground">Money</span>
            <span className="text-primary">Stack</span>
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""} ${
                  collapsed ? "justify-center px-3" : ""
                }`}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-primary" : ""
                  }`}
                />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-3 w-2 h-2 rounded-full bg-primary animate-pulse-glow"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
