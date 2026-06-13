import React, {useEffect} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import ButtonComponent from '../button/Button.component';
import './UsersRegisterForm.component.scss';
import {validationSchema} from '../../domain/formik-validations/userRegisterForm';
import {useFormik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {createUserKeycloak} from '../../data/rest/keycloak/users.service';
import {KeycloakUserFormDto} from '../../data/dto/KeycloakUserForm.dto';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/user/userSlice';
import {selectKeyCloakUsers, selectUserProfile} from '../../redux/user/user.selector';

const UsersRegisterFormComponent = () => {
  const profile = useSelector(selectUserProfile);
  const user = useSelector(selectKeyCloakUsers)[0];
  const dispatch = useDispatch();
  const {mutate} = useMutation({
    mutationFn: createUserKeycloak,
    onSuccess: (users) => userRegisterForm.resetForm(),
  });
  const userRegisterForm = useFormik<KeycloakUserFormDto>({
    initialValues: {
      email: 'foobar@gmail.com',
      username: 'foobar',
      password: 'foobar',
      password_confirmation: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  });
  useEffect(() => {
    userRegisterForm.resetForm({values: {
        email: profile?.email,
        username: profile?.username,
        password: 'foobar',
        password_confirmation: 'foobar',
      }});
  }, [profile]);
  return (
    <>
      <h3>Register a new user</h3>
      <form onSubmit={userRegisterForm.handleSubmit} className="flex-column users-register-form">
        <Input
          placeholder="Email" prefix={<UserOutlined/>}
          type="text"
          onChange={userRegisterForm.handleChange}
          value={userRegisterForm.values.email}
          name="email"
        />
        <Input
          placeholder="Username" prefix={<UserOutlined/>}
          type="text"
          onChange={userRegisterForm.handleChange}
          value={userRegisterForm.values.username}
          name="username"
        />
        <Input placeholder="Password" prefix={<UserOutlined/>}
               type="text"
               onChange={userRegisterForm.handleChange}
               value={userRegisterForm.values.password}
               name="password"
        />
        <Input placeholder="Confirm password" prefix={<UserOutlined/>}
               type="text"
               onChange={userRegisterForm.handleChange}
               value={userRegisterForm.values.password_confirmation}
               name="password_confirmation"
        />
        <ButtonComponent
          id="users-register-button"
          type="primary"
          onClick={userRegisterForm.handleSubmit}
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
          onClick={() => dispatch(setUserProfile(user))}
        >
          Cancel
        </ButtonComponent>
      </form>
    </>
  );
};

export default UsersRegisterFormComponent;
