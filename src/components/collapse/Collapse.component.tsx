import React from 'react';
import {Checkbox, Collapse, Slider} from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import {CheckboxValueType} from 'antd/es/checkbox/Group';
import "./Collapse.styles.css";
import RateComponent from '../rate/rate.component';

const { Panel } = Collapse;

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const options = [
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Clothing and Accessories', value: 'Clothing and Accessories' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Cleaning Supplies', value: 'Cleaning Supplies' },
];

const CollapseComponent = () => {
  return (
    <Collapse defaultActiveKey={['1', '2', '3']} ghost>
      <CollapsePanel header="Category" key="1">
        <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
      </CollapsePanel>
      <Panel header="Popularity" key="2">
        <RateComponent />
      </Panel>
      <Panel header="Price range" key="3">
        <Slider range defaultValue={[0, 100]} tooltip={{open: true}} />
      </Panel>
    </Collapse>
  );
};

export default CollapseComponent;
