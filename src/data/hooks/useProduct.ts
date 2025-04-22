import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';
import { Product } from '../../domain/interfaces/Product';
import { CartItem } from '../../domain/interfaces/CartItem';
import {useDispatch} from 'react-redux';
import {addCartItem, removeCartItem} from '../../redux/cart/cartSlice';

export const useProduct = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch();
  }, []);

  const onHandleChange = ({product: selectedProduct, count}: onChangeArgs) => {
    if (count === 0) {
      dispatch(removeCartItem(selectedProduct.id));
      return;
    }
    const product = products.find(x => x.id === selectedProduct.id);
    if (product) {
      count--;
      const cartItem = {
        product: {
          ...product,
        },
        count,
      } as CartItem;
      dispatch(addCartItem(cartItem));
    }
  }

  return {
    products,
    onHandleChange,
  }
}
