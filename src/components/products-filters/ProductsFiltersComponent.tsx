import React from 'react';
import CollapseComponent from '../collapse/Collapse.component';
import {Card} from 'antd';
import "./ProductsFilters.styles.scss";

interface Props {
  setProductsRangeMin: React.Dispatch<React.SetStateAction<number>>;
  setProductsRangeMax: React.Dispatch<React.SetStateAction<number>>;
  setProductsCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductsFiltersComponent = ({setProductsRangeMin, setProductsRangeMax, setProductsCategories}: Props) => {
  return (
    <Card className="products-filters" bodyStyle={{padding: '8px'}}>
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
