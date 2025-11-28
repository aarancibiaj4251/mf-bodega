import React, {useEffect, useState} from 'react';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './SignIn.component.scss';
import { fetchLoginSuccess } from '../../redux/user/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../domain/interfaces/user/User';
import {login, register} from '../../data/rest/auth/auth.service';
import { userInformation } from '../../data/rest/user.service';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import {Helpers} from '../../utils/helpers';
import {login as loginSlice} from '../../redux/user/userSlice';

const SignIn = () => {
  const signedUser  = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const onFinish = async ({username, password}: any) => {
    try {
      await login(username, password);
      const user: User = await userInformation(username);
      dispatch(fetchLoginSuccess(user))
      message.info(`Bienvenido a Bodega Store`);
      navigate('/carrito', {replace: true});
    } catch (e) {
      message.error(`Credenciales inválidas`);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onGoogleSignInSuccess = (credentials: CredentialResponse) => {
    const userDetails = Helpers.decodeJwt(credentials.credential);
    message.info(`Bienvenido ${userDetails.given_name} a Bodega Store`);
    userInformation(userDetails.email)
      .then(userInfo => {
        dispatch(loginSlice(userInfo));
      })
      .catch(async () => {
        const user = {
          email: userDetails.email,
          givenName: userDetails.given_name,
          lastName: userDetails.family_name,
          username: userDetails.email,
          isGoogleAccount: true,
        } as User;
        await register(user);
        dispatch(loginSlice(user))
      })
      .finally(() => navigate('/carrito', {replace: true}));
  }

  const onGoogleSignInError = () => {
    message.error(`Credenciales inválidas`);
  }

  useEffect(() => {
    if (signedUser) {
      navigate('/', {replace: true});
    }
  }, [])

  return (
    <div className="sign-in">
      <h2 className="text-center">Ya tengo una cuenta</h2>
      <span className="text-center" style={{padding: '10px'}}>Inicia sesión con tu usuario y contraseña</span>
      <Form
        {...layout}
        layout="horizontal"
        className="sign-in-form"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
        form={form} onFinish={onFinish}
      >
        <Form.Item wrapperCol={{offset: 1}} label="Usuario" name="username">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}} label="Contraseña" name="password">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Iniciar
          </Button>
        </Form.Item>
      </Form>
      <div className="sign-in-google">
        <GoogleLogin onSuccess={onGoogleSignInSuccess} onError={onGoogleSignInError} />
      </div>
    </div>
  );
};

export default SignIn;
