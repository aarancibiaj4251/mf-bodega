import axios from 'axios';
import {Constants} from '../../utils/constants';
import {Profile} from '../../domain/model/Profile';
import {User} from '../../domain/interfaces/user/User';

export const getProfiles = (user: User): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_1 + `accesos`, {params: {usuarioId: user?.id}})
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
