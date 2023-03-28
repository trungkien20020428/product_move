import { Product } from '../types';
import axiosClient from './api_token';

export type product = {
  id: string;
  productName: string;
  productLine: string;
};

export const getListProduct = () => {
  return new Promise(function (myResolve, mReject) {
    setTimeout(function () {
      myResolve({
        code: 401,
        success: true,
        message: 'Product',
        result: [
          {
            id: '1312',
            productName: 'vinfast',
            productLine: 'sedan',
          },
        ],
      });
    });
  });
};

export const addProduct = (
  amount: number,
  factoryId: number,
  name: string,
  distributionId: number,
  product_line_id: number,
) => {
  return axiosClient.post('products', {
    amount,
    factoryId,
    productName: name,
    distributionId,
    productLineId: product_line_id,
  });
};

export const removeProduct = (id: any) => {
  return axiosClient.delete(`products/${id}`);
};

export const getProductInformation = (productId: string) => {
  return axiosClient.get(`/product_warehouse/${productId}`);
};

export const saleProduct = (id: string, customerInfomation: any) => {
  return axiosClient.patch(`/ditribution/sell/${id}`, customerInfomation);
};

export const changeProductStatus = (status: number, id: string) => {
  return axiosClient.patch(
    `/product_warehouse/update_status/${id}/status/${status}`,
  );
};

export const changeProductStatuss = (status: number, ids: number[]) => {
  return axiosClient.patch(
    `/product_warehouse/update_status/listProduct/${status}`,
    { ids },
  );
};

export const changeAllProductStatusFollowProductLine = (
  status: number,
  product_line_id: number,
  moveId: number,
) => {
  return axiosClient.patch(`/product_warehouse/update_status/${status}`, {
    product_line_id,
    moveId,
  });
};

export const getAllProduct = () => {
  return axiosClient.get('/product_warehouse');
};
