import React, {useState} from 'react';
import {List} from 'antd';
import UsersListItemComponent from '../users-list-item/UsersListItem.component';
import {User} from '../../domain/interfaces/user/User';

interface Props {
  users: User[]
}

const UsersListComponent = ({users}: Props) => {
  const [userRichProps, setUserRichProps] = useState<Array<User & {isOpen: boolean}>>(users.map(user => ({
    ...user,
    isOpen: false
  })));

  const onOpen = (userId: string) => {
    setUserRichProps(userRichProps.map(user => user.id !== userId ? {...user, isOpen: false } : {...user, isOpen: true }));
  }

  return (
    <div className="users-page--list pointer">
      <List
        itemLayout="horizontal"
        dataSource={userRichProps}
        renderItem={user => (
          <UsersListItemComponent
            user={user}
            onOpen={onOpen}
            key={user.id}
          />
        )}
      />
    </div>
  );
};

export default UsersListComponent;
