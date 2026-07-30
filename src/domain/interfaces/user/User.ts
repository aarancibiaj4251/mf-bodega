import {UserSessions} from '../../../redux/user/user-state.interface';

export interface User {
  id: string;
  username: string;
  givenName: string;
  firstName?: string;
  lastName: string;
  surname: string;
  telephone: string;
  complete: boolean;
  profiles: Array<Profile>;
  email: string;
  emailVerified?: boolean;
  tickets: any;
  hasRole: boolean;
  isGoogleAccount?: boolean;
  sessions: UserSessions[];
  roles: string[];
  enabled?: boolean;
}

export interface Profile {
  profile: ProfileProperties;
  children: Profile[];
}

export interface ProfileProperties {
  id: string;
  name: string;
  /**
   * @deprecated since version 7.3.1
   */
  description: string;
  icon: any;
  url: string;
}
