import { CartItem } from '../../domain/interfaces/CartItem';
import NotFoundImage from '../../assets/img/not-image.jpg';
import "./checkout-item.styles.scss";
import {useDispatch} from 'react-redux';
import {addCartItem, removeCartItem, clearItem} from '../../redux/cart/cartSlice';

interface Props {
  cartItem: CartItem;
}

export const CheckoutItem = ({ cartItem }: Props) => {
  const { count, product: {name, image, unitPrice, quantity} } = cartItem;
  const dispatch = useDispatch();

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={image ? image : NotFoundImage} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => dispatch(clearItem(cartItem))}>
          &#10094;
        </div>
        <span className="value">{count}</span>
        {
          quantity > count && (
            <div className="arrow" onClick={() => dispatch(addCartItem(cartItem))}>
              &#10095;
            </div>
          )
        }
      </span>
      <span className="price">{unitPrice}</span>
      <div className="remove-button" onClick={() => dispatch(removeCartItem(cartItem.product.id))}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
