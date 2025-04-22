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
  id: string;
  description: string;
  icon: any;
  url: string;
}

export interface UserRegister {
  username: string;
  password: string;
  password2: string;
}

export interface UserRequest {
  id: string;
  username: string;
  password: string;
}
