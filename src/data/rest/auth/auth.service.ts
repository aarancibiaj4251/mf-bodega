import axios from 'axios';
import { Constants } from '../../../utils/constants';
import {User} from '../../../domain/interfaces/user/User';
import {v4 as uuidV4} from 'uuid';

export const login = (username: string, password: string) => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'auth/login', {
      username,
      password
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const register = (user: Partial<User>) => {

  user.id = uuidV4();

  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'user/register', user)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
