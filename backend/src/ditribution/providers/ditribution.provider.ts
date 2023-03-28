import CustomerModel from '../Models/customer.model';
import OrderModel from '../Models/order.model';

export const DistributionProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: CustomerModel,
  },
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: OrderModel,
  },
];
