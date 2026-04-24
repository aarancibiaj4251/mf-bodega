import React from 'react';
import CollapseComponent from '../collapse/Collapse.component';
import {Card} from 'antd';

interface Props {
  setProductsRangeMin: React.Dispatch<React.SetStateAction<number>>;
  setProductsRangeMax: React.Dispatch<React.SetStateAction<number>>;
  setProductsCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductsFiltersComponent = ({setProductsRangeMin, setProductsRangeMax, setProductsCategories}: Props) => {
  return (
    <Card style={{borderRadius: '10px', position: 'relative'}} bodyStyle={{padding: '8px'}}>
      <div style={{paddingLeft: '15px'}}>Filters</div>
      <CollapseComponent
        setProductsRangeMin={setProductsRangeMin}
        setProductsRangeMax={setProductsRangeMax}
        setProductsCategories={setProductsCategories}
      />
    </Card>
  );
};

export default ProductsFiltersComponent;
