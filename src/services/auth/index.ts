import { AppConfig } from '@/config/app.config';
import { HttpUtils } from '@/http/request/index';
import type { User } from '@/models/user';
import { encrypt } from '@/utils/encrypt';

const prefix = '/auth';

const login = (params: { username: string; password: string }) => {
  return HttpUtils.postJson<{
    accessToken: 'string';
  }>(`${prefix}/login`, {
    username: params.username,
    password: encrypt(params.password),
  });
};

const logout = () => {
  localStorage.removeItem(AppConfig.LocalStorage.Token);
  return Promise.resolve();
};

const profile = () => {
  return HttpUtils.getJson<User>(`${prefix}/profile`);
};

export const AuthServices = {
  login,
  logout,
  profile,
};
