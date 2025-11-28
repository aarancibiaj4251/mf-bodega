import {useDispatch, useSelector} from 'react-redux';
import {Button, Layout, Popover} from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { selectCartItems, selectToggleCart } from '../../redux/cart/cart.selector';
import Logo from '../../assets/img/logo.png';
import './Header.component.styles.scss';
import {Link, useNavigate} from 'react-router-dom';
import {selectCurrentUser} from "../../redux/user/user.selector";
import {User} from "../../domain/interfaces/user/User";
import {Helpers} from "../../utils/helpers";
import {GiftOutlined} from '@ant-design/icons'
import {selectLottery} from '../../redux/lottery/lottery.selector';
import {toggle} from '../../redux/cart/cartSlice';

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

  return (
    <>
      <Header className="header flex-no-wrap justify-content-between align-items-center" >
        <img src={Logo} alt="LOGO" onClick={() => navigate('/')}/>
        <div className="header__info">
          { user && (<Link to="/informacion" className="color-black">{Helpers.fullName(user)}</Link>)}
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
