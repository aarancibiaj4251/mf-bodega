import React, {useEffect, useRef, useState} from 'react';
import {Order} from '../../../domain/interfaces/Order';
import {Shipment} from '../../../domain/interfaces/Shipment';
import {Helpers} from '../../../utils/helpers';
import {Constants} from '../../../utils/constants';
import ButtonComponent from '../../button/Button.component';
import {useMutation} from '@tanstack/react-query';
import {updateOrderStatus} from '../../../data/rest/shipment.service';

interface Props {
  order: Order;
}

const OrderItemComponent = ({order}: Props) => {
  const shipments = Array.from(order.shipments)
    .map(shipment => new Shipment(shipment));
  const [shipment, setShipment] = useState(shipments[shipments.length - 1]);
  const {user, salePrice} = order;
  const salePriceFormat = Helpers.setNumberFormat(salePrice, Constants.CURRENCY_FORMAT.JAPANESE);
  const updateStatusRef = useRef(generateNextStatus());

  const {mutate} = useMutation<Shipment, Error, { id: string, status: string, trackingNumber: string }>({
    mutationFn: async ({id, status, trackingNumber}) => await updateOrderStatus(id, status, trackingNumber),
    onSuccess: newShipmentStatus => {
      const shipment = new Shipment(newShipmentStatus);
      shipments.push(shipment);
      setShipment(shipment);
    }
  });

  const updateOrder = (id: string, status: string, trackingNumber: string) => {
    if (!updateStatusRef.current) {
      return;
    }
    const newStatus = updateStatusRef.current.next().value;
    mutate({id, status: newStatus, trackingNumber});
  }

  function* generateNextStatus() {
    yield Constants.ORDER_STATUS.PENDING.label;
    yield Constants.ORDER_STATUS.ACCEPTED.label;
    yield Constants.ORDER_STATUS.SHIPPED.label;
    updateStatusRef.current = null;
    return Constants.ORDER_STATUS.DELIVERED.label;
  }

  useEffect(() => {
    if (shipment) {
      for (let i = Constants.ORDER_STATUS.PENDING.code; i <= Constants.ORDER_STATUS[shipment.status].code; i++) {
        updateStatusRef.current.next();
      }
    }
  }, []);

  return (
    <a className="cs-card" data-key="c-mesa-wellness-co">
      <span className="cs-card__id">
          <span className="av av--lg av--t3 " title="Mesa Wellness Co."
                aria-hidden="true">{user.givenName.charAt(0).concat(user.lastName.charAt(0))}</span>
          <span
            className="cs-card__name"><b>{user.givenName.concat(' ').concat(user.lastName)}</b><small></small></span>
        </span>
      <span className="cs-card__loc">
        <div className="flex-column w-100">
          {
            order.saleDetail.map(({product}) => (
              <div className="flex-nowrap">
                <svg className="ico " viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"></path>
                  <circle cx="12" cy="10" r="2.3"></circle>
                </svg>
                {product.name}
              </div>
            ))
          }
        </div>
      </span>
      <span className="cs-card__tags">
        <span className="tag"
              style={shipment ? shipment.getColorAndBackground() : {background: '#FFF2F0', color: '#E67E7E'}}>
          {
            shipment ? shipment.status : 'No information'
          }
        </span>
      </span>
      <span className="cs-card__figs">
        <span>
          <small>Price: </small>
            <b>{salePriceFormat}</b>
        </span>
        <span>
          <small>Last order</small>
          <b>23 min ago</b>
        </span>
      </span>
      <ButtonComponent
        id="update-order"
        type="primary"
        size="large"
        onClick={() => updateOrder(order.id, shipment?.status, shipment.trackingNumber)}
        shape="round"
        disabled={!shipment?.status || shipment?.status === Constants.ORDER_STATUS.DELIVERED.label}
      >
        Update Order
      </ButtonComponent>
    </a>
  );
};

export default OrderItemComponent;
