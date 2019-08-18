const config = require('./base.conf.js');

module.exports = {
  ...config,
  mode: "development",
  devServer: {
    port: 3000,
    clientLogLevel: "info",
    historyApiFallback: true,
  }
}