import Products from '../entities/product.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Products,
  },
];
