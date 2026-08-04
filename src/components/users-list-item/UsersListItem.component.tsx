import React from 'react';
import {Avatar, List, Typography} from 'antd';
import {setUserLoader, setUserProfile} from '../../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedUser} from '../../redux/user/user.selector';
const { Text } = Typography;
import './UsersListItem.component.scss';
import {User} from '../../domain/interfaces/user/User';

interface Props {
  user: User;
}

const UsersListItemComponent = ({user}: Props) => {
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();
  const handleClick = async (id: string) => {
    dispatch(setUserLoader(true));
    dispatch(setUserProfile({id}));
    dispatch(setUserLoader(false));
  }

  return (
    <List.Item
      className={selectedUser?.id === user.id ? "listItem-active": ""}
      onClick={() => handleClick(user.id)}>
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        title={user.username}
        description={user.firstName + ' ' + user.lastName}
      />
      <div>{user.email} {user.emailVerified ? <Text type="success"> Email verified</Text>: <Text type="danger">Email not verified</Text>}</div>
    </List.Item>
  );
};

export default UsersListItemComponent;
