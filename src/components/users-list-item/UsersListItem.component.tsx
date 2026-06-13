import React from 'react';
import {Avatar, List, Typography} from 'antd';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {setUserProfile} from '../../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserProfile} from '../../redux/user/user.selector';
const { Text } = Typography;
import './UsersListItem.component.scss';

interface Props {
  user: KeycloakUser;
}

const UsersListItemComponent = ({user}: Props) => {
  const profile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const handleClick = (id: string) => {
    dispatch(setUserProfile({id}));
  }

  return (
    <List.Item
      className={profile?.id === user.id ? "listItem-active": ""}
      onClick={() => handleClick(user.id)}>
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        title={<a href="https://ant.design">{user.username}</a>}
        description={user.firstName + ' ' + user.lastName}
      />
      <div>{user.email} {user.enabled ? <Text type="success"> Active</Text>: <Text>Inactive</Text>}</div>
    </List.Item>
  );
};

export default UsersListItemComponent;
