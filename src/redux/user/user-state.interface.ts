import { User } from '../../domain/interfaces/user/User';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';

export interface UserState {
  currentUser: User;
  users: KeycloakUser[];
  user: UserProperties;
}

export interface UserProperties {
  profile: KeycloakUser;
  sessions: UserSessions[];
  roles: UserRole[];
}

interface UserRole {
  id: string;
  name: string;
  description: string;
}

interface UserSessions {
  id: string;
  username: string;
  userId: string;
  ipAddress: string;
  start: number;
  lastAccess: number;
  rememberMe: boolean;
  transientUser: boolean;
}
