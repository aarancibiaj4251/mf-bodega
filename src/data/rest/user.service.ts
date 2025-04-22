import axios from 'axios';
import { Constants } from '../../utils/constants';
import { User } from '../../domain/interfaces/user/User';

export const userInformation = (username: string): Promise<User> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_1 + `user/${username}`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const updateUser = (id: string, user: Partial<User>): Promise<User> => {
  return new Promise(((resolve, reject) => {
    axios.put(Constants.URL_MS_1 + `user/update/${id}`, {...user})
        .then(((results) => results.data))
        .then((value) => resolve(value))
        .catch(e => reject(e))
  }));
}

