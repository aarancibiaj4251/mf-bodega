import React from 'react';
import {UpCircleOutlined} from '@ant-design/icons';
import ButtonComponent from '../button/Button.component';

const ScrollUpButtonComponent = () => {

  const handleScrollUpButton = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <ButtonComponent
      id="button-scrollUp"
      className="products_container--scrollUp"
      type="primary"
      shape="circle"
      size="large"
      icon={<UpCircleOutlined />}
      onClick={handleScrollUpButton}
    >{}</ButtonComponent>
  );
};

export default ScrollUpButtonComponent;
