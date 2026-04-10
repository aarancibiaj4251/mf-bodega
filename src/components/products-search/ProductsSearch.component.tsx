import React, {useEffect, useState} from 'react';
import {ProductOutlined} from '@ant-design/icons';
import InputSearchComponent from '../input-search/InputSearch.component';

interface Props {
  setProductsInput: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsSearchComponent = ({setProductsInput}: Props) => {
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    setProductsInput(inputSearch);
  }, [inputSearch]);

  return (
    <InputSearchComponent
      setInputSearch={setInputSearch}
      allowClear={true}
      prefix={<ProductOutlined />}
    />
  );
};

export default ProductsSearchComponent;
