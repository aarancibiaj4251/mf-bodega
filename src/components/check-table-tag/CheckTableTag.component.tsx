import React, {useState} from 'react';
import {Tag} from 'antd';
const { CheckableTag } = Tag;

const tagsData = ['Groceries', 'Electronics', 'Clothing and Accessories', 'Cleaning Supplies'];

const CheckTableTagComponent = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Books']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      {tagsData.map(tag => (
        <CheckableTag
          className="flex-nowrap justify-content-center align-items-center"
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};

export default CheckTableTagComponent;
