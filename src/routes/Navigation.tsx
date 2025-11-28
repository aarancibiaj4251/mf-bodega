import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';
import {LogoutOutlined} from '@ant-design/icons';
import {selectCurrentUser} from '../redux/user/user.selector';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/user/userSlice';
import {clearCart} from '../redux/cart/cartSlice';
import {useMutation} from '@tanstack/react-query';
import {Profile} from '../domain/model/Profile';
import {User} from '../domain/interfaces/user/User';
import {getProfiles} from '../data/rest/profiles.service';
import {Helpers} from '../utils/helpers';

const Navigation = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [current, setCurrent] = useState(pathname);
  const mutation = useMutation<Profile[], Error, {user: User}>({
    mutationFn: () => getProfiles(user),
    onSuccess: (profiles) => setMenuItems(Helpers.buildMenuItems(profiles)),
  });
  let [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  useEffect(() => {
    mutation.mutate({user});
  }, [user]);

  const onLogoutClick = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        className="sidebar"
      >
        <Menu
          theme="dark"
          onClick={onClick}
          mode="inline"
          selectedKeys={[current]}
          items={menuItems}
        />
        <div className="sidebar__logout">
          {
            user ? <Menu
                  style={{backgroundColor: '#04325f', color: 'white', width: '100%', 'borderRight': 'none'}}
                  mode="inline"
                  items={[{label: 'Logout', key: 'logout', dashed: true, icon: <LogoutOutlined />, onClick: onLogoutClick} as ItemType]}
              /> : null
          }
        </div>
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '5px 0px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2025 Created by Arancibia Alexis</Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
