// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://azpknjxdalhlshambyzg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cGtuanhkYWxobHNoYW1ieXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzM3MzYsImV4cCI6MjA2MzI0OTczNn0.cBXGbraBwRMaLrR-4iLE1IOXVNYO4cxidc8dkmvDJkY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);