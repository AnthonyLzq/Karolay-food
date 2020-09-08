const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const currentYear = new Date().getFullYear()

module.exports = {
  context: __dirname,
  entry  : './src/index.ts',
  externals: [nodeExternals()],
  module : {
    rules: [
      {
        exclude: /node_modules/,
        test   : /.ts$/,
        use    : {
          loader: 'ts-loader'
        },
      }
    ]
  },
  node: {
    __dirname: false
  },
  plugins: [
    new MomentTimezoneDataPlugin({
      matchZones: /^America/
    }),
    new MomentTimezoneDataPlugin({
      startYear: currentYear - 5,
      endYear  : currentYear + 5,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename  : 'index.js',
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  target: 'node'
}
