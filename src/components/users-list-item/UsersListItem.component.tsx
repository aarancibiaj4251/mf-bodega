import React, {useEffect, useRef, useState} from 'react';
import {Avatar, List, Typography} from 'antd';
import {setUserLoader, setUserProfile} from '../../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedUser} from '../../redux/user/user.selector';
import './UsersListItem.component.scss';
import {User} from '../../domain/interfaces/user/User';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Helpers} from '../../utils/helpers';
import UserDeletePopUpComponent from '../user-delete-popup/UserDeletePopUp.component';
const { Text } = Typography;

interface Props {
  user: User & {
    isOpen?: boolean;
  };
  onOpen: (userId: string) => void;
}

const SWIPE_THRESHOLD = 80;
const OPTIONS_WIDTH = 55;

const UsersListItemComponent = ({ user, onOpen }: Props) => {
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();
  const listContainer = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(user.isOpen ? -OPTIONS_WIDTH : 0);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  const handleClick = async (id: string) => {
    dispatch(setUserLoader(true));
    dispatch(setUserProfile({ id }));
    dispatch(setUserLoader(false));
  };

  useEffect(() => {
    setDragX(user.isOpen ? -OPTIONS_WIDTH : 0);
  }, [user.isOpen]);

  useEffect(() => {
    const el = listContainer.current;
    if (!el) return;

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest('.listItem--options');

    const handlePointerDown = (event: PointerEvent) => {
      if (isInteractiveTarget(event.target)) {
        return;
      }
      startXRef.current = event.clientX;
      draggingRef.current = true;
      el.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const delta = event.clientX - startXRef.current;
      const base = user.isOpen ? -OPTIONS_WIDTH : 0;
      const next = Math.min(0, Math.max(-OPTIONS_WIDTH, base + delta));
      setDragX(next);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      const distance = event.clientX - startXRef.current;

      let shouldOpen = user.isOpen;
      if (user.isOpen && distance > SWIPE_THRESHOLD) {
        shouldOpen = false;
      } else if (!user.isOpen && distance < -SWIPE_THRESHOLD) {
        shouldOpen = true;
      }

      if (shouldOpen !== user.isOpen) {
        onOpen(shouldOpen ? user.id : null);
      }
      setDragX(shouldOpen ? -OPTIONS_WIDTH : 0);
    };

    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('pointercancel', handlePointerUp);

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [user.isOpen, user.id, onOpen]);

  return (
    <div className="position-relative listItem" ref={listContainer} id={`list-container${user.id}`}>
      <div className="listItem--content" style={{ transform: `translateX(${dragX}px)` }}>
        <List.Item className={selectedUser?.id === user.id ? "listItem--active" : ""}>
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={user.username}
            description={user.firstName + ' ' + user.lastName}
          />
          <div>
            {user.email}{' '}
            {user.emailVerified ? (
              <Text type="success">Email verified</Text>
            ) : (
              <Text type="danger">Email not verified</Text>
            )}
          </div>
        </List.Item>
      </div>
      <div className={`listItem--options ${user.isOpen ? 'listItem--options-open' : ''}`}>
        <div className="listItem--options-buttons">
          <EyeOutlined onClick={() => handleClick(user.id)} />
          {!Helpers.isSuperAdmin(user.roles) || Helpers.verifyIsSameUser(user.id) ? (
            <UserDeletePopUpComponent userId={user.id}>
              <DeleteOutlined />
            </UserDeletePopUpComponent>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UsersListItemComponent;
