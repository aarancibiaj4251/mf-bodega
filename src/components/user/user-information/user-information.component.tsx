import React, {useEffect, useState} from 'react';
import {Avatar, Result, Table, Typography} from 'antd';
import {getSalesByUser} from '../../../data/rest/sale.service';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../../redux/user/user.selector';
import './user-information.component.scss';
import {useMutation} from '@tanstack/react-query';
import {Order} from '../../../domain/interfaces/Order';
import keycloak from '../../../config/auth/keycloak.config';
import {ColumnsType} from 'antd/es/table';
import ButtonComponent from '../../button/Button.component';
import {Product} from '../../../domain/interfaces/Product';
import OrderDetailsComponent from '../../orders/order-details/OrderDetails.component';
import {Helpers} from '../../../utils/helpers';
import {User} from '../../../domain/interfaces/user/User';
import {Shipment} from '../../../domain/interfaces/Shipment';
import OrderDetailsActionsComponent from '../../orders/order-details-actions/OrderDetailsActions.component';

const { Text } = Typography;

interface DataType {
  key: React.Key | string;
  code: string;
  total: string;
  quantity: number;
  date: Date;
  products: Array<Product>;
  customer: User;
  shipments: Shipment[];
}

const UserInformation = () => {
  const user = useSelector(selectCurrentUser);
  const [dataType, setDataType] = useState<DataType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sale, setSale] = useState<Order>(null);
  const [open, setOpen] = useState(false);
  const mutation = useMutation<Order[], Error, {id: string}>({
    mutationFn: () => getSalesByUser(user.id),
    onSuccess: orders => {
      setOrders(orders);
      setDataType(
        orders.map(({id, code, saleDetail, salePrice, dateRegister, user, shipments}: Order) => {
          const saleProducts = saleDetail.map(detail => detail.product);
          const salePriceFormat = Helpers.setNumberFormat(salePrice, {
            style: 'currency',
            currency: 'JPY',
            currencyDisplay: 'symbol',
          });
          return {
            key: id, code: `#${code}`,
            quantity: saleDetail.length, total: salePriceFormat,
            date: dateRegister, products: saleProducts, customer: user,
            shipments,
          };
        })
      );
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: 'OrderId',
      dataIndex: 'code',
      fixed: 'left',
      render: (value, record) => <Text onClick={() => showDrawer(record)} strong className="pointer">{value}</Text>
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (value) => <div className="flex-column">
        <h4>{`${value.givenName} ${user.lastName}`}</h4>
        <h5>{value.email}</h5>
      </div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      render: (value, record, index) => record.products.map(({id, name, image}) => <Avatar key={id} src={image}>{name}</Avatar>)
    },
    {
      title: 'Order date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (value, record, index) => <OrderDetailsActionsComponent order={record} showDrawer={showDrawer}/>
    },
  ];

  useEffect(() => {
    if (user) {
      mutation.mutate({id: user.id});
    }
  }, [keycloak.authenticated]);

  const showDrawer = (record: DataType) => {
    const currentOrder = orders.find((order) => order.id === record.key);
    setSale(currentOrder);
    setOpen(true);
  };

  return (
    <>

      { keycloak.authenticated ?
        <div className="orders color-black">
          <div className="orders__previous">
            <h1 className="text-center">
              Orders history
            </h1>
            <div className="orders__previous--table">
              <Table columns={columns} dataSource={dataType} size="middle" />
            </div>
            {
              sale ? <OrderDetailsComponent
                sale={sale}
                open={open}
                setOpen={setOpen}
              /> : null
            }
          </div>
        </div>
        :
        <Result
          icon={Helpers.createIcon('LoginOutlined')}
          title="Please, log into the app!"
          extra={<ButtonComponent type="primary"
                                  id="LoginButton"
                                  size="middle"
                                  onClick={() => keycloak.login({redirectUri: process.env.KEYCLOAK_INIT_REDIRECT_URL + '/portal/orders'})}>Log
            In</ButtonComponent>}
        />}
    </>
  );
};

export default UserInformation;
