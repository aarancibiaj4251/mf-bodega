import React from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import { useProduct } from '../../data/hooks/useProduct';
import {useSelector} from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './Directory.component.scss';
import {Col, Row} from 'antd';

const DirectoryComponent = () => {
  const {products, onHandleChange} = useProduct();
  const cartItems = useSelector(selectCartItems);
  return (
    <Row>
      {
        products.map(product => {
          const value = cartItems.find(x => x.product.id === product.id)?.count || 0;
          return (
            <Col className="flex-wrap justify-content-center" xs={24} sm={10} md={12} lg={10} xl={8} xxl={6} key={product.id}>
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
                  margin: '5px 20px',
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
            </Col>
          )
        })
      }
    </Row>
  );
};

export default DirectoryComponent;
