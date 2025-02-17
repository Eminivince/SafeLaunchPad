module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Provide fallbacks for Node modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false, // or require.resolve("browserify-fs") if you need partial functionality
        tty: false, // or require.resolve("tty-browserify")
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        zlib: require.resolve("browserify-zlib"),
        buffer: require.resolve("buffer"), // Add this
      };

      return webpackConfig;
    },
  },
};
