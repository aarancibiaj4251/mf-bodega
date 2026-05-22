import React from 'react';
import {Button} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {ButtonShape, ButtonType} from 'antd/lib/button/button';

interface ButtonProps {
  id: string;
  type: ButtonType;
  size: SizeType;
  onClick: () => void;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  className?: string;
}

const ButtonComponent = ({id, shape, className, type, size, icon, onClick}: ButtonProps) => {
  return (
    <Button
      id={id}
      className={className}
      type={type}
      shape={shape}
      size={size}
      icon={icon}
      onClick={onClick}
    >
    </Button>
  );
};

export default ButtonComponent;
