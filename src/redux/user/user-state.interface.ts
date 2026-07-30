import { User } from '../../domain/interfaces/user/User';

export interface UserState {
  currentUser: User;
  users: User[];
  user: UserProperties;
  loader: boolean;
}

export interface UserProperties {
  profile: User;
  sessions: UserSessions[];
  roles: string[];
}

export interface UserSessions {
  id: string;
  username: string;
  userId: string;
  ipAddress: string;
  start: number;
  lastAccess: number;
  rememberMe: boolean;
  transientUser: boolean;
}
