import axios from 'axios';

import {BASE_URL} from './apiUrls';

// 로그인 하지 않은 상태에서 요청 시 사용(/user/login)
export const API_WITHOUT_AUTH = axios.create({
  baseURL: BASE_URL,
});

// 로그인 한 상태에서 요청 시 사용(/user/login 제외한 모든 api)
export const API_AUTH = axios.create({
  baseURL: BASE_URL,
});

// 로그인 한 상태에서 파일 전송 요청 시 사용(/user/profile PUT, /article POST)
export const API_AUTH_FILE = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 요청할 때마다 access_token을 넣어줌
API_AUTH.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token && token.length > 0) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

API_AUTH_FILE.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token && token.length > 0) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
