const path = require('path');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['p5'],
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: './'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: 'vendor',
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
