import axios from "axios";

const axios = axios.create({
  baseURL: 'https://trial00.infy.uk/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default axios
