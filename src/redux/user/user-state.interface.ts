import { User } from '../../domain/interfaces/user/User';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';

export interface UserState {
  currentUser: User;
  users: KeycloakUser[];
  userProfile: KeycloakUser;
}
