import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Result, Timeline} from 'antd';
import {getSalesByUser} from '../../../data/rest/sale.service';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../../redux/user/user.selector';
import './user-information.component.scss';
import {useMutation} from '@tanstack/react-query';
import {Order} from '../../../domain/interfaces/Order';
import keycloak from '../../../config/auth/keycloak.config';
import {LoginOutlined} from '@ant-design/icons';

const UserInformation = () => {

  const user = useSelector(selectCurrentUser);
  const mutation = useMutation<Order[], Error, {id: string}>({
    mutationFn: () => getSalesByUser(user.id),
    onSuccess: sales => setSales(sales),
  });

  const [sales, setSales] = useState<Array<Order>>([]);

  const orderSales = (): Array<Order> => sales.sort((a: any, b: any) => new Date(a.dateRegister).getTime() > new Date(b.dateRegister).getTime() ? -1 : 1);

  useEffect(() => {
    if (user.id) {
      mutation.mutate({id: user.id});
    }
  }, [user.id]);

  return (
    <>
      { keycloak.authenticated ? <Card>
        <h1 className="text-center">
          Historial de compras
        </h1>
        <hr/>
        <Timeline style={{marginTop: '30px'}} mode="left">
          {
            sales.length ? orderSales()
              .map((sale: Order) => (
                <Timeline.Item label={new Date(sale.dateRegister).toLocaleString()} key={sale.id}>
                  <div className="flex-wrap justify-content-between">
                    <span className="mr-20"><span className="bold">Código: </span> {sale.code}</span>
                    <span><span className="bold">Precio total: </span>  {sale.salePrice} 円</span>
                  </div>
                  <hr/>
                  {
                    sale.saleDetail?.map((detail: any) => (
                      <div className="sale-detail" key={detail.id}>
                        <div className="flex-column">
                          <span className="bold">Producto </span>
                          <span className="">{detail.product?.name}</span>
                        </div>
                        <div className="flex-column">
                          <span className="bold">Cantidad</span>
                          <span className="">{detail.quantity}</span>
                        </div>
                        <div className="flex-column">
                          <span className="bold">Precio del producto </span>
                          <span className="">{detail.price} 円</span>
                        </div>
                      </div>
                    ))
                  }
                </Timeline.Item>
              )) : <Alert message="No records" type="info" />
          }
        </Timeline>
      </Card> : <Result
        icon={<LoginOutlined />}
        title="Please, log into the app!"
        extra={<Button type="primary" onClick={() => keycloak.login({redirectUri: process.env.KEYCLOAK_INIT_REDIRECT_URL + '/informacion'})}>Log In</Button>}
      />}
    </>
  );
};

export default UserInformation;
