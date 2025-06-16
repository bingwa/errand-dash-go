
-- Add a column to store push notification tokens in the profiles table
ALTER TABLE public.profiles ADD COLUMN push_token TEXT;
