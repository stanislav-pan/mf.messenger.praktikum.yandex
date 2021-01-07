import { merge } from 'webpack-merge';
import common from './webpack.common';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    open: true,
    writeToDisk: true,
    historyApiFallback: {
      index: 'index.html',
    },
    compress: true,
  } as DevServerConfiguration,
});
