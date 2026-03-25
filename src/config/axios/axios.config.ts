import axios from 'axios';
import {Constants} from '../../utils/constants';

export const apiClient = axios.create({
  baseURL: Constants.URL_MS_1,
})

