import React from 'react';
import CollapseComponent from '../collapse/Collapse.component';
import {Card} from 'antd';

const ProductsFilterComponent = () => {
  return (
    <Card style={{borderRadius: '10px', position: 'relative'}} bodyStyle={{padding: '8px'}}>
      <div style={{paddingLeft: '15px'}}>Filters</div>
      <CollapseComponent />
    </Card>
  );
};

export default ProductsFilterComponent;
