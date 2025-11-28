import {FUNDING, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions} from '@paypal/react-paypal-js';
import React from 'react';
import {IdentityPayPalToken} from '../../domain/interfaces/PayPalToken';
import {approveOrder, createOrder} from '../../data/rest/paypal.service';
import {useNavigate} from 'react-router-dom';
import {Constants} from '../../utils/constants';
import {connect, useSelector} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {CartItem} from '../../domain/interfaces/CartItem';
import './SubmitPayment.component.scss';
import {ApprovedOrder} from '../../domain/interfaces/ApprovedOrder';
import {clearCart} from '../../redux/cart/cartSlice';


interface Props {
  token?: IdentityPayPalToken;
  clearCart: () => void;
  cartItems: Array<CartItem>;
  total: number;
}

const SubmitPaymentComponent = ({token, clearCart, cartItems, total}: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    dataClientToken: token ? token.client_token : null,
    components: "hosted-fields,buttons,funding-eligibility",
    enableFunding: [FUNDING.PAYPAL, FUNDING.CARD],
    currency: "JPY"
  } as ReactPayPalScriptOptions;

  const handleCreateOrder = async (): Promise<string> => {
    if (!currentUser) {
      navigate('/login');
      return Promise.reject();
    }
    try {
      const {id} =  await createOrder(cartItems, total);
      return id;
    } catch (e) {
      return '';
    }
  };

  const handleApprove = async ({orderID}: ApprovedOrder, actions: any): Promise<void> => {
    try {
      const order = await approveOrder(orderID, cartItems, total, currentUser);
      clearCart();
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.SUCCESS, order} });
    } catch (e) {
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.ERROR} });
    }
  };
  return <>
    <PayPalScriptProvider
      options={initialOptions}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
      />
    </PayPalScriptProvider>
  </>
}

const mapDispatchToProps = (dispatch: any) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(SubmitPaymentComponent);
