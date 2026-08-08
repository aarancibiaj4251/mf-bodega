import type { Preview } from '@storybook/react-webpack5'
import { mswLoader } from 'msw-storybook-addon/csf3';

const preview: Preview = {
  loaders: [mswLoader()],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
