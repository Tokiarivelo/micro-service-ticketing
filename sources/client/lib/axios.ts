// lib/axios.ts
import axios from 'axios';

const api = axios.create({ baseURL: process.env.AUTH_URL });

// === Interceptor pour les requêtes ===
api.interceptors.request.use(
  (config) => {
    console.log('%c[Axios Request] :>>', 'color: blue; font-weight: bold;', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.error(
      '%c[Axios Request Error] :>>',
      'color: red; font-weight: bold;',
      {
        error,
        data: error?.data,
        errors: error?.data?.errors,
      }
    );
    return Promise.reject(error);
  }
);

// === Interceptor pour les réponses ===
api.interceptors.response.use(
  (response) => {
    console.log('%c[Axios Response] :>>', 'color: green; font-weight: bold;', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        '%c[Axios Response Error] :>>',
        'color: red; font-weight: bold;',
        {
          url: error.config?.url,
          status: error.response.status,
          data: error.response.data,
          dataErrors: error.response.data.errors,
        }
      );
    } else {
      console.error(
        '%c[Axios Error]',
        'color: red; font-weight: bold;',
        error.message
      );
    }
    return Promise.reject(error);
  }
);

export { api };
