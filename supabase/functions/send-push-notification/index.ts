
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { to, title, body, data } = await req.json()

    console.log('Sending push notification:', { to, title, body })

    // Get user's push token from database
    let pushToken = to
    if (!to.startsWith('f') && !to.startsWith('e')) {
      // If 'to' is a user ID, fetch their push token
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('push_token')
        .eq('id', to)
        .single()
      
      if (!profile?.push_token) {
        throw new Error('User has no push token registered')
      }
      pushToken = profile.push_token
    }

    // Here you would integrate with Firebase Cloud Messaging (FCM)
    // or Apple Push Notification service (APNs) to actually send the notification
    // For now, we'll just log the notification details
    
    const notification = {
      to: pushToken,
      title,
      body,
      data: data || {}
    }

    console.log('Notification prepared:', notification)

    // TODO: Implement actual push notification sending
    // Example for FCM:
    // const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `key=${Deno.env.get('FCM_SERVER_KEY')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     to: pushToken,
    //     notification: {
    //       title,
    //       body,
    //     },
    //     data,
    //   }),
    // })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Push notification queued for delivery',
        notification 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending push notification:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
