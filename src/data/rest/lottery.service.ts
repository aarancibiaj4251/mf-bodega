import axios from 'axios';
import {Constants} from '../../utils/constants';
import {Lottery} from '../../domain/interfaces/Lottery';

export const getActiveLottery = (): Promise<Lottery> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_1 + `sorteo/active`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const getWinner = (): Promise<string> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_1 + `sorteo/ticket/ganador`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
