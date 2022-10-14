module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '~': './src',
          'theme': './theme.config.ts',
          '@composables': './src/composables',
          '@components': './src/components',
          '@features': './src/features',
          '@assets': './assets',
        },
      }],
    ],
  }
}
