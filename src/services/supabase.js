import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hklxsnffbuencruibjdi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbHhzbmZmYnVlbmNydWliamRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMDc0MTcsImV4cCI6MjA0MDU4MzQxN30.9IqKWJRPYRMRqZjsk0dggbA7QnKi43mFN3qFvOfxogs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
