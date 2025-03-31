const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  // Ensure config.resolve exists
  config.resolve = config.resolve || {};
  config.resolve.fallback = config.resolve.fallback || {};

  // Add polyfills
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve("path-browserify"),
    util: require.resolve("util/"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    fs: false,
    os: require.resolve("os-browserify/browser"),
    assert: require.resolve("assert/"),
    constants: require.resolve("constants-browserify"),
    process: require.resolve("process/browser")
  };

  // Add babel-loader
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          ['babel-plugin-styled-components', {
            ssr: false,
            displayName: true,
            preprocess: false
          }]
        ]
      }
    }
  });

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  // Add resolve aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    'process': 'process/browser'
  };

  // Add resolve extensions
  config.resolve.extensions = [...(config.resolve.extensions || []), '.js', '.jsx', '.ts', '.tsx'];

  return config;
}; 