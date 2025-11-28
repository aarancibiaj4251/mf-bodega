import React from 'react';
import CartItemComponent from '../cart-item/CartItem.component';
import './CartDropdown.component.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../domain/interfaces/CartItem';
import {AnyAction} from 'redux';


interface Props {
  cartItems: CartItem[];
  setToggleCart: () => AnyAction;
}

const CartDropDown = ({ cartItems, setToggleCart }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="cart-dropdown">
      <div style={{
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
      }}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItemComponent key={cartItem.product.id} cartItem={cartItem}></CartItemComponent>
          ))
        ) : (
          <span style={{color: 'black'}}>No hay items seleccionados</span>
        )}
      </div>
      <Button
        type="ghost"
        className="cart-button"
        onClick={() => {
          navigate('/carrito');
          setToggleCart();
        }}
      >Ir al carrito</Button>
    </div>
  );
}

export default CartDropDown;
