import React, {useEffect, useState} from 'react';
import {Checkbox, CheckboxOptionType, Collapse, Slider} from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import "./Collapse.styles.css";
import RateComponent from '../rate/rate.component';
import {useSelector} from 'react-redux';
import {
  selectMaxAndMinPriceValue,
} from '../../redux/product/product.selector';
import {selectCategories} from '../../redux/category/category.selector';

const { Panel } = Collapse;

interface Props {
  setProductsRangeMin: React.Dispatch<React.SetStateAction<number>>;
  setProductsRangeMax: React.Dispatch<React.SetStateAction<number>>;
  setProductsCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollapseComponent = ({setProductsRangeMin, setProductsRangeMax, setProductsCategories}: Props) => {

  const {min: minPriceValue, max: maxPriceValue} = useSelector(selectMaxAndMinPriceValue);
  const [min, setMin] = useState(minPriceValue);
  const [max, setMax] = useState(maxPriceValue)
  const allCategories = useSelector(selectCategories);
  const [categories, setCategories] = useState<CheckboxOptionType[]>(() => {
    return allCategories
      .map(category => ({label: category.name, value: category.id}));
  })

  const onChangeSlider = ([rangeMin, rangeMax]) => {
    setProductsRangeMin(rangeMin);
    setProductsRangeMax(rangeMax);
    setMin(rangeMin);
    setMax(rangeMax);
  }

  const onChange = (categories: string[]) => {
    setProductsCategories(categories);
  };

  useEffect(() => {
    setMin(minPriceValue);
    setMax(maxPriceValue);
  }, [minPriceValue, maxPriceValue]);

  return (
    <Collapse defaultActiveKey={['1', '2', '3']} ghost>
      <CollapsePanel header="Category" key="1">
        <Checkbox.Group options={categories} defaultValue={['Pear']} onChange={onChange} />
      </CollapsePanel>
      <Panel header="Popularity" key="2">
        <RateComponent />
      </Panel>
      <Panel header="Price range" key="3">
        <Slider
          range
          tooltip={{open: true}}
          defaultValue={[minPriceValue, maxPriceValue]}
          min={minPriceValue}
          max={maxPriceValue}
          onChange={onChangeSlider}
          value={[min, max]}
        />
      </Panel>
    </Collapse>
  );
};

export default CollapseComponent;
