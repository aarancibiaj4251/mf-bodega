import {useEffect, useState} from 'react';
import {createPaypalToken, generateIdentityPaypalToken} from '../rest/paypal.service';
import {IdentityPayPalToken, PayPalToken} from '../../domain/interfaces/PayPalToken';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selector';

export const usePaypalPayment = () => {
  const [paypalToken, setPaypalToken] = useState<PayPalToken>();
  const [token, setToken] = useState<IdentityPayPalToken>();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (cartItems.length) {
      createPaypalToken()
        .then((paypalToken) => setPaypalToken(paypalToken))
        .then(async () => {
          const identityToken = await generateIdentityPaypalToken();
          setToken(identityToken);
        })
        .catch();
    }
  }, []);

  return {
    paypalToken,
    token,
  }
}
