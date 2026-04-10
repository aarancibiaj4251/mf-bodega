import React, {useEffect, useState} from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import { useProduct } from '../../data/hooks/useProduct';
import {useSelector} from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './Directory.component.scss';
import {Col, Row} from 'antd';
import {useWindowsSizeHeight} from '../../data/hooks/useWindowsSizeHeight';
import ProductsFiltersComponent from '../products-filters/ProductsFiltersComponent';
import ProductsSegmentedComponent from '../products-segmented/ProductsSegmented.component';
import ProductsSearchComponent from '../products-search/ProductsSearch.component';
import {
  selectMaxAndMinPriceValue,
} from '../../redux/product/product.selector';
import {Helpers} from '../../utils/helpers';

const DirectoryComponent = () => {
  const {products, onHandleChange, loaded} = useProduct();
  const [productsInput, setProductsInput] = useState('');
  const {min: minPriceValue, max: maxPriceValue} = useSelector(selectMaxAndMinPriceValue);
  const [productsRangeMin, setProductsRangeMin] = useState<number>(minPriceValue);
  const [productsRangeMax, setProductsRangeMax] = useState<number>(maxPriceValue);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const cartItems = useSelector(selectCartItems);
  const {isMobile} = useWindowsSizeHeight();

  const handleFilterSearch = () => {
    setProductsFiltered(() => Helpers.filterProducts(products, {productsInput, productsRangeMin, productsRangeMax}));
  }

  useEffect(() => {
    handleFilterSearch();
  }, [productsInput, productsRangeMin, productsRangeMax]);

  useEffect(() => {
    setProductsFiltered(products);
  }, [loaded]);

  return (
    <Row>
      <Col xs={24}>
        <Row justify={'space-between'} style={{gap: '15px 0px'}}>
          <Col xs={24} md={6} lg={4}>
            {
              products.length ? (
                <ProductsFiltersComponent
                  setProductsRangeMin={setProductsRangeMin}
                  setProductsRangeMax={setProductsRangeMax}
                />
              ): <div>I am sorry, no loaded</div>
            }
          </Col>
          <Col xs={24} md={18} lg={20} style={{padding: '2px 0 0 15px'}}>
            <div className={isMobile ? 'flex-wrap justify-content-between': 'flex-nowrap justify-content-between'} style={{gap: '10px', marginBottom: '10px'}}>
              <ProductsSearchComponent
                setProductsInput={setProductsInput}
              />
              <div className={isMobile ? 'w-100 flex-nowrap justify-content-end': ''}>
                <ProductsSegmentedComponent />
              </div>
            </div>
            <Row justify={isMobile ? 'center' : 'space-between'}>
              {
                productsFiltered.map(product => {
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
