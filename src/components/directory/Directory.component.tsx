import React from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import { useProduct } from '../../data/hooks/useProduct';
import {useSelector} from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './Directory.component.scss';
import {Col, Row} from 'antd';
import {ProductOutlined} from '@ant-design/icons';
import {useWindowsSizeHeight} from '../../data/hooks/useWindowsSizeHeight';
import ProductsFilterComponent from '../products-filter/ProductsFilter.component';
import InputSearchComponent from '../input-search/InputSearch.component';
import ProductsSegmentedComponent from '../products-segmented/ProductsSegmented.component';

const DirectoryComponent = () => {
  const {products, onHandleChange} = useProduct();
  const cartItems = useSelector(selectCartItems);
  const {isMobile} = useWindowsSizeHeight();

  return (
    <Row>
      <Col xs={24}>
        <Row justify={'space-between'} style={{gap: '15px 0px'}}>
          <Col xs={24} md={6} lg={4}>
            <ProductsFilterComponent />
          </Col>
          <Col xs={24} md={18} lg={20} style={{padding: '2px 0 0 15px'}}>
            <div className="flex-nowrap justify-content-between" style={{gap: '10px', marginBottom: '10px'}}>
              <InputSearchComponent allowClear={true} prefix={<ProductOutlined />}/>
              <ProductsSegmentedComponent />
            </div>
            <Row justify={isMobile ? 'center' : 'space-between'}>
              {
                products.map(product => {
                  const value = cartItems.find(x => x.product.id === product.id)?.count || 0;
                  return (
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
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DirectoryComponent;
