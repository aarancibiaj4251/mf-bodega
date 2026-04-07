import React from 'react';
import {Input} from 'antd';

interface Props {
  allowClear: boolean;
  prefix: React.ReactNode;
}

const InputSearchComponent = ({allowClear, prefix}: Props) => {
  return (
    <Input.Group compact>
      <Input.Search allowClear={allowClear} prefix={prefix} defaultValue="" />
    </Input.Group>
  );
};

export default InputSearchComponent;
