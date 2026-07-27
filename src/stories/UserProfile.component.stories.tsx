import type { Meta, StoryObj } from '@storybook/react-webpack5';

import UserProfileComponent from '../components/user-profile/UserProfile.component';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    user: (state = {
      currentUser: null,
      users: [],
      user: {
        profile: {
          id: '1',
          username: 'testing',
          firstName: 'test',
          lastName: 'testino',
          email: 'test@gmail.com',
          emailVerified: true,
          enabled: true,
        },
        sessions: [],
        roles: ['ADMIN'],
      },
      loader: false,
    }) => state,
  },
});

const meta = {
  title: 'Administration/UserProfile',
  component: UserProfileComponent,
  args: {
    user: {
      id: '1',
      username: 'testing',
      firstName: 'test',
      lastName: 'testino',
      email: 'test@gmail.com',
      emailVerified: true,
      enabled: true,
    }
  },
  decorators: [
    (Story, { args }) => <Provider store={mockStore} >
      <Story></Story>
    </Provider>
  ],
} satisfies Meta<typeof UserProfileComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
