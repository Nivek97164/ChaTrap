import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_APP_SUPABASE_URL || 'https://aaxohqsrzmkhipwzceif.supabase.co';
const supabaseKey = process.env.EXPO_APP_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheG9ocXNyem1raGlwd3pjZWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MzEwNzQsImV4cCI6MjA0MjMwNzA3NH0.8AL6-Fp3TNzr_gBbdtiyKydhXqzGqfCzF3C3tGxOQ_M';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase