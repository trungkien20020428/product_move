import ProductWanrrantyReasonModel from '../entities/product_warranty_reason.enity';

export const ProductWarrantyProviders = [
  {
    provide: 'PRODUCT_WARRANTY_REASON',
    useValue: ProductWanrrantyReasonModel,
  },
];
