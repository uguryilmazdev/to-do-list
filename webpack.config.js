const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  /* we dont need webpack dev-server due to vscode live preview extension.
  devServer: {
    static: './dist',
  },
  */
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To-do List',
      template: './src/asset/index.html', // 
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  /* we dont need webpack dev-server due to vscode live preview extension.
  if use it, add  "start": "webpack serve --open",  to json or check documentation
  optimization: {
    runtimeChunk: 'single',
  },
  */
};