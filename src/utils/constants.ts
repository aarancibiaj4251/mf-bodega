import {
  AreaChartOutlined,
  EditOutlined,
  HomeOutlined,
  ShoppingOutlined,
  HistoryOutlined,
  UserOutlined,
  UngroupOutlined,
  StarOutlined,
  ProductOutlined,
  MergeCellsOutlined,
  QuestionCircleOutlined,
  GoldOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  BarcodeOutlined,
  MessageOutlined,
  OrderedListOutlined,
  AuditOutlined, ShoppingCartOutlined
} from '@ant-design/icons';

export class Constants {
  public static URL_MS_1 = process.env.REACT_APP_API_URL_MS;
  public static URL_PAYPAL_V1 = process.env.REACT_APP_API_URL_PAYPAL;
  public static KEYCLOAK_URL = process.env.KEYCLOAK_URL;
  public static KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;

  public static ICONS = Object.create(
    {
      'HomeOutlined': HomeOutlined, 'ShoppingOutlined': ShoppingOutlined,
      'AreaChartOutlined': AreaChartOutlined, 'EditOutlined': EditOutlined,
      'HistoryOutlined': HistoryOutlined, 'UserOutlined': UserOutlined,
      'UngroupOutlined': UngroupOutlined, 'StarOutlined': StarOutlined,
      'ProductOutlined': ProductOutlined, 'MergeCellsOutlined': MergeCellsOutlined,
      'QuestionCircleOutlined': QuestionCircleOutlined, 'GoldOutlined': GoldOutlined,
      'FileDoneOutlined': FileDoneOutlined, 'ExclamationCircleOutlined': ExclamationCircleOutlined,
      'SettingOutlined': SettingOutlined, 'BarcodeOutlined': BarcodeOutlined,
      'MessageOutlined': MessageOutlined, 'OrderedListOutlined': OrderedListOutlined,
      'AuditOutlined': AuditOutlined, 'ShoppingCartOutlined': ShoppingCartOutlined,
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
