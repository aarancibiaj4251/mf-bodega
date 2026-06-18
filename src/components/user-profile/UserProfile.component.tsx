import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, Typography, Tooltip, notification, Statistic, Popconfirm} from 'antd';
import {
  AntDesignOutlined, LoginOutlined,
  LogoutOutlined,
  SaveOutlined, SecurityScanOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {deleteUserKeycloak, removeUserSessions} from '../../data/rest/keycloak/users.service';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../../redux/user/userSlice';
import {selectUserProperties} from '../../redux/user/user.selector';
const { Text, Paragraph } = Typography;

interface UserProfileProps {
  user: KeycloakUser;
}

const UserProfileComponent = ({user}: UserProfileProps) => {
  const notAllowedEdit = ['id', 'username'];
  const [userFields, setUserFields] = useState<Array<[string, string]>>(() => Object.entries(user)
    .filter(([_, value]) => typeof value === 'string'));
  const [activeSave, setActiveSave] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {sessions, roles} = useSelector(selectUserProperties);
  const [userRole, setUserRole] = useState<Array<any>>([]);

  useEffect(() => {
    setUserFields((values) => Object.entries(user).filter(([_, value]) => typeof value === 'string'));
  }, [user]);

  useEffect(() => {
    setUserRole(() => roles.filter(role => role.name !== "default-roles-portfoliodev"));
  }, [roles]);

  const onSaveChanges = () => {
    console.log('onSaveChanges');
  }

  const onDeleteUser = async () => {
    try {
      await deleteUserKeycloak(user.id);
      dispatch(deleteUser(user.id));
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        notification.error({
          message: 'Error',
          description:
            'You account does not have authorization for delete a user. Please contact the administrator',
          placement: 'top',
        });
      }
    }
  }

  const onRemoveSessions = async () => {
    try {
      await removeUserSessions(user.id);
    } catch (error) {
      if (error.response.status === 403) {
        notification.error({
          message: 'Error',
          description:
            'You account does not have authorization for delete a user. Please contact the administrator',
          placement: 'top',
        });
      }
    }
  };

  return (
    <div className="userProfile flex-column gap-10">
      <div className="userProfile--header flex-nowrap justify-content-start align-items-center gap-15">
        <Avatar
          className="flex-1"
          size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
          icon={<AntDesignOutlined/>}
        />
        <div className="flex-wrap flex-3 gap-5">
          <div className="w-100 flex-no-wrap justify-content-end align-items-center gap-10">
            <Tooltip title="Change password" color="orange" key="change-password">
              <UserSwitchOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
            <Tooltip title="Delete user" color="orange" key="delete-user">
              <Popconfirm
                placement="bottomLeft"
                title="Are you sure to delete this user? This action can not be revoked"
                onConfirm={onDeleteUser}
                okText="Yes"
                cancelText="No"
              >
                <UserDeleteOutlined style={{fontSize: '24px'}} />
              </Popconfirm>
            </Tooltip>
            <Tooltip placement="bottom" title="Logout all user's sessions" color="orange" key="logout">
              <LogoutOutlined style={{fontSize: '24px'}} onClick={onRemoveSessions}/>
            </Tooltip>
          </div>
          <div className="flex-nowrap justify-content-between align-items-center gap-15 pt-10 pb-10">
            <Statistic title="Role" value={userRole[0]?.name ?? "USER"} valueStyle={{fontSize: '14px'}} prefix={<SecurityScanOutlined />} />
            <Statistic title="Sessions" valueStyle={{fontSize: '14px'}} value={sessions?.length} prefix={<LoginOutlined />} />
          </div>
          <Button type="primary"
                  ghost
                  block
                  disabled
          >
            Send a email or message
          </Button>
        </div>
      </div>
      <div className="userProfile--information">
        <List
          size="small"
          header={<div className="flex-nowrap justify-content-between align-items-center">
            <Text strong>User Information</Text>
            <Tooltip title="Save changes" color="orange" key="orange">
              <SaveOutlined style={{fontSize: '24px'}} onClick={activeSave && onSaveChanges}/>
            </Tooltip>
          </div>}
          dataSource={userFields}
          renderItem={([field, value], idx) => (
            <List.Item key={field} className="flex-nowrap align-items-center" style={{padding: '10px 0'}}>
              <div>{field.toLocaleUpperCase()}:</div>
              {
                notAllowedEdit.includes(field) ?
                  <Text>{value}</Text> :
                  <Paragraph style={{marginBottom: 0}} editable={{
                    autoSize: true,
                    onChange: (valueChanged) => {
                      const fieldIndex = userFields.findIndex(userField => userField[0] === field);
                      setUserFields(prevState => {
                        prevState[fieldIndex][1] = valueChanged;
                        if (value !== valueChanged) {
                          setActiveSave(true);
                        }
                        return [...prevState];
                      });
                      return valueChanged;
                    },
                  }}>{value}</Paragraph>
              }
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default UserProfileComponent;
