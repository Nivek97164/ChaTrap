import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_APP_SUPABASE_URL || 'YOUR_URL';
const supabaseKey = process.env.EXPO_APP_ANON_KEY || 'YOUR_KEY';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
