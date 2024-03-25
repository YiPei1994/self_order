import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dpfhcdgsjaxjnmwyrssk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZmhjZGdzamF4am5td3lyc3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTk2NDgsImV4cCI6MjAyNjQzNTY0OH0.GISccykLjG_MRaH_vx9UCP19XyNP3OiGZWyM_sD0ckE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
