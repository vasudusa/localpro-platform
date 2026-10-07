import axios from 'axios'
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' }
});
// Attach JWT if present
client.interceptors.request.use((config)=>{
  const token = localStorage.getItem('lp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default client;
