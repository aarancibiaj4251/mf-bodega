import React from 'react';
import {Avatar, List, Typography} from 'antd';
import {setUserLoader, setUserProfile} from '../../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedUser} from '../../redux/user/user.selector';
const { Text } = Typography;
import './UsersListItem.component.scss';
import {User} from '../../domain/interfaces/user/User';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Helpers} from '../../utils/helpers';
import UserDeletePopUpComponent from '../user-delete-popup/UserDeletePopUp.component';

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
    <div className="position-relative listItem">
      <List.Item
        className={`${selectedUser?.id === user.id ? "listItem--active" : ""}`}
      >
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
          title={user.username}
          description={user.firstName + ' ' + user.lastName}
        />
        <div>{user.email} {user.emailVerified ? <Text type="success"> Email verified</Text> :
          <Text type="danger">Email not verified</Text>}</div>
      </List.Item>
      <div className="listItem--options">
        <div className="listItem--options-buttons">
          <EyeOutlined onClick={() => handleClick(user.id)}/>
          {
            !Helpers.isSuperAdmin(user.roles) || Helpers.verifyIsSameUser(user.id)?
              <UserDeletePopUpComponent userId={user.id}>
                <DeleteOutlined />
              </UserDeletePopUpComponent> : null
          }
        </div>
      </div>
    </div>
  );
};

export default UsersListItemComponent;
