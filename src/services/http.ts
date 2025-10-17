import axios from "axios";

// --- Setup axios instance ---
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Request interceptor ---
AxiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Signature"] = import.meta.env.VITE_SIGNATURE_NAME;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor (optional logging) ---
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("HTTP Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- Helper functions ---
const http = {
  get: async (url: string, config = {}) => {
    const res = await AxiosInstance.get(url, config);
    return res.data;
  },

  post: async (url: string, data = {}, config = {}) => {
    const res = await AxiosInstance.post(url, data, config);
    return res.data;
  },

  put: async (url: string, data = {}, config = {}) => {
    const res = await AxiosInstance.put(url, data, config);
    return res.data;
  },

  delete: async (url: string, config = {}) => {
    const res = await AxiosInstance.delete(url, config);
    return res.data;
  },
};

export default http;
