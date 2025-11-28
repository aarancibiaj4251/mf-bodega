import {Button, Result} from 'antd';
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const CheckOutPayment = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {
                state && state.message ? (
                    <Result
                        status={state.message.STATUS}
                        title={state.message.TITLE}
                        subTitle={state.order ? state.message.SUB_TITLE.replace(':code', state.order.id) : state.message.SUB_TITLE}
                        extra={[
                            <Button key="buy" onClick={() => navigate('/')}>Seguir comprando</Button>,
                        ]}
                    />
                ) : <Navigate to="/" />
            }
        </>
    );
};

export default CheckOutPayment;
