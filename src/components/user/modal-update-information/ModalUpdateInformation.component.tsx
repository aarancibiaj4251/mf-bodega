import React from 'react';
import {Form, Input, message, Modal} from "antd";
import {User} from "../../../domain/interfaces/user/User";
import {updateUser, userInformation} from "../../../data/rest/user.service";
import {fetchLoginSuccess} from '../../../redux/user/user.actions';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../../redux/loader/loader.actions';

interface Props {
    currentUser: User;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const ModalUpdateInformation = ({currentUser, isModalOpen, setIsModalOpen}: Props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = async (user: Partial<User>) => {
        try {
            dispatch(showLoader());
            await updateUser(currentUser.id, user);
            const userInfo = await userInformation(currentUser.username);
            dispatch(fetchLoginSuccess(userInfo));
            dispatch(hideLoader());
            message.info(`Se guardaron los datos correctamente`);
        } catch (e) {
            dispatch(hideLoader());
            message.error(`Error al actualizar datos`);
        } finally {
            form.resetFields();
        }
    }

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <Modal title="Completar información" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                layout="horizontal"
                form={form} onFinish={onFinish}
            >
                <Form.Item label="Nombres" name="givenName">
                    <Input />
                </Form.Item>
                <Form.Item  label="Apellido paterno" name="lastName">
                    <Input />
                </Form.Item>
                <Form.Item  label="Apellido materno" name="surname">
                    <Input />
                </Form.Item>
                <Form.Item  label="Telefono" name="telephone">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateInformation
