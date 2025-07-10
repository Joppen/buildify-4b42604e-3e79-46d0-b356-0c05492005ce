
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykwjovpioqdnflcrsgsp.supabase.co';
// Using a placeholder key for development - in production, this should be properly secured
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd2pvdnBpb3FkbmZsY3JzZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NDM2MDAsImV4cCI6MjAwNTQxOTYwMH0.placeholder-key-replace-with-actual';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);