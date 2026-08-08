import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, fn } from 'storybook/test';
import UserProfileComponent from '../components/user-profile/UserProfile.component';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {User} from '../domain/interfaces/user/User';
import { http, HttpResponse, delay } from 'msw';
import {Constants} from '../utils/constants';
import {within} from '@testing-library/react';

const mockStore = configureStore({
  reducer: {
    user: (state = {
      loader: false,
    }) => state,
  },
});

const meta = {
  title: 'Administration/UserProfile',
  component: UserProfileComponent,
  decorators: [
    (Story) => <Provider store={mockStore} >
      <Story></Story>
    </Provider>
  ],
  argTypes: {
    id: { control: 'text' },
    username: { control: 'text' },
    firstName: { control: 'text' },
    lastName: { control: 'text' },
    email: { control: 'text' },
    emailVerified: { control: 'boolean' },
    enabled: { control: 'boolean' },
    roles: { control: 'select', options: ['ADMIN', 'SUPER_ADMIN', 'TEST', 'USER'] },
    sessions: { control: 'number', min: 0, max: 10 },
    user: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    id: '1',
    username: 'testing',
    firstName: 'test',
    lastName: 'testino',
    onDeleteUser: fn(),
    onRemoveSessions: fn(),
  },
  parameters: {
    msw: {
      handlers: [
        http.post(
          `${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users/1/logout`,
          () => {
            return HttpResponse.json({});
          }
        ),
        http.post(
          `${Constants.URL_MS_1}user/1/delete`,
          () => {
            return HttpResponse.json({});
          }
        ),
      ],
    },
    loader: true,
  },
} satisfies Meta<typeof UserProfileComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async({canvasElement, userEvent}) => {
    const canvas = within(canvasElement);
    const deleteUser = await canvas.findByTestId('DeleteUser');
    expect(deleteUser).toBeInTheDocument();
  },
  args: {
    email: 'test@gmail.com',
    emailVerified: true,
    enabled: true,
    sessions: [],
    roles: ['USER'],
  },
  render: (args: User) => (<UserProfileComponent user={args} />)
};

export const userWithAdminRole: Story = {
  play: async({canvasElement, userEvent}) => {
    const canvas = within(canvasElement);
    expect(
      canvas.queryByTestId('DeleteUser')
    ).toBeInTheDocument();
  },
  args: {
    email: 'test@gmail.com',
    emailVerified: true,
    enabled: true,
    sessions: [],
    roles: ['ADMIN'],
  },
  render: (args: User) => (<UserProfileComponent user={args} />)
};

export const userWithSuperAdminRole: Story = {
  play: async({canvasElement, userEvent}) => {
    const canvas = within(canvasElement);
    expect(
      canvas.queryByTestId('DeleteUser')
    ).not.toBeInTheDocument();
  },
  args: {
    email: 'test@gmail.com',
    emailVerified: true,
    enabled: true,
    sessions: [],
    roles: ['SUPER_ADMIN'],
  },
  render: (args: User) => (<UserProfileComponent user={args} />)
};

export const userWithEmailNotVerified: Story = {
  play: async({canvasElement, userEvent}) => {
    const canvas = within(canvasElement);
    const button = canvas.queryByTestId('ButtonVerifiedEmail');
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('Send a email verification');
  },
  args: {
    email: 'test@gmail.com',
    emailVerified: false,
    enabled: true,
    sessions: [],
    roles: ['USER'],
  },
  render: (args: User) => (<UserProfileComponent user={args} />)
};



