import React, {useEffect} from 'react';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Input, Tooltip, notification} from 'antd';
import ButtonComponent from '../button/Button.component';
import './UsersRegisterForm.component.scss';
import {validationSchema} from '../../domain/formik-validations/userRegisterForm';
import {useFormik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {createUserKeycloak} from '../../data/rest/keycloak/users.service';
import {KeycloakUserFormDto} from '../../data/dto/KeycloakUserForm.dto';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/user/userSlice';
import {selectKeyCloakUsers, selectUserProperties} from '../../redux/user/user.selector';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {useMutationGetUsers} from '../../data/hooks/mutations/useMutationGetUsers';

const UsersRegisterFormComponent = () => {
  const {profile} = useSelector(selectUserProperties);
  const users = useSelector(selectKeyCloakUsers);
  const dispatch = useDispatch();
  const {mutate: mutateGetUsers} = useMutationGetUsers();
  const {mutate} = useMutation<KeycloakUser, Error, Partial<KeycloakUserFormDto>>({
    mutationFn: createUserKeycloak,
    onSuccess: async _ => {
      mutateGetUsers();
      userRegisterForm.resetForm();
      notification['success']({message: 'User was created!'});
    },
  });
  const userRegisterForm = useFormik<Partial<KeycloakUserFormDto>>({
    initialValues: {
      email: 'foobar@gmail.com',
      username: 'foobar',
      firstName: 'foobar',
      lastName: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => mutate(values),
  });
  useEffect(() => {
    userRegisterForm.resetForm({values: {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
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
          onBlur={userRegisterForm.handleBlur}
          value={userRegisterForm.values.email}
          name="email"
          status={userRegisterForm.errors.email && userRegisterForm.touched.email ? 'error': null}
          suffix={userRegisterForm.errors.email && userRegisterForm.touched.email &&
            <Tooltip title={userRegisterForm.errors.email}>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        <Input
          placeholder="Username" prefix={<UserOutlined/>}
          type="text"
          onChange={userRegisterForm.handleChange}
          onBlur={userRegisterForm.handleBlur}
          value={userRegisterForm.values.username}
          name="username"
          status={userRegisterForm.errors.username && userRegisterForm.touched.username ? 'error': null}
          suffix={userRegisterForm.errors.username && userRegisterForm.touched.username &&
              <Tooltip title={userRegisterForm.errors.username}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
          }
        />
        <Input
          placeholder="First name" prefix={<UserOutlined/>}
          type="text"
          onChange={userRegisterForm.handleChange}
          onBlur={userRegisterForm.handleBlur}
          value={userRegisterForm.values.firstName}
          name="firstName"
          status={userRegisterForm.errors.firstName && userRegisterForm.touched.firstName ? 'error': null}
          suffix={userRegisterForm.errors.firstName && userRegisterForm.touched.firstName &&
              <Tooltip title={userRegisterForm.errors.firstName}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
          }
        />
        <Input
          placeholder="Last name" prefix={<UserOutlined/>}
          type="text"
          onChange={userRegisterForm.handleChange}
          onBlur={userRegisterForm.handleBlur}
          value={userRegisterForm.values.lastName}
          name="lastName"
          status={userRegisterForm.errors.lastName && userRegisterForm.touched.lastName ? 'error': null}
          suffix={userRegisterForm.errors.lastName && userRegisterForm.touched.lastName &&
              <Tooltip title={userRegisterForm.errors.lastName}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
          }
        />
        <ButtonComponent
          id="users-register-button"
          type="primary"
          disabled={!userRegisterForm.isValid}
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
          onClick={() => dispatch(setUserProfile(users[0]))}
        >
          Cancel
        </ButtonComponent>
      </form>
    </>
  );
};

export default UsersRegisterFormComponent;
