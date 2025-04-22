import {useEffect, useState} from 'react';
import {createPaypalToken, generateIdentityPaypalToken} from '../rest/paypal.service';
import {IdentityPayPalToken, PayPalToken} from '../../domain/interfaces/PayPalToken';

export const usePaypalPayment = () => {
  const [paypalToken, setPaypalToken] = useState<PayPalToken>();
  const [token, setToken] = useState<IdentityPayPalToken>();

  useEffect(() => {
    createPaypalToken()
      .then((paypalToken) => setPaypalToken(paypalToken))
      .then(async () => {
        const identityToken = await generateIdentityPaypalToken();
        setToken(identityToken);
      })
      .catch();
  }, []);

  return {
    paypalToken,
    token,
  }
}
