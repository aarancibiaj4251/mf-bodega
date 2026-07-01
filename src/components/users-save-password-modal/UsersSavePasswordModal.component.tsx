import React, {useState} from 'react';
import {Input, Modal, Tooltip} from 'antd';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {useFormik} from 'formik';
import {KeycloakUserFormDto} from '../../data/dto/KeycloakUserForm.dto';
import ButtonComponent from '../button/Button.component';
import * as yup from 'yup';

const UsersSavePasswordModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const passwordForm = useFormik<Partial<KeycloakUserFormDto>>({
    initialValues: {
      password: 'foobar@gmail.com',
      password_confirmation: 'foobar',
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
      password_confirmation: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });

  return (
    <Modal title="Basic Modal"
           open={isModalOpen}
           onOk={handleOk}
           onCancel={handleCancel}
    >
      <Input placeholder="Password" prefix={<UserOutlined/>}
             type="text"
             onChange={passwordForm.handleChange}
             onBlur={passwordForm.handleBlur}
             value={passwordForm.values.password}
             name="password"
             status={passwordForm.errors.password && passwordForm.touched.password ? 'error': null}
             suffix={passwordForm.errors.password && passwordForm.touched.password &&
                 <Tooltip title={passwordForm.errors.password}>
                     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                 </Tooltip>
             }
      />
      <Input placeholder="Confirm password" prefix={<UserOutlined/>}
             type="text"
             onChange={passwordForm.handleChange}
             onBlur={passwordForm.handleBlur}
             value={passwordForm.values.password_confirmation}
             name="password_confirmation"
             status={passwordForm.errors.password_confirmation && passwordForm.touched.password_confirmation ? 'error': null}
             suffix={passwordForm.errors.password_confirmation && passwordForm.touched.password_confirmation &&
                 <Tooltip title={passwordForm.errors.password_confirmation}>
                     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                 </Tooltip>
             }
      />
      <ButtonComponent
        id="users-register-button"
        type="primary"
        disabled={!passwordForm.isValid}
        onClick={passwordForm.handleSubmit}
        size="large"
        htmlType="submit"
      >
        Submit
      </ButtonComponent>
      <ButtonComponent
        id="users-register-button"
        type="ghost"
        size="large"
        htmlType="button"
        onClick={() => {

        }}
      >
        Cancel
      </ButtonComponent>
    </Modal>
  );
};

export default UsersSavePasswordModalComponent;
