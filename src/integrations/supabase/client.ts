import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Values are baked in at build time by Vite; hardcoded strings are a safe fallback.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://vmnjrrkwicljsozaymtv.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbmpycmt3aWNsanNvemF5bXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMDMyMDQsImV4cCI6MjA4ODc3OTIwNH0.LPOAGtlZ0brOR4zyY3ePW7G2f3ahWuNMhKUV0HVa19E';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});