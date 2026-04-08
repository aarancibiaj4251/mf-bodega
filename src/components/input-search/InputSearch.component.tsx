import React from 'react';
import {Input} from 'antd';

interface Props {
  allowClear: boolean;
  prefix: React.ReactNode;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearchComponent = ({allowClear, prefix, setInputSearch}: Props) => {

  const handleInputSearch = (event) => {
    setInputSearch(event.target.value);
  }

  return (
    <Input.Group compact>
      <Input.Search
        onKeyUp={handleInputSearch}
        allowClear={allowClear}
        prefix={prefix}
        defaultValue="" />
    </Input.Group>
  );
};

export default InputSearchComponent;
