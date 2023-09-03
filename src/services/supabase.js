import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kekcadtjfrtalqfpxrxi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2NhZHRqZnJ0YWxxZnB4cnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNDQ2MjksImV4cCI6MjAwODcyMDYyOX0.Q_EmV4IkyKaSRihJ_uGC5g5VwylmfKrbnwuAKxrnUN8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
