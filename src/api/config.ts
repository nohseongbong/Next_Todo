import axios from "axios";
import { renewToken } from "./auth/auth";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("jwtAccessKey");
    config.headers = config.headers ?? {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const config = error.config;
      const accessToken = localStorage.getItem("jwtAccessKey");
      const refreshToken = localStorage.getItem("jwtRefreshKey");
      if (refreshToken && accessToken && config) {
        try {
          const data = await renewToken({ accessToken, refreshToken });
          if (data?.accessToken) {
            localStorage.setItem("jwtAccessKey", data.accessToken);
          }
        } catch {}
      }
    }
    return Promise.reject(error);
  }
);
