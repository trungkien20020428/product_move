import { User } from '../types';
import axiosClient from './api_token';

export type user = {
  email: string;
  displayName: string;
  password: string;
  phone: string;
  roleId: number;
};

export const getListUser = () => {
  return axiosClient.get('/users');
};

export const addUser = (user: user) => {
  return axiosClient.post('users', user);
};

export const removeUser = (id: any) => {
  return axiosClient.delete(`users/${id}`);
};

export const patchUser = (id: number, user: user) => {
  return axiosClient.patch(`users/${id}`, user);
};
