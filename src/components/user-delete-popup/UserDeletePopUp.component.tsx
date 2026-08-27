import React, {useContext} from 'react';
import {Popconfirm} from 'antd';
import {UserContext} from '../../data/contexts/useUser.context';

interface Props {
  userId: string;
  children: React.ReactNode;
}

const UserDeletePopUpComponent = ({children, userId}: Props) => {
  const {onDeleteUser} = useContext(UserContext);

  return (
    <Popconfirm
      placement="bottomLeft"
      title="Are you sure to delete this user? This action can not be revoked"
      onConfirm={() => onDeleteUser(userId)}
      okText="Yes"
      cancelText="No"
    >
      {
        children
      }
    </Popconfirm>
  );
};

export default UserDeletePopUpComponent;
