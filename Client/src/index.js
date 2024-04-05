import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';
import "./index.scss"



axios.defaults.withCredentials = true;
const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(async (config) => {
  try{
      const response = await axios.get("http://localhost:3000/account/token");
      config.headers.Authorization = `Bearer ${response.data.token}`
    return config;
  }catch (error) {
    return Promise.reject(error)
  }
})


const root = document.getElementById('root');

const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);