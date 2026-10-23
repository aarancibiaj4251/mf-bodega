import {Product} from './Product';
import {User} from './user/User';
import {Shipment} from './Shipment';

export interface Order {
  id: string;
  code: string;
  salePrice: number;
  dateRegister: Date;
  saleDetail: Array<SaleDetail>
  user: User;
  shipments: Shipment[];
}

export interface SaleDetail {
  id: string;
  price: number;
  quantity: number;
  saleId: string;
  productId: string;
  product: Product;
}
