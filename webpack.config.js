/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var toString = Function.prototype.call.bind(Object.prototype.toString);

var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    debug: true,

    entry: {
        'vendor': './app/vendor.ts',
        'app': './app/app'
    },

    output: {
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    module: {
        preLoaders: [ { test: /\.ts$/, loader: 'tslint-loader' } ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403,   // 2403 -> Subsequent variable declarations
                        2300,   // 2300 -> Duplicate identifier
                        2374,   // 2374 -> Duplicate number index signature
                        2375,   // 2375 -> Duplicate string index signature
                        2656    // 2656 -> Exported external package typings file
                    ]
                },
                exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
            },
            // Support for *.json files.
            { test: /\.json$/,  loader: 'json-loader' },

            // Support for CSS as raw text
            { test: /\.css$/,   loader: 'raw-loader' },

            // support for .html as raw text
            { test: /\.html$/,  loader: 'raw-loader' }
        ],
        noParse: [
            /zone\.js\/dist\/.+/,
            /reflect-metadata/,
            /es(6|7)-.+/,
        ]
    },

    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity})
    ],

    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: false
    }
};

// Helper functions

function root(args) {
    args = sliceArgs(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = sliceArgs(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}
