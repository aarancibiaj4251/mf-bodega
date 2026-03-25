import {CartItem} from '../../domain/interfaces/CartItem';
import {QRCode} from '../../domain/interfaces/QRCode';
import {createBodySale} from './create-body-sale.request';
import {User} from '../../domain/interfaces/user/User';
import {apiClient} from '../../config/axios/axios.config';

export const createQr = (orderItems: CartItem[], total: number): Promise<QRCode> => {
  return new Promise(((resolve, reject) => {
    apiClient.post(`payment/paypay/createQr`, {
      amount: {
        amount: total,
      },
      orderItems: orderItems.map((item: CartItem) => ({
        name: item.product.name,
        category: item.product.categoryId,
        unitPrice: {
          amount: item.product.unitPrice,
          currency: "JPY"
        },
        quantity: item.count,
        productId: item.product.id,
      }))
    })
      .then(((results) => results.data))
      .then(qrCode => resolve(qrCode))
      .catch(e => reject(e))
  }));
}

export const saveSaleWithGoogle = (cartItems: Array<CartItem>, total: number, user: User) => {
  return new Promise(((resolve, reject) => {
    apiClient.post(`payment/google`, createBodySale(cartItems, total, user))
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
