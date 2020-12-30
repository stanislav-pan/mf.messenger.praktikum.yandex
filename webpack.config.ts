import { Configuration } from 'webpack';
import path from 'path';
import { Options as TSLoaderOptions } from 'ts-loader';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Options as SassLoaderOptions } from 'sass-loader';
import MiniCssPlugin from 'mini-css-extract-plugin';

module.exports = {
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
    new MiniCssPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
    }),
  ],
} as Configuration;
