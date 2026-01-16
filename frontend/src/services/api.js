import axios from 'axios';

// Em produção com Docker, usa /api (proxy nginx)
// Em desenvolvimento, usa http://localhost:3000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000')
});

// Isso envia o token em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;