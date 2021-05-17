var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
