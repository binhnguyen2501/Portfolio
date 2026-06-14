const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const srcPath = path.resolve(__dirname, "src");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "@": srcPath,
      };

      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
      );

      return webpackConfig;
    },
  },
};
