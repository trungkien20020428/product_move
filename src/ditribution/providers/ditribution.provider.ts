import customerModel from '../Models/customer.model';
import orderModel from '../Models/order.model';

export const DistributionProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: customerModel,
  },
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: orderModel,
  },
];
