import React from 'react';
import GooglePayButton from '@google-pay/button-react';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartItems, selectTotalPrice} from '../../redux/cart/cart.selector';
import {CreateGooglePaymentRequest} from '../../utils/requests/create-google-payment.request';
import {Constants} from '../../utils/constants';
import {clearCart} from '../../redux/cart/cartSlice';
import {useNavigate} from 'react-router-dom';
import {saveSaleWithGoogle} from '../../data/rest/payment.service';
import {selectCurrentUser} from '../../redux/user/user.selector';

interface Props {
  environment: google.payments.api.Environment;
}

const GooglePayButtonComponent = ({environment}: Props) => {
  const total = useSelector(selectTotalPrice);
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledPayment = async (): Promise<void> => {
    try {
      const order = await saveSaleWithGoogle(cartItems, total, user);
      dispatch(clearCart());
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.SUCCESS, order} });
    } catch (e) {
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.ERROR} });
    }
  };

  const onClickPayment = async (ev: Event) => {
    if (!user) {
      ev.preventDefault();
      navigate('/login');
    }
  }

  return (
    <GooglePayButton
      environment={environment}
      paymentRequest={CreateGooglePaymentRequest(total) as google.payments.api.PaymentDataRequest}
      onLoadPaymentData={handledPayment}
      onClick={onClickPayment}
    />
  );
};

export default GooglePayButtonComponent;
