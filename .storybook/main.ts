import type { StorybookConfig } from '@storybook/react-webpack5';
import { sb } from 'storybook/test';
import webpack from 'webpack';

sb.mock(import('../src/utils/notifications.ts'), { spy: true });

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/react-webpack5",
  staticDirs: [
    '../public',
    { from: '../src/assets/img', to: '/assets' }
  ],
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    });
    config.plugins?.push(
      new webpack.DefinePlugin({
        'process.env.REACT_APP_API_URL_MS': JSON.stringify(process.env.REACT_APP_API_URL_MS),
        'process.env.KEYCLOAK_URL': JSON.stringify(process.env.KEYCLOAK_URL),
        'process.env.KEYCLOAK_REALM': JSON.stringify(process.env.KEYCLOAK_REALM),
      })
    );
    return config;
  },
};
export default config;
