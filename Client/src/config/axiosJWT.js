import axios from 'axios';

// Axios instance untuk admin
const axiosJWTadmin = axios.create();

axiosJWTadmin.interceptors.request.use(async (config) => {
  try {
    const response = await axios.get("http://localhost:3000/account/token", {
      headers: {
        'role': "admin"
      },
    });
    config.headers.Authorization = `Bearer ${response.data.token}`;
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Axios instance untuk user (peserta_magang)
const axiosJWTuser = axios.create();

axiosJWTuser.interceptors.request.use(async (config) => {
  try {
    const response = await axios.get("http://localhost:3000/account/token", {
      headers: {
        'role': "peserta_magang"
      },
    });
    config.headers.Authorization = `Bearer ${response.data.token}`;
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export { axiosJWTadmin, axiosJWTuser };
