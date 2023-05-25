module.exports = {
  rollup(config) {
    config.output.format = "esm";
    return config;
  },
};
