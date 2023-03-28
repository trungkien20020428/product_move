import ProductsModel from '../Models/product.model';
import ProductLineModel from '../Models/product_lines.model';
import ProductMoveModel from '../Models/product_move.model';
import ProductWarehousesModel from '../Models/./product_warehouse.model';
import ProductWarrantyReasonModel from '../Models/product_warranty_reason.model';

export const ProductProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: ProductsModel,
  },
  {
    provide: 'PRODUCT_LINES_REPOSITORY',
    useValue: ProductLineModel,
  },
  {
    provide: 'PRODUCT_MOVE_REPOSITORY',
    useValue: ProductMoveModel,
  },
  {
    provide: 'PRODUCT_WAREHOUSE',
    useValue: ProductWarehousesModel,
  },
  {
    provide: 'PRODUCT_WARRANTY_REASON',
    useValue: ProductWarrantyReasonModel,
  },
];
