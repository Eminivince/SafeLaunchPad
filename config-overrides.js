const webpack = require("webpack");

module.exports = function override(config, env) {

  config.resolve.fallback = {
    ...config.resolve.fallback,
    // If you need "fs" or "tty" or others to be disabled:
    fs: false,
    tty: false,
    url: require.resolve("url/"), // url
    os: require.resolve("os-browserify/browser"), // os-browserify
    http: require.resolve("stream-http"), // stream-http
    https: require.resolve("https-browserify"), // https-browserify
    assert: require.resolve("assert/"), // assert
    stream: require.resolve("stream-browserify"), // stream-browserify
    buffer: require.resolve("buffer/"), // buffer
    zlib: require.resolve("browserify-zlib"),
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};
