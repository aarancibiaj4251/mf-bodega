import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Popconfirm} from 'antd';

interface Props {
  title: string;
}

const PopConfirm = ({title}: Props) => {

  const handleConfirm = () => {}

  return (
    <Popconfirm title={title}
                onConfirm={handleConfirm}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    ></Popconfirm>
  );
};

export default PopConfirm;
