import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  // auth: {
  //   username: '***',
  //   password: '***',
  // },
});

export default api;
