
import { useState, useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setIsSupported(true);
      initializePushNotifications();
    }
  }, [user]);

  const initializePushNotifications = async () => {
    try {
      // Request permission
      const permission = await PushNotifications.requestPermissions();
      
      if (permission.receive === 'granted') {
        // Register for push notifications
        await PushNotifications.register();
        
        // Listen for registration
        PushNotifications.addListener('registration', async (token) => {
          console.log('Push registration success, token: ' + token.value);
          
          if (user) {
            // Save token to database
            await savePushToken(token.value);
            setIsRegistered(true);
          }
        });

        // Listen for registration errors
        PushNotifications.addListener('registrationError', (error) => {
          console.error('Error on registration: ' + JSON.stringify(error));
          toast({
            title: "Push Notification Error",
            description: "Failed to register for push notifications",
            variant: "destructive"
          });
        });

        // Listen for incoming notifications
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push notification received: ', notification);
          toast({
            title: notification.title || "Notification",
            description: notification.body || "You have a new notification"
          });
        });

        // Listen for notification actions
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('Push notification action performed', notification.actionId, notification.inputValue);
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Push notifications permission was denied",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  };

  const savePushToken = async (token: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ push_token: token })
        .eq('id', user.id);

      if (error) {
        console.error('Error saving push token:', error);
      } else {
        console.log('Push token saved successfully');
      }
    } catch (error) {
      console.error('Error saving push token:', error);
    }
  };

  const enablePushNotifications = () => {
    if (isSupported && !isRegistered) {
      initializePushNotifications();
    }
  };

  return {
    isSupported,
    isRegistered,
    enablePushNotifications
  };
};
