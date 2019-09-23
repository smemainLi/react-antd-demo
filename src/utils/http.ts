import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { HTTP_ERROR, CONNECT_FAILED } from '../constants';

const $axios = axios.create({
  baseURL: '',
  timeout: 12000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    credentials: 'same-origin',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.data) {
    config.data = qs.stringify(config.data);
  }
  return config;
});

$axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data;
  },
  error => {
    console.log(error);
    if (error.response) {
      console.log(HTTP_ERROR[error.response.status] || `ERROR CODE: ${error.response.status}`);
    } else {
      console.log(CONNECT_FAILED);
    }
    return Promise.reject(error.response);
  }
);

export default $axios;
