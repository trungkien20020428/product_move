import axiosClient from './api_token';

export const getListRequest = () => {
  return axiosClient.get('products/listRequest');
};

export const activeProduct = (listId: number[]) => {
  return axiosClient.patch('products/active', { listId });
};

export const getListMove = () => {
  return axiosClient.get('product_move/from');
};

export const getListTo = () => {
  return axiosClient.get('product_move/to');
};

export const moveProductTo = (
  listId: number[],
  listProductId: number[],
  //status: number,
) => {
  return axiosClient.patch('product_move/move', {
    listId,
    listProductId,
    //  productStatus: status,
  });
};

export const reciveProductFrom = (
  listId: number[],
  listProductId: number[],
  //status: number,
) => {
  return axiosClient.patch('product_move/accept', {
    listId,
    listProductId,
    //  productStatus: status,
  });
};

export const requestMove = (moveId: number, productId: number) => {
  return axiosClient.patch('/product_move/request', { productId, moveId });
};

export const getProductCode = (productCode: string) => {
  return axiosClient.get(`product_move/single_from/${productCode}`);
};
