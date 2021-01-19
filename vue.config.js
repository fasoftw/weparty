const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
module.exports = {
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin()]
    },
    devServer: {
        disableHostCheck: true,
        port: 8080,
        public: 'localhost:8080'
    },
    publicPath: "/"

};