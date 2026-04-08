import React, {useEffect, useState} from 'react';
import {ProductOutlined} from '@ant-design/icons';
import InputSearchComponent from '../input-search/InputSearch.component';
import {Product} from '../../domain/interfaces/Product';

interface Props {
  products: Product[];
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsSearchComponent = ({products, setProductsFiltered}: Props) => {
  const [inputSearch, setInputSearch] = useState('');

  const handleInputSearch = () => {
    setProductsFiltered(() =>
      products
        .filter(product => {
          return product.name.toLowerCase().includes(inputSearch.toLowerCase());
        })
    );
  }

  useEffect(() => {
    if (inputSearch.length === 0) {
      setProductsFiltered(products);
      return;
    }
    handleInputSearch();
  }, [inputSearch.length])

  return (
    <InputSearchComponent
      setInputSearch={setInputSearch}
      allowClear={true}
      prefix={<ProductOutlined />}
    />
  );
};

export default ProductsSearchComponent;
