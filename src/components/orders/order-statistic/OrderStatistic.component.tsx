import React from 'react';
import {Icon, SubIcon} from '@vibe/core';
import {Card, Typography} from 'antd';

const { Title, Text } = Typography;

interface Props {
  title: string;
  icon: SubIcon;
  value: number | string;
  className: string;
}

const OrderStatisticComponent = ({icon, title, value, className}: Props) => {
  return (
    <Card size="small" className={className}>
      <div className="flex-column">
        <div className="flex-nowrap justify-content-start align-items-center">
          <Icon style={{fontSize: 26}} icon={icon}></Icon>
          <h4>{title}</h4>
        </div>
        <div className="flex-nowrap align-items-center align-self-center">
          <Text strong>
            <Title level={3}>{value}</Title>
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default OrderStatisticComponent;
