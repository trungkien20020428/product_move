import ProductMoveModel from '../entities/product_move.entity';

export const ProductMoveProviders = [
  {
    provide: 'PRODUCT_MOVE_REPOSITORY',
    useValue: ProductMoveModel,
  },
];
