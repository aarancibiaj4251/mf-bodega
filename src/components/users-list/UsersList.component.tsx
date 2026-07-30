import React from 'react';
import {List} from 'antd';
import UsersListItemComponent from '../users-list-item/UsersListItem.component';
import {User} from '../../domain/interfaces/user/User';

interface Props {
  users: User[]
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
