import React from 'react';
import {Statistic} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, SecurityScanOutlined} from '@ant-design/icons';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {useSelector} from 'react-redux';
import {selectUserProperties} from '../../redux/user/user.selector';

interface Props {
  user: KeycloakUser;
}

const UserProfileStatisticComponent = ({user}: Props) => {
  const {sessions, roles} = useSelector(selectUserProperties);
  return (
    <>
      {
        roles
          .filter(role => role.name !== "default-roles-portfoliodev")
          .map(role => (<Statistic title="Role" value={role.name} valueStyle={{fontSize: '14px'}} prefix={<SecurityScanOutlined />} />))
      }
      <Statistic title="Status" valueStyle={{fontSize: '14px'}} value={user.enabled ? "Active" : "Disabled"} prefix={user.enabled ? <CheckCircleOutlined className="active" /> : <CloseCircleOutlined />} />
      <Statistic title="Current sessions" valueStyle={{fontSize: '14px'}} value={sessions?.length} prefix={<CheckCircleOutlined />} />
    </>
  );
};

export default UserProfileStatisticComponent;
