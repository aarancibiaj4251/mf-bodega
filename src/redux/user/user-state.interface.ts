import { User } from '../../domain/interfaces/user/User';
import {Profile} from '../../domain/model/Profile';

export interface UserState {
  currentUser: User;
  profiles: Profile[];
}
