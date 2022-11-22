import Product_line from '../entities/product_lines.entity';

export const ProductLinesProviders = [
  {
    provide: 'PRODUCT_LINES_REPOSITORY',
    useValue: Product_line,
  },
];
