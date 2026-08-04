import React from 'react';
import {Statistic} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, SecurityScanOutlined} from '@ant-design/icons';
import {User} from '../../domain/interfaces/user/User';

interface Props {
  user: User;
}

const UserProfileStatisticComponent = ({user}: Props) => {
  const {sessions, roles, enabled} = user;
  return (
    <>
      {
        roles.length > 0 ?
        roles
          .map(role => (<Statistic title="Role" value={role} valueStyle={{fontSize: '14px'}} prefix={<SecurityScanOutlined />} />)) :
          <Statistic title="Role" value="USER" valueStyle={{fontSize: '14px'}} prefix={<SecurityScanOutlined />} />
      }
      <Statistic title="Status" valueStyle={{fontSize: '14px'}} value={enabled ? "Active" : "Disabled"} prefix={enabled ? <CheckCircleOutlined className="active" /> : <CloseCircleOutlined />} />
      <Statistic title="Current sessions" valueStyle={{fontSize: '14px'}} value={sessions?.length} prefix={<CheckCircleOutlined />} />
    </>
  );
};

export default UserProfileStatisticComponent;
