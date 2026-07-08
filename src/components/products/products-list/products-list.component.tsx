import React from 'react';
import {ProductButtons, ProductCard, ProductImage, ProductTitle} from 'ajas-product-card';
import {Product} from '../../../domain/interfaces/Product';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../../../redux/cart/cart.selector';
import {onChangeArgs} from 'ajas-product-card/src/interfaces/interfaces';
import { motion } from "motion/react"
import {ShopOutlined} from '@ant-design/icons';
import {Alert} from 'antd';
import "./products-list.component.scss"

interface ProductListProps {
  products: Product[];
  onHandleChange: (args: onChangeArgs) => void;
}

const ProductsListComponent = ({products, onHandleChange}: ProductListProps) => {
  const cartItems = useSelector(selectCartItems);
  if (!products.length) {
    return (<Alert
      className="products-list--not-found"
      message="No products found"
      description="We are sorry.  The given criteria did not match any products."
      showIcon
      icon={<ShopOutlined />}
    />);
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
