const sassResourcesLoader = require('craco-sass-resources-loader')
const path = require('path')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/index.scss',
      },
    },
  ],
}
