import React from 'react';
import {Button} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {ButtonHTMLType, ButtonShape, ButtonType} from 'antd/lib/button/button';

interface ButtonProps {
  id: string;
  type: ButtonType;
  size: SizeType;
  onClick: () => void;
  children: React.ReactNode;
  htmlType?: ButtonHTMLType;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  className?: string;
}

const ButtonComponent = ({id, shape, className, type, size, children, htmlType, icon, onClick}: ButtonProps) => {
  return (
    <Button
      id={id}
      className={className}
      type={type}
      shape={shape}
      size={size}
      icon={icon}
      onClick={onClick}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
