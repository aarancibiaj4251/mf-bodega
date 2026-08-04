import React, {useEffect} from 'react';
import {Card, Tooltip} from 'antd';
import './UsersPage.component.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/user/userSlice';
import {
  selectKeyCloakUsers,
  selectSelectedUser,
} from '../../redux/user/user.selector';
import UsersListComponent from '../../components/users-list/UsersList.component';
import UsersRegisterFormComponent from '../../components/users-register-form/UsersRegisterForm.component';
import UserProfileComponent from '../../components/user-profile/UserProfile.component';
import {UserAddOutlined} from '@ant-design/icons';
import {useMutationGetUsers} from '../../data/hooks/mutations/useMutationGetUsers';

const UsersPageComponent = () => {
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();
  const users = useSelector(selectKeyCloakUsers);
  const {mutate} = useMutationGetUsers();

  useEffect(() => {
    mutate();
  }, [users.length]);

  return (
    <div className="users-page flex-wrap justify-content-start gap-10">
      <div style={{flex: 8}}>
        <Card>
          <div className="users-page--header flex-nowrap justify-content-between align-items-center">
            <div className="users-page--header-description flex-column">
              <h2>Users</h2>
              <h3>All users need to be verified before you can send email.</h3>
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
      <div style={{flex: 6}}>
        <Card>
          {
            selectedUser ? (
              <UserProfileComponent key={selectedUser.id} user={selectedUser}/>
            ) : <UsersRegisterFormComponent/>
          }
        </Card>
      </div>
    </div>
  );
};

export default UsersPageComponent;
