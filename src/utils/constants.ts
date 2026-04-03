import {AreaChartOutlined, EditOutlined, HomeOutlined, ShoppingOutlined, HistoryOutlined} from '@ant-design/icons';

export class Constants {
  public static URL_MS_1 = process.env.REACT_APP_API_URL_MS;
  public static URL_PAYPAL_V1 = process.env.REACT_APP_API_URL_PAYPAL;

  public static ICONS = Object.create(
    {
      'HomeOutlined': HomeOutlined, 'ShoppingOutlined': ShoppingOutlined,
      'AreaChartOutlined': AreaChartOutlined, 'EditOutlined': EditOutlined,
      'HistoryOutlined': HistoryOutlined,
    },
  );


  public static MESSAGES = {
    CHECKOUT_PAYMENT: {
      SUCCESS: {
        STATUS: 'success',
        TITLE: 'Compró con éxito en Bodega Store! 😊🎉',
        SUB_TITLE: 'Número de pedido: :code.'
      },
      ERROR: {
        STATUS: 'error',
        TITLE: 'Error al procesar el pago!',
        SUB_TITLE: 'No se hizo ningun recargo a la tarjeta',
      }
    }
  }
}
