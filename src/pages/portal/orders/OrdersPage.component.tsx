import React, {useEffect, useState} from 'react';
import './OrdersPage.component.scss';
import OrderItemComponent from '../../../components/orders/order-item/OrderItem.component';
import {useMutation} from '@tanstack/react-query';
import {Order} from '../../../domain/interfaces/Order';
import {getOrders} from '../../../data/rest/sale.service';
import {Form} from '@vibe/icons';
import {Constants} from '../../../utils/constants';
import OrderStatisticComponent from '../../../components/orders/order-statistic/OrderStatistic.component';
import {Helpers} from '../../../utils/helpers';
import {motion} from 'motion/react';

const OrdersPage = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  const [statistic, setStatistic] = useState({pendingOrders: [], wholeSale: 0});

  const buildStatistic = (orders: Order[]) => {
    return orders.reduce((previousValue, order) => {

      const lastState= order.shipments[order.shipments.length - 1]?.status || null;

      if (lastState === Constants.ORDER_STATUS.PENDING.label) {
        previousValue.pendingOrders = [...previousValue.pendingOrders, {id: order.id, status: lastState}];
      }

      previousValue.wholeSale += order.salePrice;

      return previousValue;

    }, {pendingOrders: [], wholeSale: 0}) as {pendingOrders: Array<{id: string, status: string}>, wholeSale: 0};
  }

  const {mutate} = useMutation<Order[], Error, {}>({
    mutationFn: async () => await getOrders(),
    onSuccess: orders => {
      setOrders(orders);
      setStatistic(buildStatistic(orders));
    }
  });

  useEffect(() => {
    mutate({});
  }, []);

  return (
    <div className="orders flex-column gap-15">
      <div className="orders__statistic">
        <OrderStatisticComponent
          title="Pending orders"
          icon={Form}
          value={statistic.pendingOrders.length}
          className="orders__statistic--item"
        />
        <OrderStatisticComponent
          title="Wholesale"
          icon={Form}
          value={Helpers.setNumberFormat(statistic.wholeSale, Constants.CURRENCY_FORMAT.JAPANESE)}
          className="orders__statistic--item"
        />
        <OrderStatisticComponent
          title="Avergae order"
          icon={Form}
          value={0}
          className="orders__statistic--item"
        />
        <OrderStatisticComponent
          title="Cancelled orders"
          icon={Form}
          value={0}
          className="orders__statistic--item"
        />
      </div>

      <div className="cs-grid mt-20">
        {
          orders.map((order) => <motion.animate whileHover={{translateY: -5}}>
            <OrderItemComponent key={order.id} order={order} />
          </motion.animate>)
        }
      </div>

    </div>
  );
};

export default OrdersPage;
