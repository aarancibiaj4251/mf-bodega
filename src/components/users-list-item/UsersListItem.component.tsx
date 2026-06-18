import React from 'react';
import {Avatar, List, Typography} from 'antd';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {setUserProfile, setUserRoles, setUserSessions} from '../../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserProperties} from '../../redux/user/user.selector';
const { Text } = Typography;
import './UsersListItem.component.scss';
import {getUserRoles, getUserSessions} from '../../data/rest/keycloak/users.service';

interface Props {
  user: KeycloakUser;
}

const UsersListItemComponent = ({user}: Props) => {
  const {profile} = useSelector(selectUserProperties);
  const dispatch = useDispatch();
  const handleClick = async (id: string) => {
    dispatch(setUserProfile({id}));
    const sessions = await getUserSessions(user.id);
    const {realmMappings} = await getUserRoles(user.id);
    dispatch(setUserSessions(sessions));
    dispatch(setUserRoles(realmMappings));
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
