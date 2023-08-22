import { axiosInstance } from "../config";

type LoginResType = {
  accessToken: string;
  refreshToken: string;
};

type LoginReqType = {
  email: string;
  password: string;
};
/**
 * 로그인 API
 * @param email 제목
 * @param password 내용
 */
export const login = async ({ email, password }: LoginReqType) => {
  const { data } = await axiosInstance.post<LoginResType>("/login", {
    email,
    password,
  });
  return data;
};

type RenewTokenResType = {
  accessToken: string;
};
type RenewTokenReqType = {
  accessToken: string;
  refreshToken: string;
};
/**
 * JWT 토큰 재발급 API
 * @param accessToken refresh 토큰
 * @param refreshToken refresh 토큰
 */
export const renewToken = async ({ accessToken, refreshToken }: RenewTokenReqType) => {
  const { data } = await axiosInstance.post<RenewTokenResType>("/renew", {
    accessToken,
    refreshToken,
  });
  return data;
};
