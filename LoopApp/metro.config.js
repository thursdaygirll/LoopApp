const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Allow Metro to resolve .cjs files used by Firebase v11+
if (!defaultConfig.resolver.sourceExts.includes("cjs")) {
  defaultConfig.resolver.sourceExts.push("cjs");
}

// Disable package exports resolution to avoid conflicts with Firebase's per-env builds
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
