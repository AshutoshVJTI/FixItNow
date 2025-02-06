export const config = {
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  },
};

// Validate required configuration
if (__DEV__) {
  const missingConfigs = [];
  
  if (!config.openai.apiKey) {
    missingConfigs.push('EXPO_PUBLIC_OPENAI_API_KEY');
  }
  
  if (!config.supabase.url) {
    missingConfigs.push('EXPO_PUBLIC_SUPABASE_URL');
  }
  
  if (!config.supabase.anonKey) {
    missingConfigs.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (missingConfigs.length > 0) {
    console.warn(
      'Missing environment variables:\n' +
      missingConfigs.map(key => `- ${key}`).join('\n') +
      '\nPlease check your .env file.'
    );
  }
} 