export interface KeycloakUserRequest {
  email: string;
  username: string;
  credentials: Array<KeycloakUserCredentialsRequest>;
  enabled: boolean;
}

export interface KeycloakUserCredentialsRequest {
  type: string;
  value: string;
  temporary: boolean;
}
