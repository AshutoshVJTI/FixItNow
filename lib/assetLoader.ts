import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image } from 'react-native';

const imageAssets = [
  require('../assets/meme-templates/template1.png'),
  require('../assets/meme-templates/template2.png'),
  require('../assets/meme-templates/template3.png'),
];

const fontAssets = {
  'custom-icons': require('../assets/fonts/custom-icons.ttf'),
};

async function cacheImages(images: number[]) {
  return Promise.all(
    images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    })
  );
}

async function cacheFonts(fonts: { [key: string]: number }) {
  return Font.loadAsync(fonts);
}

export async function loadInitialAssets() {
  try {
    const imageLoadingPromise = cacheImages(imageAssets);
    const fontLoadingPromise = cacheFonts(fontAssets);
    
    await Promise.all([imageLoadingPromise, fontLoadingPromise]);
  } catch (error) {
    console.error('Error preloading assets:', error);
  }
} 