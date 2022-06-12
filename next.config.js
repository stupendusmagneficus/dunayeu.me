const withFonts = require("next-fonts");
const R = require("ramda");

module.exports = R.pipe(withFonts)({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    });
    return config;
  },
});
