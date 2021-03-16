const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new DefinePlugin({
    'process.env': {
      'API_KEY': JSON.stringify(process.env.API_KEY),
    }
  }),
    new CopyWebpackPlugin({
      patterns: [
        {from:'src/img',to:'imgs'}
      ]
    })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs'
          }
        }
      }
    ]
  }
};
