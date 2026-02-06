import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, Palette, Globe, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  {
    title: "Account",
    icon: User,
    items: [
      { label: "Profile Information", description: "Update your personal details" },
      { label: "Email & Password", description: "Manage your login credentials" },
      { label: "Two-Factor Authentication", description: "Add an extra layer of security", hasToggle: true, enabled: true },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Push Notifications", description: "Get notified on your device", hasToggle: true, enabled: true },
      { label: "Email Notifications", description: "Receive updates via email", hasToggle: true, enabled: false },
      { label: "Transaction Alerts", description: "Get notified for every transaction", hasToggle: true, enabled: true },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "Active Sessions", description: "Manage your logged in devices" },
      { label: "Login History", description: "View recent login activity" },
      { label: "Biometric Login", description: "Use fingerprint or face ID", hasToggle: true, enabled: false },
    ],
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    items: [
      { label: "Linked Cards", description: "Manage your payment cards" },
      { label: "Bank Accounts", description: "Connected bank accounts" },
      { label: "Default Payment", description: "Set your default payment method" },
    ],
  },
];

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + sectionIndex * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">{section.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                    className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.hasToggle ? (
                      <Switch defaultChecked={item.enabled} />
                    ) : (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Palette, label: "Appearance", description: "Theme & display" },
            { icon: Globe, label: "Language", description: "English (US)" },
            { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
          ].map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-card p-4 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Log out of your account
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
