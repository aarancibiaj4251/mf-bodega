import {User} from '../../domain/interfaces/user/User';

export interface UserState {
  authUser: User;
  users: User[];
  selectedUser: User;
  loader: boolean;
}
