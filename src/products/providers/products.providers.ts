import ProductsModel from '../entities/product.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: ProductsModel,
  },
];
