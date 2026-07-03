import React from 'react';
import './Loader.component.scss';
import Spinner from '../spinner/Spinner.component';

const LoaderComponent = () => {
  return (
    <div className="bodega-loader">
      <Spinner size={"large"}/>
    </div>
  );
};

export default LoaderComponent;
