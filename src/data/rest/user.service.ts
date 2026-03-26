import { User } from '../../domain/interfaces/user/User';
import {apiClient} from '../../config/axios/axios.config';

export const userInformation = (username: string): Promise<User> => {
  return new Promise(((resolve, reject) => {
    apiClient.get(`user/${username}`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const updateUser = (id: string, user: Partial<User>): Promise<User> => {
  return new Promise(((resolve, reject) => {
    apiClient.put(`user/update/${id}`, {...user})
        .then(((results) => results.data))
        .then((value) => resolve(value))
        .catch(e => reject(e))
  }));
}

