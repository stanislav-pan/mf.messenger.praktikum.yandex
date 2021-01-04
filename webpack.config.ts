import { Configuration } from 'webpack';
import path from 'path';
import { Options as TSLoaderOptions } from 'ts-loader';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Options as SassLoaderOptions } from 'sass-loader';
import MiniCssPlugin from 'mini-css-extract-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { Options as FileLoaderOptions } from 'file-loader';
import CopyPlugin from 'copy-webpack-plugin';

module.exports = {
  devServer: {
    overlay: true,
    open: true,
    writeToDisk: true,
    historyApiFallback: {
      index: 'index.html'
    },
    compress: true
  } as DevServerConfiguration,
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'client', 'app', 'index.ts'),
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            } as TSLoaderOptions,
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {} as SassLoaderOptions,
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {} as FileLoaderOptions,
          },
        ],
      },
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: ['./src/client/'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/client/static'),
          to: path.resolve(__dirname, 'dist/static/'),
        },
        {
          from: path.resolve(__dirname, 'src/client/app'),
          context: path.resolve(__dirname, 'src/client/app'),
          filter: (resourcePath) => {
            const splitedPath = resourcePath.split('/');
            const fileName = splitedPath[splitedPath.length - 1];

            return fileName.includes('.njk');
          },
          to: path.resolve(__dirname, 'dist/static/templates/[name].[ext]'),
        },
      ],
    }),
    new MiniCssPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
    }),
  ],
} as Configuration;
