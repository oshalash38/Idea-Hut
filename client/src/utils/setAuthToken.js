import api, { apiFormData } from './api';

export default token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    apiFormData.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    delete apiFormData.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};
