import React from 'react';
import {Avatar, Button, Tooltip, Popconfirm, Skeleton, notification} from 'antd';
import {
  LogoutOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {deleteUserKeycloak, removeUserSessions} from '../../data/rest/keycloak/users.service';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, setUserProfile} from '../../redux/user/userSlice';
import {showErrorNotification} from '../../utils/notifications';
import UserProfileStatisticComponent from '../user-profile-statistic/UserProfileStatistic.component';
import UserProfileInformationComponent from '../user-profile-information/UserProfileInformation.component';
import {selectUserLoader, selectUserProperties} from '../../redux/user/user.selector';
import UserIcon from "../../assets/img/user.jpg";
import {Helpers} from '../../utils/helpers';
import {User} from '../../domain/interfaces/user/User';

interface UserProfileProps {
  user: User;
}

const UserProfileComponent = ({user}: UserProfileProps) => {
  const dispatch = useDispatch();
  const loader = useSelector(selectUserLoader);
  const userProperties = useSelector(selectUserProperties);

  const onDeleteUser = async () => {
    try {
      await deleteUserKeycloak(user.id);
      dispatch(deleteUser(user.id));
      dispatch(setUserProfile(null))
      notification['success']({message: 'User was deleted!'});
    } catch (error) {
      showErrorNotification(error.response.status);
    }
  }

  const onRemoveSessions = async () => {
    try {
      await removeUserSessions(user.id);
    } catch (error) {
      showErrorNotification(error.response.status);
    }
  };

  return (
    <div className="userProfile flex-column gap-10">
      <div className="userProfile--header flex-nowrap justify-content-start align-items-center gap-15">
        <Avatar
          className="flex-1"
          size={{xs: 80, sm: 80, md: 100, lg: 100, xxl: 110}}
          src={UserIcon}
        />
        <div className="flex-wrap flex-3 gap-5">
          <div className="w-100 flex-no-wrap justify-content-end align-items-center gap-10">
            <Tooltip title="Change password" color="orange" key="change-password">
              <UserSwitchOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
            {
              !Helpers.isSuperAdmin(userProperties.roles) ? <Tooltip title="Delete user" color="orange" key="delete-user">
                <Popconfirm
                  placement="bottomLeft"
                  title="Are you sure to delete this user? This action can not be revoked"
                  onConfirm={onDeleteUser}
                  okText="Yes"
                  cancelText="No"
                >
                  <UserDeleteOutlined style={{fontSize: '24px'}} />
                </Popconfirm>
              </Tooltip> : null
            }
            <Tooltip placement="bottom" title="Logout all user's sessions" color="orange" key="logout">
              <LogoutOutlined style={{fontSize: '24px'}} onClick={onRemoveSessions}/>
            </Tooltip>
          </div>
          <Skeleton loading={loader} active title={false} paragraph={{rows: 2}}>
            <div className="flex-nowrap justify-content-between align-items-center gap-15 pt-10 pb-10">
                <UserProfileStatisticComponent user={userProperties} />
            </div>
          </Skeleton>
          <Button type="primary"
                  ghost
                  block
          >
            { user.emailVerified ? 'Send a email or message' : 'Send a email verification'}
          </Button>
        </div>
      </div>
      <div className="userProfile--information">
        <UserProfileInformationComponent user={user}/>
      </div>
    </div>
  );
};

export default UserProfileComponent;
