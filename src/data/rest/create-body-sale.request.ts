import {CartItem} from '../../domain/interfaces/CartItem';
import {User} from '../../domain/interfaces/user/User';
import {Sale, SaleDetail} from '../../domain/interfaces/Sale';
import {v4 as uuidV4} from 'uuid';

export const createBodySale = (cartItems: CartItem[], total: number, user: User) => {
  const saleDetail: Array<SaleDetail> = cartItems.map(x => ({
    id: uuidV4(),
    price: x.product.unitPrice,
    quantity: x.count,
    productId: x.product.id,
  }));
  return {
    id: uuidV4(),
    saleDetail,
    dateRegister: new Date().toISOString(),
    salePrice: total,
    code: String(new Date().getTime()),
    userId: user.id,
  } as Sale;
}
