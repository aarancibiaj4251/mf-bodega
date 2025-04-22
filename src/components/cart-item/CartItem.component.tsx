import React from 'react';
import './CartItem.component.styles.scss';
import Image from '../../assets/img/not-image.jpg';
import { CartItem } from '../../domain/interfaces/CartItem';

interface Props {
  cartItem: CartItem;
}

const CartItemComponent = ({ cartItem: { product, count } } : Props) => (
  <div className="cart-item">
    <img src={product.image ? product.image : Image} alt="item" />
    <div className="item-details">
      <span className="name">{product.name}</span>
      <span className="price">
        {count} x {product.unitPrice}
      </span>
    </div>
  </div>
);

export default CartItemComponent;
