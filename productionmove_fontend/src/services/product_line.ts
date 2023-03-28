import axiosClient from './api_token';

export const getListProductLine = () => {
  return axiosClient.get('product_line');
};

export const addProductLine = (name: string) => {
  return axiosClient.post('product_line', { name });
};
