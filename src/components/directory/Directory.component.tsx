import React, {useEffect, useState} from 'react';
import { useProduct } from '../../data/hooks/useProduct';
import {useDispatch, useSelector} from 'react-redux';
import './Directory.component.scss';
import {Col, Row} from 'antd';
import {useWindowsSizeHeight} from '../../data/hooks/useWindowsSizeHeight';
import ProductsFiltersComponent from '../products-filters/ProductsFiltersComponent';
import ProductsSegmentedComponent from '../products-segmented/ProductsSegmented.component';
import ProductsSearchComponent from '../products-search/ProductsSearch.component';
import {
  selectAllProducts,
  selectMaxAndMinPriceValue,
} from '../../redux/product/product.selector';
import {Helpers} from '../../utils/helpers';
import {useMutation} from '@tanstack/react-query';
import {getCategories} from '../../data/rest/product.service';
import {Category} from '../../domain/interfaces/Category';
import {setCategories} from '../../redux/category/categorySlice';
import ProductsListComponent from '../products/products-list/products-list.component';
import {useInfiniteScroll} from '../../data/hooks/useInfiniteScroll';
import {setIsFiltering} from '../../redux/product/productSlice';

const DirectoryComponent = () => {
  const {onHandleChange, setPage} = useProduct();
  const products = useSelector(selectAllProducts);
  const [productsInput, setProductsInput] = useState('');
  const {min: minPriceValue, max: maxPriceValue} = useSelector(selectMaxAndMinPriceValue);
  const [productsRangeMin, setProductsRangeMin] = useState<number>(minPriceValue);
  const [productsRangeMax, setProductsRangeMax] = useState<number>(maxPriceValue);
  const [productsCategories, setProductsCategories] = useState<string[]>([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const dispatch = useDispatch();
  const {isMobile} = useWindowsSizeHeight();
  const {mutate} = useMutation<Category[], Error, {}>({
    mutationFn: () => getCategories(),
    onSuccess: categories => dispatch(setCategories(categories)),
  });
  const {} = useInfiniteScroll('footer', () => setPage(prevState => prevState + 1));

  const handleFilterSearch = () => {
    setProductsFiltered(() => Helpers.filterProducts(products, {productsInput, productsRangeMin, productsRangeMax, productsCategories}));
  }

  useEffect(() => {
    handleFilterSearch();
    dispatch(setIsFiltering(!!productsInput || productsRangeMin > minPriceValue || productsRangeMax < maxPriceValue || !!productsCategories.length));
  }, [productsInput, productsRangeMin, productsRangeMax, productsCategories]);

  useEffect(() => {
    setProductsFiltered(products);
  }, [products]);

  useEffect(() => {
    mutate({});
  }, []);

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
                  setProductsCategories={setProductsCategories}
                />
              ) : (<div>Error in loading filters</div>)
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
              <ProductsListComponent onHandleChange={onHandleChange} products={productsFiltered}/>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DirectoryComponent;
