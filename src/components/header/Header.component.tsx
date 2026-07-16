import {useDispatch, useSelector} from 'react-redux';
import {Button, Dropdown, Layout, MenuProps, Popover, Space} from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { selectCartItems, selectToggleCart } from '../../redux/cart/cart.selector';
import Logo from '../../assets/img/logo.png';
import './Header.component.styles.scss';
import {useNavigate} from 'react-router-dom';
import {selectCurrentUser} from "../../redux/user/user.selector";
import {User} from "../../domain/interfaces/user/User";
import {Helpers} from "../../utils/helpers";
import {GiftOutlined, HistoryOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons'
import {selectLottery} from '../../redux/lottery/lottery.selector';
import {clearCart, toggle} from '../../redux/cart/cartSlice';
import keycloak from '../../config/auth/keycloak.config';
import {logout} from '../../redux/user/userSlice';

const { Header } = Layout;

const content = (user: User, navigate: Function) => (
  <div>
    {
      user ? user.tickets.map((ticket: any) => (
        <div>Número de ticket: <strong>{ticket.code}</strong></div>
      )) : (
        <div>Inicia sesión para verificar tus tickets</div>
      )
    }
    <Button className="btn btn-default mt-20" block onClick={() => navigate('/sorteo')}>Ir al sorteo</Button>
  </div>
);

const HeaderComponent = () => {
  const cartItems = useSelector(selectCartItems);
  const toggleCart = useSelector(selectToggleCart);
  const user = useSelector(selectCurrentUser);
  const lottery = useSelector(selectLottery);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items: MenuProps['items'] = [
    {
      label: 'Orders',
      key: '1',
      icon: <HistoryOutlined />,
      onClick: () => {
        navigate('/portal/orders');
      }
    },
  ];

  if (keycloak.authenticated) {
    items.push({
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
      onClick: async () => {
        dispatch(logout());
        dispatch(clearCart());
        await keycloak.logout({redirectUri: process.env.KEYCLOAK_INIT_REDIRECT_URL})
      }
    })
  }

  return (
    <>
      <Header id="header" className="header flex-no-wrap justify-content-between align-items-center" >
        <img src={Logo} alt="LOGO" onClick={() => navigate('/')}/>
        <div className="header__info">
          { keycloak.authenticated && user ? Helpers.fullName(user) : '' }
          <Dropdown menu={{items}}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <UserOutlined style={{fontSize: '24px'}}/>
              </Space>
            </a>
          </Dropdown>
          {
            lottery && (
              <Popover placement="bottom" content={() => content(user, navigate)} title="Estos son tus tickets">
                <GiftOutlined style={{ fontSize: '32px', padding: '0 0 0 15px', color: '#08c' }}/>
              </Popover>
            )
          }
          <CartIconComponent onClickIcon={() => dispatch(toggle())} cartItems={cartItems} />
        </div>
      </Header>
      {
        toggleCart && <CartDropDown cartItems={cartItems} setToggleCart={() => dispatch(toggle())} />
      }
    </>
  );
};

export default HeaderComponent;
