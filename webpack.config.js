const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const optimization = () => {
  const config = {
    splitChunks: { chunks: "all" }
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
    },
  },

  optimization: optimization(),

  devServer: {
    port: 2200,
    overlay: true,
    hot: isDev
  },

  devtool: isDev ? 'source-map' : '',

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),

    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),

    new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/bg'),
            to: path.resolve(__dirname, 'dist/bg')
          },
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          },
        ],
      }),

      new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        ]
      },

      // {
      //   test: /\.(html)$/,
      //   use: ['html-loader']
      // },

      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.scss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif|ico)$/,
        use: ['file-loader']
      },

      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  }
};