import {Constants} from '../../utils/constants';

import {Profile, User} from '../../domain/interfaces/user/User';
import {apiClient} from '../../config/axios/axios.config';

export const getGeneralProfiles = (): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    let url = `${Constants.URL_MS_1}accesos/general`;
    return apiClient.get(url)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const getProfiles = (user: User): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    let url = `${Constants.URL_MS_1}accesos`;
    let params = new URLSearchParams();
    if (user?.id) {
      params.set('usuarioId', user.id);
    } else {
      url = url + '/general';
    }
    return apiClient.get(url, {params})
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
