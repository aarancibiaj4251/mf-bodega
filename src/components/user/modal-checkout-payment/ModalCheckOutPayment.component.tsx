import React from 'react';
import {Form, Input, InputNumber, Modal} from "antd";
import {CreditCard} from "../../../domain/interfaces/CreditCard";
import {saveSale} from "../../../data/rest/sale.service";
import {CartItem} from "../../../domain/interfaces/CartItem";
import {useNavigate} from "react-router-dom";
import {Constants} from "../../../utils/constants";
import {User} from '../../../domain/interfaces/user/User';
import {userInformation} from '../../../data/rest/user.service';
import {fetchLoginSuccess} from '../../../redux/user/user.actions';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../../redux/cart/cartSlice';
import {hideLoader, showLoader} from '../../../redux/loader/loader.actions';

interface Props {
    isModalPaymentOpen: boolean;
    setIsModalPaymentOpen: (value: boolean) => void;
    cartItems: Array<CartItem>;
    total: number;
    currentUser: User;
}

const ModalCheckOutPayment = ({isModalPaymentOpen, setIsModalPaymentOpen, cartItems, total, currentUser}: Props) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values: CreditCard) => {
        try {
            dispatch(showLoader());
            const order = await saveSale(cartItems, total, currentUser);
            dispatch(clearCart());
            const user: User = await userInformation(currentUser.username);
            dispatch(fetchLoginSuccess(user));
            dispatch(hideLoader());
            navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.SUCCESS, order} });
        } catch (e) {
            dispatch(hideLoader());
            navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.ERROR} });
        } finally {
            form.resetFields();
        }
    }

    const handleOk = () => {
        form.submit();
        setIsModalPaymentOpen(false);
    };

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
        form.resetFields();
    };

    return (
        <Modal title="Completar pago" open={isModalPaymentOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                layout="horizontal"
                form={form} onFinish={onFinish}
            >
                <Form.Item label="Numero de tarjeta de crédito" name="creditCard">
                    <Input defaultValue="4557" maxLength={16} minLength={16}/>
                </Form.Item>
                <Form.Item  label="Códio de seguridad" name="securityCode">
                    <InputNumber maxLength={3} minLength={3} />
                </Form.Item>
                <Form.Item  label="Nombre del titular" name="names">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCheckOutPayment;
