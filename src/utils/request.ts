import $axios from './http';
import URL_ADDRESS from '../constants/urlAddress';

export const unitUrl = (data = {}) => {
  return $axios.post(URL_ADDRESS['UNIT_URL'], data);
};
