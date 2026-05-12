import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';
import { CartItem } from '../../domain/interfaces/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem, removeCartItem} from '../../redux/cart/cartSlice';
import {selectAllProducts} from '../../redux/product/product.selector';
import {setIsLoading, setProducts} from '../../redux/product/productSlice';

export const useProduct = () => {
  const products = useSelector(selectAllProducts);
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    getProducts(page)
      .then((response: any) => {
        const productsDB = response.content;
        dispatch(setProducts({products: productsDB, isLastPage: response.last}));
      })
      .catch()
      .finally(() => dispatch(setIsLoading(false)));
  }, [page]);

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
    page,
    setPage,
  }
}
