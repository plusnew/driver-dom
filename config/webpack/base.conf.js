const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  context: path.join(__dirname, '..', '..', 'src'),
  entry: ['./index.tsx'],
  mode: 'development',
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        default: {
          minChunks: 1,
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '..', '..', 'dist')],
    }),
  ],
};
