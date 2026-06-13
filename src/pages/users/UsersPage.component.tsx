import React, {useLayoutEffect} from 'react';
import {Card, Tooltip} from 'antd';
import './UsersPage.component.scss';
import {useMutation} from '@tanstack/react-query';
import {getUsersKeycloak} from '../../data/rest/keycloak/users.service';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile, setUsers} from '../../redux/user/userSlice';
import {
  selectKeyCloakUsers,
  selectUserProfile,
} from '../../redux/user/user.selector';
import UsersListComponent from '../../components/users-list/UsersList.component';
import UsersRegisterFormComponent from '../../components/users-register-form/UsersRegisterForm.component';
import UserProfileComponent from '../../components/user-profile/UserProfile.component';
import {UserAddOutlined} from '@ant-design/icons';

const UsersPageComponent = () => {
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const users = useSelector(selectKeyCloakUsers);

  const {mutate} = useMutation({
    mutationFn: getUsersKeycloak,
    onSuccess: (users) => dispatch(setUsers(users)),
  });

  useLayoutEffect(() => {
    setTimeout(() => {
      mutate()
    }, 2000)
  }, [])

  return (
    <div className="users-page flex-nowrap justify-content-start">
      <div>
        <Card>
          <div className="users-page--header flex-nowrap justify-content-between align-items-center">
            <div className="users-page--header-description flex-column">
              <h2>Users</h2>
              <h3>All users need to be verified before you can send email and set a project.</h3>
            </div>
            <div className="users-page--header-lastModified">
              Last modification: 2:10 pm - 12.06.2014
            </div>
          </div>
          <div className="flex-nowrap justify-content-end align-items-center padding-10">
            <Tooltip title="Add user" color="orange" key="orange">
              <UserAddOutlined
                style={{fontSize: '26px'}}
                onClick={() => dispatch(setUserProfile(null))}/>
            </Tooltip>
          </div>
          <UsersListComponent users={users}></UsersListComponent>
        </Card>
      </div>
      <div>
        <Card>
          {
            userProfile ? (
              <UserProfileComponent user={userProfile}/>
            ) : <UsersRegisterFormComponent/>
          }
        </Card>
      </div>
    </div>
  );
};

export default UsersPageComponent;
