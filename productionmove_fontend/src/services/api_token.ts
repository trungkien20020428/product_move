import axios from "axios";
import { BASE_URL } from "./config";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json',
    },
  });
  
  axiosClient.interceptors.request.use(async (config) => {
    const customHeaders = {Authorization:''};
  
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }
  
    return {
      ...config,
      headers: {
        ...customHeaders,  
        ...config.headers,
      }
    };
  });
  
  export default axiosClient;
  