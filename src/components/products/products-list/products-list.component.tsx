import React from 'react';
import {ProductButtons, ProductCard, ProductImage, ProductTitle} from 'ajas-product-card';
import {Product} from '../../../domain/interfaces/Product';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../../../redux/cart/cart.selector';
import {onChangeArgs} from 'ajas-product-card/src/interfaces/interfaces';
import { motion } from "motion/react"

interface ProductListProps {
  products: Product[];
  onHandleChange: (args: onChangeArgs) => void;
}

const ProductsListComponent = ({products, onHandleChange}: ProductListProps) => {
  const cartItems = useSelector(selectCartItems);
  if (!products.length) {
    return (<div className="flex-nowrap justify-content-center align-items-center" style={{width: '100%', height: '100vh'}}>
        No information
    </div>);
  }

  return (
    <>
      {
        products.map(product => {
          const value = cartItems.find(x => x.product.id === product.id)?.count || 0;
          return (
            <motion.div initial={{scale: 0}} animate={{scale: 1}}>
              <ProductCard
                key={product.id}
                product={({
                  title: product.name,
                  img: product.image,
                  id: product.id
                })}
                onChange={onHandleChange}
                initialValues={{
                  maxCount: product.quantity
                }}
                value={value}
                style={{
                  height: '325px',
                  margin: '5px 0',
                }}
              >
                {({
                    reset,
                    increaseBy,
                    count,
                    isMaxCountReached,
                    product: modified,
                    maxCount,
                  }) => (
                  <>
                    <ProductImage img={product.image}></ProductImage>
                    <ProductTitle title={product.name}></ProductTitle>
                    <ProductButtons className="product_button"></ProductButtons>
                  </>
                )}
              </ProductCard>
            </motion.div>
          )
        })
      }
    </>
  );
};

export default ProductsListComponent;
