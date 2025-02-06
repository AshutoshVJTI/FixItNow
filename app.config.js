export default {
  expo: {
    name: "FixItNow",
    slug: "fixitnow",
    version: "1.0.0",
    scheme: "fixitnow",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.fixitnow",
      newArchEnabled: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.yourcompany.fixitnow",
      newArchEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
}; 