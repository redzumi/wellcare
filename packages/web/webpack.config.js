/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const config = {
  mode: 'development',
  target: 'web',
  context: __dirname,
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.[hash].js',
    publicPath: '/public'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.styl'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      common: path.resolve(__dirname, 'src/common/'),
      modules: path.resolve(__dirname, 'src/modules/'),
      store: path.resolve(__dirname, 'src/store/'),
      router: path.resolve(__dirname, 'src/router')
    }
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        include: /[\\/]node_modules[\\/]/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#5ABA4A',
                  'link-color': '#63C8F2',
                  'border-radius-base': '2px',
                  'layout-header-background': '#ffffff'
                },
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CopyPlugin([{ from: 'assets', to: 'assets' }]),
    new WriteFilePlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCSSAssetsPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:4000' }
    }
  },
  devtool: 'cheap-module-eval-source-map'
};

if (env === 'development') {
  config.module.rules.push({
    enforce: 'pre',
    test: /\.styl$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: ['typed-css-modules-loader?noEmit', 'stylus-loader']
  });
}

if (env === 'production') {
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'third_party',
          chunks: 'all'
        }
      }
    }
  };
}

module.exports = config;
