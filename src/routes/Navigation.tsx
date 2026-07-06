import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
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
import {Helpers} from '../utils/helpers';
import keycloak from '../config/auth/keycloak.config';

const Navigation = () => {
  const {pathname} = useLocation();
  const [current, setCurrent] = useState(pathname);
  let [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  useEffect(() => {
    if (user?.profiles) {
      setMenuItems(Helpers.buildMenuItems(user.profiles));
    }
  }, [user?.profiles]);

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
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '5px 0px' }}>
          <Outlet />
        </Content>
        <Footer id="footer" style={{ textAlign: 'center' }}>Copyright ©2025 Created by Arancibia Alexis</Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
