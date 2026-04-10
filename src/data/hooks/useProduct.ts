import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';
import { CartItem } from '../../domain/interfaces/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem, removeCartItem} from '../../redux/cart/cartSlice';
import {selectAllProducts} from '../../redux/product/product.selector';
import {setProducts} from '../../redux/product/productSlice';

export const useProduct = () => {
  const products = useSelector(selectAllProducts);
  const [loaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
      .then((products) => {
        dispatch(setProducts(products));
      })
      .catch()
      .finally(() => setLoaded(true));
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
    loaded
  }
}
