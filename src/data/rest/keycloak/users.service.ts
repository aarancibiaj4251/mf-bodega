import {apiClient} from '../../../config/axios/axios.config';
import {Constants} from '../../../utils/constants';
import {KeycloakUser} from '../../../domain/interfaces/user/KeycloakUser';
import {KeycloakUserRequest} from '../interface/KeycloakUser.request';
import {KeycloakUserFormDto} from '../../dto/KeycloakUserForm.dto';

export const getUsersKeycloak = (): Promise<Array<KeycloakUser>> => {
  return new Promise(((resolve, reject) => {
    apiClient.get(`${Constants.URL_MS_1}user/keycloak`, {})
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

export const deleteUserKeycloak = (userId: string): Promise<void> => {
  return new Promise(((resolve, reject) => {
    apiClient.delete(`${Constants.URL_MS_1}user/${userId}/delete`)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const removeUserSessions = (userId: string): Promise<void> => {
  return new Promise(((resolve, reject) => {
    apiClient.post(`${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users/${userId}/logout`)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const getUserSessions = (userId: string): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    apiClient.get(`${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users/${userId}/sessions`)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const getUserRoles = (userId: string): Promise<{realmMappings: Array<any>}> => {
  return new Promise(((resolve, reject) => {
    apiClient.get(`${Constants.KEYCLOAK_URL}/admin/realms/${Constants.KEYCLOAK_REALM}/users/${userId}/role-mappings`)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
