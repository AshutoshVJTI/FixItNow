import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

// Only create the client if we have valid configuration
const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

// Validate URL format and create client
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://'))
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Since we're not using auth
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    })
  : null;

// Log configuration issues in development
if (__DEV__) {
  if (!supabaseUrl) {
    console.warn('Supabase URL is missing');
  } else if (!supabaseUrl.startsWith('https://')) {
    console.warn('Invalid Supabase URL format - must start with https://');
  }
  if (!supabaseAnonKey) {
    console.warn('Supabase Anon Key is missing');
  }
} 