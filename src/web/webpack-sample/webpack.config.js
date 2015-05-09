var bower_dir = __dirname + '/bower_components';
var node_modules_dir = __dirname + '/node_modules';
var autoprefixer = require('autoprefixer-core');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
  new webpack.ProvidePlugin({
    Materialize: "materialize",
    validate_field: "materialize",
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    "root.jQuery": "jquery",
    alt: "alt"
  }),
  new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
];

//if(process.env.NODE_ENV === 'production'){
  plugins.push(new HtmlWebpackPlugin({
    title: 'App',
    filename: 'index.html',
    template: './src/templates/dev.html'
  }));
//}

var config = {
  module: {
    noParse: [bower_dir + '/materialize/dist/js/materialize.js',bower_dir + '/jquery/dist/jquery.js'],
    loaders: [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.jsx$/,
      loaders: ["babel"]
    }, {
      test: /\.js$/,
      loaders: ["babel"]
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.sass$/,
      // Passing indentedSyntax query param to node-sass
      loader: "style!css!sass?indentedSyntax!postcss"
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff2"
    }, {
      test: /\.ttf$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot$/,
      loader: "file-loader"
    }, {
      test: /\.svg$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 version']
  })],
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'materialize': bower_dir + '/materialize/dist/js/materialize.js',
      'materialize.css': bower_dir + '/materialize/dist/css/materialize.min.css',
      'jquery': bower_dir + '/jquery/dist/jquery.js',
      'socket.io-client' : bower_dir + '/socket.io-client/socket.io.js',
      'alt' : node_modules_dir + '/alt/dist/alt.js'
    },
    extensions: ['', '.jsx', '.js', '.sass', '.scss']
  },
  entry: {
    app: process.env.NODE_ENV === 'development' ? ['webpack/hot/dev-server','./src/app.jsx'] : ['./src/app.jsx'],
    vendors: ['materialize', 'materialize.css', 'jquery']
  },
  output: {
    // If in production mode we put the files into the dist folder instead
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: process.env.NODE_ENV === 'production' ? "app-[hash].js" : "app.js",
    publicPath: '/web/'
  },
  plugins: plugins
};

module.exports = config;
