import ProductWarehousesModel from '../entities/product_warehouse.enity';

export const ProductWarehouseProviders = [
  {
    provide: 'PRODUCT_WAREHOUSE',
    useValue: ProductWarehousesModel,
  },
];
