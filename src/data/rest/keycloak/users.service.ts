import {apiClient} from '../../../config/axios/axios.config';
import {Constants} from '../../../utils/constants';
import {KeycloakUser} from '../../../domain/interfaces/user/KeycloakUser';
import {KeycloakUserRequest} from '../interface/KeycloakUser.request';
import {KeycloakUserFormDto} from '../../dto/KeycloakUserForm.dto';

export const getUsersKeycloak = (): Promise<Array<KeycloakUser>> => {
  return new Promise(((resolve, reject) => {
    apiClient.get(`${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users`, {})
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const createUserKeycloak = (formDto: KeycloakUserFormDto): Promise<KeycloakUser> => {
  const request = {
    email: formDto.email,
    username: formDto.username,
    enabled: true,
    credentials: [
      {
        type: "password",
        value: formDto.password,
        temporary: false
      }
    ],
  } as KeycloakUserRequest;
  return new Promise(((resolve, reject) => {
    apiClient.post(`${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users`, request)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
