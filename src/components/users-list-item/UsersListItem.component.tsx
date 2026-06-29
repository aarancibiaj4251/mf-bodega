import React from 'react';
import {Avatar, List, Typography} from 'antd';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import {setUserLoader, setUserProfile, setUserRoles, setUserSessions} from '../../redux/user/userSlice';
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
    dispatch(setUserLoader(true));
    const sessions = await getUserSessions(user.id);
    const {realmMappings} = await getUserRoles(user.id);
    dispatch(setUserSessions(sessions));
    dispatch(setUserRoles(realmMappings));
    dispatch(setUserLoader(false));
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
      <div>{user.email} {user.emailVerified ? <Text type="success"> Email verified</Text>: <Text type="danger">Email not verified</Text>}</div>
    </List.Item>
  );
};

export default UsersListItemComponent;
