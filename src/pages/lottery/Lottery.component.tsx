import React, {useState} from 'react';
import Countdown from 'antd/es/statistic/Countdown';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {User} from '../../domain/interfaces/user/User';
import {selectLottery} from '../../redux/lottery/lottery.selector';
import {Lottery} from '../../domain/interfaces/Lottery';
import {Button, Result, Tag} from 'antd';
import {useNavigate} from 'react-router-dom';
import {getWinner} from '../../data/rest/lottery.service';
import {SmileOutlined, GiftOutlined} from '@ant-design/icons';
import {ResultStatusType} from 'antd/es/result';
import {setLottery} from '../../redux/lottery/lottery.actions';

interface Props {
  user: User;
  lottery: Lottery;
  setLottery: any;
}

interface Message {
  icon?: React.ReactNode;
  status?: ResultStatusType;
  title: string;
  subTitle: string;
}

const LotteryPage = ({user, lottery, setLottery}: Props) => {

  const navigate = useNavigate();
  const [message, setMessage] = useState<Message>({
    icon: <GiftOutlined rev={undefined}/>,
    status: 'info', title: `No hay un sorteo en curso por el momento`,
    subTitle: 'Te notificaremos cuando se realize un nuevo sorteo',
  });

  const lotteryDate = new Date(lottery?.dateRegister);

  let date_future: any = new Date(lotteryDate.getFullYear(), lotteryDate.getMonth(), lotteryDate.getDate(), lotteryDate.getHours(), lotteryDate.getMinutes(), lotteryDate.getSeconds());
  const today: any = new Date();

  const diff = date_future - today;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
  const deadline = date_future + 1000; // Dayjs is also OK

  const onFinish = async () => {
    const lottery: any = await getWinner();
    console.log(lottery, user, days);

    const ticketWinner = user.tickets.find((x: any) => x.lotteryId === lottery.id && lottery.ticketWinner === x.code);
    if (ticketWinner) {
      setMessage({
        icon: <GiftOutlined rev={undefined} />,
        status: 'success', title: `Felicidades!! TÚ, eres el GANADOR 🥳`,
        subTitle: 'Ganaste un vale por S/ 100 💸 para tus compras en Bodega Store',
      });
    } else {
      setMessage({
        icon: <SmileOutlined rev={undefined} />, title: `No fuiste el ganador por esta vez 🥹`,
        subTitle: 'Te pedimos seguir intentando y disfrutando de tus compras',
      });
    }
  };

  /*useEffect(() => {
    getActiveLottery()
      .then((lottery: Lottery) => {
        setLottery(lottery);
      });
  }, [])*/

  return (
    <div>
      Lottery
      {
        diff <= 0 ? (
          <Result
            icon={message?.icon}
            status={message?.status}
            title={message?.title}
            subTitle={message?.subTitle}
            extra={[
              <Button key="buy" onClick={() => navigate('/')}>Ir a comprar</Button>,
            ]}
          />
          ) : (
          <div className="text-center">
            <h1>Esperemos que seas el afortunado ganador del sorteo. SUERTE! 🙌</h1>
            <Tag color="red" style={{marginBottom: '10px'}}>Tiempo de espera</Tag>
            <Countdown value={deadline} onFinish={onFinish} />
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  lottery: selectLottery,
})

const mapDispatchToProps = (dispatch: Function) => ({
  setLottery: (lottery: Lottery) => dispatch(setLottery(lottery)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LotteryPage);
