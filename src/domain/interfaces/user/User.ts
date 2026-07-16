import {JwtPayload} from 'jwt-decode';

export interface User {
  id: string;
  username: string;
  givenName: string;
  lastName: string;
  surname: string;
  telephone: string;
  complete: boolean;
  profiles: Array<Profile>;
  email: string;
  tickets: any;
  hasRole: boolean;
  isGoogleAccount?: boolean;
}

export interface UserGoogle extends JwtPayload {
  email: string;
  email_verified: string;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
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

export interface UserRegister {
  username: string;
  password: string;
  password2: string;
}

