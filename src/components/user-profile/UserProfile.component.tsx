import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, Typography, Tooltip} from 'antd';
import {AntDesignOutlined, SaveOutlined, UserDeleteOutlined, UserSwitchOutlined} from '@ant-design/icons';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
const { Text, Paragraph } = Typography;

interface UserProfileProps {
  user: KeycloakUser;
}

const UserProfileComponent = ({user}: UserProfileProps) => {
  const [userDescription, setUserDescription] = useState<string>(null);
  const [userFields, setUserFields] = useState<Array<[string, string]>>(() => Object.entries(user));

  useEffect(() => {
    setUserFields(() => Object.entries(user));
  }, [user]);

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
            <Tooltip title="Change password" color="orange" key="orange">
              <UserSwitchOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
            <Tooltip title="Delete user" color="orange" key="orange">
              <UserDeleteOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
            <Tooltip title="Save changes" color="orange" key="orange">
              <SaveOutlined style={{fontSize: '24px'}}/>
            </Tooltip>
          </div>
          <Text>{userDescription}</Text>
          <Button type="primary"
                  ghost
                  block
          >
            Send a email or message
          </Button>
        </div>
      </div>
      <div className="userProfile--information">
        <List
          size="small"
          header={<Text strong>User Information</Text>}
          dataSource={userFields}
          renderItem={([field, value], idx) => {
            if (typeof value === 'string') {
              return <List.Item key={idx} className="flex-nowrap align-items-center" style={{padding: '10px 0'}}>
                <div>{field.toLocaleUpperCase()}:</div> <Paragraph style={{marginBottom: 0}} editable={true}>{value}</Paragraph>
              </List.Item>;
            } else {
              return null;
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserProfileComponent;
