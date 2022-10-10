module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '~': './src',
          '@composables': './src/composables',
          '@features': './src/features',
          '@assets': './assets',
        },
      }],
    ],
  }
}
