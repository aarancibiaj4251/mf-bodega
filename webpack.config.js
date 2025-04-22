const { merge } = require("webpack-merge");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "arancibia",
    projectName: "bodega",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Injects CSS into the DOM
            'css-loader',   // Resolves CSS imports
            'sass-loader'   // Compiles Sass to CSS
          ]
        },
      ]
    },
    externals: [
        /^@arancibia\/.+/, 'history',
      'react', 'react-router', 'react-dom', '@remix-run/router',
      'redux',
      'moment'
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    plugins: [
      new Dotenv({
        path: './.env', // or './.env.local', etc.
        systemvars: true // include process.env from the system too
      }),
    ],
  });
};
