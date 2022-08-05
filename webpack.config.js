const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin
const path = require('path');

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
}

const ruleForHtml = {
  test: /\.html$/i,
  loader: "html-loader"
}

const ruleForBabel = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

module.exports = (env, argv) => {
  const { mode } = argv
  const isProduction = mode === 'production'
  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js', // Change the filename
      path: path.resolve(__dirname, "build") // Change the folder name
    },
    module: {
      rules: [
        ruleForStyles,
        ruleForHtml,
        ruleForBabel
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' }) // Modify template if necessary
    ],
    devServer: {
      open: true,
    },
  }
}