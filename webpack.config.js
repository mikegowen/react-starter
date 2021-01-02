const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    publicPath: "/"
  },
  entry: "src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[fullhash].js"
  }
}
