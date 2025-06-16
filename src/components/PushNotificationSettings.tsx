
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Smartphone } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function PushNotificationSettings() {
  const { isSupported, isRegistered, enablePushNotifications } = usePushNotifications();

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-gray-500">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm">Only available on mobile devices</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Push Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Enable Notifications</p>
            <p className="text-xs text-gray-500">
              Get notified about new errands and updates
            </p>
          </div>
          <Switch
            checked={isRegistered}
            onCheckedChange={(checked) => {
              if (checked && !isRegistered) {
                enablePushNotifications();
              }
            }}
          />
        </div>
        
        {isRegistered && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Bell className="w-4 h-4" />
            <span>Push notifications are enabled</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
