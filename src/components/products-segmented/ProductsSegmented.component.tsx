import React from 'react';
import {AppstoreOutlined, BarsOutlined} from '@ant-design/icons';
import SegmentedComponent from '../segmented/Segmented.component';

const ProductsSegmentedComponent = () => {
  return (
    <SegmentedComponent options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined/>
      },
      {
        label: 'Details',
        value: 'Kanban',
        icon: <AppstoreOutlined/>
      },
    ]} />
  );
};

export default ProductsSegmentedComponent;
