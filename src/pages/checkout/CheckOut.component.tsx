import './CheckOut.component.scss';
import {selectCartItems, selectTotalPrice} from '../../redux/cart/cart.selector';
import {useSelector} from 'react-redux';
import {CheckoutItem} from '../../components/checkout-item/checkout-item.component';
import {Col, message, Row} from 'antd';
import {selectCurrentUser} from '../../redux/user/user.selector';
import React, {useState} from 'react';
import ModalUpdateInformation from '../../components/user/modal-update-information/ModalUpdateInformation.component';
import ModalCheckOutPayment from '../../components/user/modal-checkout-payment/ModalCheckOutPayment.component';
import {createQr} from '../../data/rest/payment.service';
import {usePaypalPayment} from '../../data/hooks/usePaypalPayment';
import {useMutation} from '@tanstack/react-query';
import SubmitPaymentComponent from '../../components/submit-payment/SubmitPayment.component';
import {useNavigate} from 'react-router-dom';
import {CartItem} from '../../domain/interfaces/CartItem';
import {QRCode} from '../../domain/interfaces/QRCode';
import PayPayLogo from '../../assets/img/logo_paypay.svg';
import GooglePayButtonComponent from '../../components/google-pay-button/GooglePayButton.component';
import * as utilTypes from '../../utils/types';

const CheckOutPage = () => {
  const navigate = useNavigate();
  const {token} = usePaypalPayment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
  const {mutate} = useMutation<QRCode, Error, { cartItems: CartItem[], total: number }>({
    mutationFn: () => createQr(cartItems, total),
    onSuccess: qrCode => onClickPayment(qrCode)
  });
  const REACT_APP_GOOGLE_PAY_ENVIRONMENT = process.env.REACT_APP_GOOGLE_PAY_ENVIRONMENT as utilTypes.REACT_APP_GOOGLE_PAY_ENVIRONMENT;

  const onClickPayment = (qrCode: QRCode) => {
    if (qrCode) {
      const link = document.createElement('a');
      link.setAttribute('href', qrCode.data.url);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
    } else {
      message.error(`No se puede realizar el pago con PayPay, porfavor escoga otra metódo de pago`);
    }
  };

  const executePayment = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    mutate({cartItems, total});
  }

  return (
    <>
      <Row justify="center">
        <Col md={16} xs={20}>
        <div className="checkout-page">
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Descripción</span>
            </div>
            <div className="header-block">
              <span>Cantidad</span>
            </div>
            <div className="header-block">
              <span>Precio</span>
            </div>
            <div className="header-block">
              <span>Remover</span>
            </div>
          </div>
          {
            cartItems.map(cartItem => (
              <CheckoutItem
                key={cartItem.product.id}
                cartItem={cartItem}
              />
            ))
          }
          <div className="total">
            <span>TOTAL: {total} yen</span>
          </div>
          {
            total > 0 && (
              <div className="checkout-payment">
                <div className="flex-wrap">
                  {!!token ? <SubmitPaymentComponent
                    token={token} cartItems={cartItems}
                    total={total}></SubmitPaymentComponent> : null}
                  <div className="checkout-payment--button">
                    <button onClick={executePayment} className="checkout-payment--button-paypal">
                      <img src={PayPayLogo} alt="PayPay"/>
                    </button>
                    <GooglePayButtonComponent environment={REACT_APP_GOOGLE_PAY_ENVIRONMENT}/>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        </Col>
      </Row>
      <ModalUpdateInformation
        currentUser={currentUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ModalCheckOutPayment
        isModalPaymentOpen={isModalPaymentOpen}
        setIsModalPaymentOpen={setIsModalPaymentOpen}
        cartItems={cartItems}
        total={total}
        currentUser={currentUser}
      />
    </>
  );
};

export default CheckOutPage;
