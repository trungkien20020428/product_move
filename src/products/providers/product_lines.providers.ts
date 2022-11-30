import ProductLineModel from '../entities/product_lines.entity';

export const ProductLinesProviders = [
  {
    provide: 'PRODUCT_LINES_REPOSITORY',
    useValue: ProductLineModel,
  },
];
