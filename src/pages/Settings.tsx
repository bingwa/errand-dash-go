
import { useState } from "react";
import { Bell, Shield, Globe, Moon, Sun, Smartphone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    orderUpdates: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    locationSharing: true,
    activityStatus: true
  });

  const [theme, setTheme] = useState("light");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mobile-safe-area">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and app settings</p>
        </div>

        {/* Notifications */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Get notified about new orders and updates</p>
              </div>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Get text messages for urgent updates</p>
              </div>
              <Switch 
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-gray-500">Track your errands in real-time</p>
              </div>
              <Switch 
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Control your privacy settings and account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-500">Make your profile visible to other users</p>
              </div>
              <Switch 
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Sharing</p>
                <p className="text-sm text-gray-500">Share your location during active tasks</p>
              </div>
              <Switch 
                checked={privacy.locationSharing}
                onCheckedChange={(checked) => setPrivacy({...privacy, locationSharing: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Activity Status</p>
                <p className="text-sm text-gray-500">Show when you're online and available</p>
              </div>
              <Switch 
                checked={privacy.activityStatus}
                onCheckedChange={(checked) => setPrivacy({...privacy, activityStatus: checked})}
              />
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone size={20} />
              App Preferences
            </CardTitle>
            <CardDescription>
              Customize your app experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-500">Choose your preferred app theme</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="gap-1"
                >
                  <Sun size={14} />
                  Light
                </Button>
                <Button 
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="gap-1"
                >
                  <Moon size={14} />
                  Dark
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Globe size={14} />
                English
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="shadow-lg border-0 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              These actions cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
              Deactivate Account
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
