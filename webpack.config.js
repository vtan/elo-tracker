const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main/typescript/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/target/scala-2.13/webroot"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      "template": "src/main/typescript/index.html"
    })
  ],

  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: {
          host: "0.0.0.0",
          protocol: 'http:',
          port: 8081
        }
      }
    }
  }
};
