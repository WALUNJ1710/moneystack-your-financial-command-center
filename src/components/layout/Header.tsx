import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, User, ChevronDown, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  { id: 1, title: "Payment Received", message: "+$1,250.00 from Client A", time: "2m ago", unread: true },
  { id: 2, title: "Bill Due Tomorrow", message: "Netflix subscription - $15.99", time: "1h ago", unread: true },
  { id: 3, title: "Goal Achieved!", message: "Emergency fund target reached", time: "3h ago", unread: false },
];

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search transactions, accounts..."
            className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-transparent rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-secondary transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <Moon className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 glass-card p-2 shadow-glass"
              >
                <div className="px-3 py-2 border-b border-border">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
                      className="p-3 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? "bg-primary" : "bg-muted"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-primary hover:text-primary hover:bg-primary/10"
                  >
                    View all notifications
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 hover:bg-secondary px-3"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-fintech flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 glass-card border-border"
          >
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" />
              Appearance
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
