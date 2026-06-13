import React from 'react';
import {List} from 'antd';
import {KeycloakUser} from '../../domain/interfaces/user/KeycloakUser';
import UsersListItemComponent from '../users-list-item/UsersListItem.component';

interface Props {
  users: KeycloakUser[]
}

const UsersListComponent = ({users}: Props) => {
  return (
    <div className="users-page--list pointer">
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={user => (<UsersListItemComponent user={user} key={user.id} />)}
      />
    </div>
  );
};

export default UsersListComponent;
