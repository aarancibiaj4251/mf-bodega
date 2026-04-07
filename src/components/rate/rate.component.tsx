import React, {useState} from 'react';
import {Rate} from 'antd';

const RateComponent = () => {

  const [rate, setRate] = useState(3.5);

  const onChangeRate = (value: number) => {
    setRate(prevState => value === 0 ? prevState : value);
  }

  return (
    <>
      <Rate
        allowHalf
        defaultValue={3.5}
        value={rate}
        style={{fontSize: '15px'}}
        onChange={onChangeRate}
      />
      <span className="ant-rate-text" style={{fontSize: '12px'}}>{rate} or more</span>
    </>
  );
};

export default RateComponent;
