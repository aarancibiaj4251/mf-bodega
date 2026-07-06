import React from 'react';
import {Statistic} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, SecurityScanOutlined} from '@ant-design/icons';
import {UserProperties} from '../../redux/user/user-state.interface';

interface Props {
  user: UserProperties;
}

const UserProfileStatisticComponent = ({user}: Props) => {
  const {sessions, roles, profile} = user;
  return (
    <>
      {
        roles
          .map(role => (<Statistic title="Role" value={role.name} valueStyle={{fontSize: '14px'}} prefix={<SecurityScanOutlined />} />))
      }
      <Statistic title="Status" valueStyle={{fontSize: '14px'}} value={profile.enabled ? "Active" : "Disabled"} prefix={profile.enabled ? <CheckCircleOutlined className="active" /> : <CloseCircleOutlined />} />
      <Statistic title="Current sessions" valueStyle={{fontSize: '14px'}} value={sessions?.length} prefix={<CheckCircleOutlined />} />
    </>
  );
};

export default UserProfileStatisticComponent;
