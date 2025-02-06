// This file helps TypeScript understand our assets
export const assets = {
  icon: require('./icon.png'),
  splash: require('./splash.png'),
  adaptiveIcon: require('./adaptive-icon.png'),
  favicon: require('./favicon.png'),
} as const;

export type AssetsType = typeof assets;

// Helper function to check if assets exist
export function validateAssets(): boolean {
  try {
    Object.values(assets);
    return true;
  } catch (error) {
    console.error('Missing required assets:', error);
    return false;
  }
} 