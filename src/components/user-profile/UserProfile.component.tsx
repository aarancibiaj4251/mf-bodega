import React from 'react';
import {Avatar, Button, Tooltip, Skeleton} from 'antd';
import {
  LogoutOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {removeUserSessions} from '../../data/rest/keycloak/users.service';
import {useSelector} from 'react-redux';
import {showErrorNotification} from '../../utils/notifications';
import UserProfileStatisticComponent from '../user-profile-statistic/UserProfileStatistic.component';
import UserProfileInformationComponent from '../user-profile-information/UserProfileInformation.component';
import {selectUserLoader} from '../../redux/user/user.selector';
import UserIcon from "../../assets/img/user.jpg";
import {Helpers} from '../../utils/helpers';
import {User} from '../../domain/interfaces/user/User';
import UserDeletePopUpComponent from '../user-delete-popup/UserDeletePopUp.component';

interface UserProfileProps {
  user: User;
}

const UserProfileComponent = ({user}: UserProfileProps) => {
  const loader = useSelector(selectUserLoader);

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
          alt="User Profile"
        />
        <div className="flex-wrap flex-3 gap-5">
          <div className="w-100 flex-no-wrap justify-content-end align-items-center gap-10">
            <Tooltip title="Change password" color="orange" key="change-password">
              <UserSwitchOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
            {
              !Helpers.isSuperAdmin(user.roles) ?
                <UserDeletePopUpComponent userId={user.id}>
                  <UserDeleteOutlined data-testid="DeleteUser" style={{fontSize: '24px'}}/>
                </UserDeletePopUpComponent>: null
            }
            <Tooltip placement="bottom" title="Logout all user's sessions" color="orange" key="logout">
              <LogoutOutlined style={{fontSize: '24px'}} onClick={onRemoveSessions}/>
            </Tooltip>
          </div>
          <Skeleton loading={loader} active title={false} paragraph={{rows: 2}}>
            <div className="flex-nowrap justify-content-between align-items-center gap-15 pt-10 pb-10">
                <UserProfileStatisticComponent user={user} />
            </div>
          </Skeleton>
          <Button type="primary"
                  ghost
                  block
                  data-testid="ButtonVerifiedEmail"
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
