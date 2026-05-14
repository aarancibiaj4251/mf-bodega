import React from 'react';
import Spinner from '../spinner/Spinner.component';

const ProductLoaderComponent = () => {
  return (
    <div
      className="w-100 flex-nowrap justify-content-center align-items-center "
      style={{margin: '30px 0 0 0', gap: '10px'}}
    >
      <Spinner size="small"></Spinner>
      <h3>Loading more products, please wait...</h3>
    </div>
  );
};

export default ProductLoaderComponent;
