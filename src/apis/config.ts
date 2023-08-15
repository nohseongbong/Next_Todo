import axios from "axios";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    return config;
  },
  (error) => {
    console.log("Request Api Error");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log("Response Api Error");
    return Promise.reject(error);
  }
);
