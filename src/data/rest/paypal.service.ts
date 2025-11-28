import axios from 'axios';
import {Constants} from '../../utils/constants';
import {IdentityPayPalToken, PayPalToken} from '../../domain/interfaces/PayPalToken';
import {CartItem} from '../../domain/interfaces/CartItem';
import {User} from '../../domain/interfaces/user/User';
import {createBodySale} from './create-body-sale.request';

export const createPaypalToken = (): Promise<PayPalToken> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_PAYPAL_V1 + '/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.REACT_APP_PAYPAL_CLIENT_ID!,
        password: process.env.REACT_APP_API_URL_PAYPAL_PASSWORD!,
      },
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const generateIdentityPaypalToken = (): Promise<IdentityPayPalToken> => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_PAYPAL_V1 + '/identity/generate-token', {}, {
      auth: {
        username: process.env.REACT_APP_PAYPAL_CLIENT_ID!,
        password: process.env.REACT_APP_API_URL_PAYPAL_PASSWORD!,
      },
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const createOrder = (cartItems: Array<CartItem>, total: number): Promise<any> => {
  const items = cartItems.map((cartItem) => ({
    name: cartItem.product.name,
    description: cartItem.product.name,
    quantity: cartItem.count,
    unit_amount: {
      currency_code: "JPY",
      value: cartItem.product.unitPrice,
    }
  }));
  const body = {
    "intent": "CAPTURE",
    purchase_units: [
      {
        items,
        amount: {
          currency_code: "JPY",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "JPY",
              value: total,
            }
          }
        }
      }
    ],
    application_context: {
      brand_name: 'arancibia@company.com',
      landing_page: "LOGIN"
    }
  };
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'sale/order', body)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const approveOrder = (orderId: string, cartItems: Array<CartItem>, total: number, user: User) => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + `sale/order/${orderId}/capture`, createBodySale(cartItems, total, user))
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

