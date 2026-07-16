import {Constants} from '../../utils/constants';

import {Profile} from '../../domain/interfaces/user/User';
import {apiClient} from '../../config/axios/axios.config';

export const getGeneralProfiles = (): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    let url = `${Constants.URL_MS_1}role/accesos/general`;
    return apiClient.get(url)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const getProfiles = (role: string): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    let url = `${Constants.URL_MS_1}role/${role}/accesos`;
    let params = new URLSearchParams();
    return apiClient.get(url, {params})
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
