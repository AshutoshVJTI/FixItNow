// Create assets/icon.png (1024x1024)
// Create assets/splash.png (2048x2048)
// Create assets/adaptive-icon.png (1024x1024)
// Create assets/favicon.png (48x48) 

import { Image } from 'react-native';

export const AppIcon = require('./icon.png');

// Ensure the image exists and is properly typed
export type AppIconType = typeof AppIcon; 