import React from 'react';
import {Segmented} from 'antd';
import {SegmentedLabeledOption} from 'antd/es/segmented';

interface Props {
  options: SegmentedLabeledOption[];
}

const SegmentedComponent = ({options}: Props) => {
  return (
    <Segmented
      options={options}/>
  );
};

export default SegmentedComponent;
