const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/../dist')
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        })
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            fs: false,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            process: require.resolve('process/browser'),
            stream: require.resolve('stream-browserify'),
            vm: require.resolve('vm-browserify')
        }
    },

    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: true
    },

    module: {
        rules: [
        ]
    }
};
