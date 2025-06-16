
import { useState } from "react";
import { User, Mail, Phone, MapPin, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import PushNotificationSettings from "@/components/PushNotificationSettings";

export default function Settings() {
  const { user, userProfile, signOut } = useAuth();
  const { theme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [location, setLocation] = useState("auto");
  const [language, setLanguage] = useState("en");

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 mobile-safe-area">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your account preferences</p>
          </div>
          <Badge variant="outline" className="capitalize">
            {userProfile?.role || 'user'}
          </Badge>
        </div>

        <div className="grid gap-6">
          {/* Account Information */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <p className="text-gray-900 dark:text-white">{userProfile?.full_name || 'Not set'}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <p className="text-gray-900 dark:text-white">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <PushNotificationSettings />

          {/* Notification Preferences */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get text message alerts</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Location Sharing</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Share location for better service</p>
                </div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Palette className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{theme}</span>
                  <ThemeToggle />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Select your language</p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Support & Help */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <HelpCircle className="w-5 h-5" />
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Help Center
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Terms of Service
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="shadow-lg border-0 dark:bg-slate-800">
            <CardContent className="p-6">
              <Button 
                onClick={handleLogout}
                variant="destructive" 
                className="w-full gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
