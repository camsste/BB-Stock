import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: (cpf, senha) => api.post('/auth/login', { cpf, senha }),
};

export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
};

export const sugestoesAPI = {
  getSugestoes: () => api.get('/sugestoes'),
};

export default api;