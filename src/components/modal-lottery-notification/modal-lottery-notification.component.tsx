import React, {useEffect} from 'react';
import {notification} from 'antd';
import {NotificationPlacement} from 'antd/es/notification';
import {getActiveLottery} from '../../data/rest/lottery.service';
import {connect} from 'react-redux';
import {Lottery} from '../../domain/interfaces/Lottery';
import {setLottery} from '../../redux/lottery/lottery.actions';

const Context = React.createContext({ name: 'Default' });

interface Props {
  setLottery: (lottery: Lottery) => void;
}

const ModalLotteryNotification = ({setLottery}: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, lottery: any) => {
    api.info({
      duration: 10,
      style: {
        width: '600px'
      },
      message: <h1>ATENCION!! 📣</h1>,
      description: <div>
        <h3>
          Estimado cliente hay un sorteo vigente 😎 para el dia <strong>{new Date(lottery.dateRegister).toLocaleString()}</strong> por un premio de S/ 100 💸💰 ,
          si usted aun no cuenta con un <strong>ticket</strong> para el sorteo 🥶😱, puede obtenerlo
          haciendo una compra no menor a los S/ 30 🥰 🙌
        </h3>
      </div>,
      placement,
    });
  };

  /*useEffect(() => {
    getActiveLottery()
      .then((lottery: Lottery) => {
        setLottery(lottery);
        if (lottery.status) {
          openNotification('topLeft', lottery);
        }
      });
  }, [])*/

  return (
    <>
      {contextHolder}
    </>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  setLottery: (lottery: Lottery) => dispatch(setLottery(lottery)),
})

export default connect(null, mapDispatchToProps)(ModalLotteryNotification);
