import React, {useEffect, useState} from 'react';
import {Avatar, Drawer, List, Space, Steps} from 'antd';
import {Button} from '@vibe/core';
import {Edit, Print} from '@vibe/icons';
import {CloseCircleOutlined} from '@ant-design/icons';
import {Order} from '../../../domain/interfaces/Order';
import {Constants} from '../../../utils/constants';
import {Helpers} from '../../../utils/helpers';
import {Shipment} from '../../../domain/interfaces/Shipment';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  sale: Order;
}

const OrderDetailsComponent = ({ open, setOpen, sale }: Props) => {

  const {user, saleDetail, shipments} = sale;
  const shipment = shipments.length ? shipments[shipments.length - 1] : null;
  const [orderStyle, setOrderStyle] = useState<{color: string, background: string}>(Helpers.orderStatusColor(null));

  useEffect(() => {
    if (shipment) {
      let lastShipment = new Shipment(shipment);
      setOrderStyle(lastShipment.getColorAndBackground());
    }
  }, [sale.id]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      width={600}
      title={<div
        className="orders__current--details-title flex-nowrap justify-content-start align-items-center">
        <Button
          id="edit-order-button"
          size="small"
          aria-label="Edit order"
          leftIcon={Edit}
        >
          Edit
        </Button>
        <Button
          id="print-order-button"
          size="small"
          aria-label="Print order"
          leftIcon={Print}
        >
          Print order
        </Button>
      </div>}
      mask={false}
      maskClosable={true}
      placement="right"
      closable={false}
      open={open}
      extra={
        <Space>
          <CloseCircleOutlined onClick={onClose} style={{fontSize: 24, color: 'black'}}/>
        </Space>
      }
    >
      <h4
        className="orders__current--details-banner flex-nowrap justify-content-center align-items-center padding-5"
        style={orderStyle}
      >
        { shipment?.status || 'No status information. Please contact with the customer.'}
      </h4>

      <div className="flex-column gap-15 padding-10">
        <div className="orders__current--details-customer">
          <List
            itemLayout="horizontal"
            dataSource={[user]}
            renderItem={user => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joesch.moe/api/v1/random"/>}
                  title={<a href="https://ant.design">{`${user.givenName} ${user.lastName}`}</a>}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="orders__current--details-products">
          <h3>Order ({saleDetail.length} items)</h3>
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={saleDetail.map(({product}) => product)}
            renderItem={product => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={product.image}/>}
                  title={product.name}
                  description=""
                />
                <h4>{Helpers.setNumberFormat(product.unitPrice, {
                  style: 'currency',
                  currency: 'JPY',
                  currencyDisplay: 'symbol',
                })}</h4>
              </List.Item>
            )}
          />
        </div>
        <div className="orders__current--details-billing flex-nowrap justify-content-between align-items-center">
          <div className="flex-column">
            <h3>Address information</h3>
            <h4>Street</h4>
            <h4>State/City</h4>
            <h4>Country</h4>
          </div>
          <div className="flex-column">
            <h3>Payment details</h3>
            <h4>Visa/Mastercard</h4>
            <h4>Bank</h4>
            <h4>Number</h4>
          </div>
        </div>
        <div className="orders__current--timeline">
          <h3>Order status</h3>
          {
            shipment ? (
              <>
                <Steps
                  size="small"
                  progressDot
                  current={Constants.ORDER_STATUS[shipment.status].code}
                  items={
                    Object.entries(Constants.ORDER_STATUS).map(([status, {code}]) => ({
                      title: status,
                    }))
                  }
                />
              </>
            ) : <h4>No information</h4>
          }
        </div>
        <div className="orders__current--map">
          <h3>Locate on map</h3>
          <iframe
            className="w-100"
            height="250"
            style={{border: 0}}
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.google.com/maps/embed/v1/place?key=${Constants.MAPS_API_KEY}&q=Eiffel+Tower,Paris+France}`}
            allowFullScreen>
          </iframe>
        </div>
      </div>

    </Drawer>
  );
};

export default OrderDetailsComponent;
