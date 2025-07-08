module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/common/components',
          '@features': './src/features',
          '@theme': './src/common/theme',
          '@navigation': './src/navigation',
          '@localization': './src/localization',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
  ],
};
