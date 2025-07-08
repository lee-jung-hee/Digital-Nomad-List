import { createClient } from "@supabase/supabase-js";

const apiUrl = "https://iqqxymuhmairdikzpske.supabase.co";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcXh5bXVobWFpcmRpa3pwc2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MzYyNTksImV4cCI6MjA2NzUxMjI1OX0.U2TIGk02vHk3hSi-cS45r3mDxLlMvq27S6r1mA4HEwg";

export const supabase = createClient(apiUrl, apiKey);
