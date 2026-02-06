import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Moon,
  Sun,
  Globe,
  Download,
  Lock,
  ChevronRight,
  Mail,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  FileText,
  Database,
  Trash2,
  LogOut,
  Check,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    transactions: true,
    budgetAlerts: true,
    billReminders: true,
    weeklyReport: false,
  });
  const [privacy, setPrivacy] = useState({
    showBalance: true,
    twoFactor: true,
    biometric: false,
    activityStatus: true,
  });

  const handleExport = (format: string) => {
    toast.success(`Exporting data as ${format}...`);
  };

  const handleBackup = () => {
    toast.success("Backup created successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Profile & Security</h2>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/20 text-primary text-lg">JD</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Security Items */}
          <div className="space-y-1">
            <SettingsRow
              icon={Mail}
              label="Email Address"
              description="john.doe@example.com"
              action={<Button variant="ghost" size="sm">Change</Button>}
            />
            <SettingsRow
              icon={Key}
              label="Password"
              description="Last changed 30 days ago"
              action={<Button variant="ghost" size="sm">Update</Button>}
            />
            <SettingsRow
              icon={Shield}
              label="Two-Factor Authentication"
              description="Secure your account with 2FA"
              action={
                <Switch 
                  checked={privacy.twoFactor} 
                  onCheckedChange={(checked) => setPrivacy({...privacy, twoFactor: checked})}
                />
              }
            />
            <SettingsRow
              icon={Smartphone}
              label="Biometric Login"
              description="Use fingerprint or Face ID"
              action={
                <Switch 
                  checked={privacy.biometric} 
                  onCheckedChange={(checked) => setPrivacy({...privacy, biometric: checked})}
                />
              }
            />
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <h2 className="font-semibold">Appearance</h2>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-background">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  {darkMode ? "Currently using dark theme" : "Currently using light theme"}
                </p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>
        </motion.div>

        {/* Currency & Region Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Currency & Region</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Currency</p>
                <p className="text-sm text-muted-foreground">Select your preferred currency</p>
              </div>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">$ USD</SelectItem>
                  <SelectItem value="EUR">€ EUR</SelectItem>
                  <SelectItem value="GBP">£ GBP</SelectItem>
                  <SelectItem value="INR">₹ INR</SelectItem>
                  <SelectItem value="JPY">¥ JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">Choose your language</p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Date Format</p>
                <p className="text-sm text-muted-foreground">How dates are displayed</p>
              </div>
              <Select defaultValue="mdy">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-1">
            <SettingsRow
              icon={Smartphone}
              label="Push Notifications"
              description="Receive notifications on your device"
              action={
                <Switch 
                  checked={notifications.push} 
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              }
            />
            <SettingsRow
              icon={Mail}
              label="Email Notifications"
              description="Get updates via email"
              action={
                <Switch 
                  checked={notifications.email} 
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              }
            />
            <SettingsRow
              icon={Bell}
              label="Transaction Alerts"
              description="Notify for every transaction"
              action={
                <Switch 
                  checked={notifications.transactions} 
                  onCheckedChange={(checked) => setNotifications({...notifications, transactions: checked})}
                />
              }
            />
            <SettingsRow
              icon={Bell}
              label="Budget Alerts"
              description="Warn when near budget limits"
              action={
                <Switch 
                  checked={notifications.budgetAlerts} 
                  onCheckedChange={(checked) => setNotifications({...notifications, budgetAlerts: checked})}
                />
              }
            />
            <SettingsRow
              icon={Bell}
              label="Bill Reminders"
              description="Remind before bills are due"
              action={
                <Switch 
                  checked={notifications.billReminders} 
                  onCheckedChange={(checked) => setNotifications({...notifications, billReminders: checked})}
                />
              }
            />
            <SettingsRow
              icon={FileText}
              label="Weekly Report"
              description="Receive weekly spending summary"
              action={
                <Switch 
                  checked={notifications.weeklyReport} 
                  onCheckedChange={(checked) => setNotifications({...notifications, weeklyReport: checked})}
                />
              }
            />
          </div>
        </motion.div>

        {/* Data Export & Backup Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Data Export & Backup</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="font-medium mb-2">Export Your Data</p>
              <p className="text-sm text-muted-foreground mb-4">
                Download all your financial data in your preferred format
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('JSON')}>
                  <Database className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Backup</p>
                  <p className="text-sm text-muted-foreground">
                    Last backup: February 5, 2025
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleBackup}>
                  <Database className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Account Privacy</h2>
          </div>

          <div className="space-y-1">
            <SettingsRow
              icon={privacy.showBalance ? Eye : EyeOff}
              label="Show Balance on Dashboard"
              description="Display account balances openly"
              action={
                <Switch 
                  checked={privacy.showBalance} 
                  onCheckedChange={(checked) => setPrivacy({...privacy, showBalance: checked})}
                />
              }
            />
            <SettingsRow
              icon={Eye}
              label="Activity Status"
              description="Show when you're active"
              action={
                <Switch 
                  checked={privacy.activityStatus} 
                  onCheckedChange={(checked) => setPrivacy({...privacy, activityStatus: checked})}
                />
              }
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Privacy Policy
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Terms of Service
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 border-destructive/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="h-5 w-5 text-destructive" />
            <h2 className="font-semibold text-destructive">Danger Zone</h2>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out of all devices
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground">MoneyStack v1.0.0</p>
          <p className="text-xs text-muted-foreground">© 2025 All rights reserved</p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

// Reusable Settings Row Component
function SettingsRow({ 
  icon: Icon, 
  label, 
  description, 
  action 
}: { 
  icon: React.ElementType;
  label: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export default Settings;
