import React from 'react';
import {Button} from '@vibe/core';
import {Delete, Edit, Show} from '@vibe/icons';
import {Shipment} from '../../../domain/interfaces/Shipment';

interface Props {
  order: {shipments: Shipment[]};
  showDrawer: (order) => void;
}

const OrderDetailsActionsComponent = ({order, showDrawer}: Props) => {
  const {shipments} = order;
  const lastShipment = shipments[shipments.length - 1] ? new Shipment(shipments[shipments.length - 1]) : null;

  const handleClick = () => {
    showDrawer(order);
  }

  return (
    <div className="flex-nowrap gap-10" style={{fontSize: '14px'}}>
      <Button
        id="print-order-button"
        size="large"
        aria-label="Print order"
        leftIcon={Show}
        style={{color: '#84ac79'}}
        onClick={handleClick}
      >
        Preview
      </Button>
      {
        !!lastShipment ? (
          <>
            <Button
              id="print-order-button"
              size="large"
              aria-label="Print order"
              leftIcon={Edit}
              style={{color: '#0049e8'}}
              disabled={lastShipment.orderFinished()}
            >
              {null}
            </Button>
            <Button
              id="print-order-button"
              size="large"
              aria-label="Print order"
              leftIcon={Delete}
              style={{color: '#c80036'}}
              disabled={lastShipment.orderFinished()}
            >
              {null}
            </Button>
          </>
        ) : null
      }
    </div>
  );
};

export default OrderDetailsActionsComponent;
