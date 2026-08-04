import React, {useState} from 'react';
import {List, Tooltip, Typography} from 'antd';
import {SaveOutlined} from '@ant-design/icons';
import UserProfileInformationFieldComponent
  from './user-profile-information-field/UserProfileInformationField.component';
import {User} from '../../domain/interfaces/user/User';
const { Text } = Typography;

interface Props {
  user: User;
}

const UserProfileInformationComponent = ({user}: Props) => {
  const [activeSave, setActiveSave] = useState<boolean>(false);
  const [userFields, setUserFields] = useState<Array<[string, string]>>(() => Object.entries(user)
    .filter(([_, value]) => typeof value === 'string'));

  const onSaveChanges = () => {
    console.log('onSaveChanges');
  }

  return (
    <List
      size="small"
      header={<div className="flex-nowrap justify-content-between align-items-center">
        <Text strong>User Information</Text>
        <Tooltip title="Save changes" color="orange" key="orange">
          <SaveOutlined disabled={!activeSave}
                        style={{fontSize: '24px'}}
                        className={!activeSave ? 'cursor-disabled' : ''}
                        onClick={activeSave && onSaveChanges}/>
        </Tooltip>
      </div>}
      dataSource={userFields}
      renderItem={
        (userInfo, idx) =>
          (<UserProfileInformationFieldComponent
            userInfo={userInfo}
            userFields={userFields}
            setUserFields={setUserFields}
            setActiveSave={setActiveSave}
          />)
      }
    />
  );
};

export default UserProfileInformationComponent;
