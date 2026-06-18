import React, {useEffect} from 'react';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Input, Tooltip} from 'antd';
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

const UsersRegisterFormComponent = () => {
  const {profile} = useSelector(selectUserProperties);
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
        <Input placeholder="Password" prefix={<UserOutlined/>}
               type="text"
               onChange={userRegisterForm.handleChange}
               onBlur={userRegisterForm.handleBlur}
               value={userRegisterForm.values.password}
               name="password"
               status={userRegisterForm.errors.password && userRegisterForm.touched.password ? 'error': null}
               suffix={userRegisterForm.errors.password && userRegisterForm.touched.password &&
                   <Tooltip title={userRegisterForm.errors.password}>
                       <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                   </Tooltip>
               }
        />
        <Input placeholder="Confirm password" prefix={<UserOutlined/>}
               type="text"
               onChange={userRegisterForm.handleChange}
               onBlur={userRegisterForm.handleBlur}
               value={userRegisterForm.values.password_confirmation}
               name="password_confirmation"
               status={userRegisterForm.errors.password_confirmation && userRegisterForm.touched.password_confirmation ? 'error': null}
               suffix={userRegisterForm.errors.password_confirmation && userRegisterForm.touched.password_confirmation &&
                   <Tooltip title={userRegisterForm.errors.password_confirmation}>
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
          onClick={() => dispatch(setUserProfile(user))}
        >
          Cancel
        </ButtonComponent>
      </form>
    </>
  );
};

export default UsersRegisterFormComponent;
