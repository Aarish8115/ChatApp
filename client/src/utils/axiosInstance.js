import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds to account for cold starts
  headers: { 
    "Content-Type": "application/json",
    // Adding explicit CORS headers that might help during development
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false, // Changed to false as it can cause issues with CORS
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(`Making ${config.method} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.code === 'ERR_NETWORK') {
      console.log("Network error - Check if the server is running and CORS is configured correctly");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
