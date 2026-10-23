import {ORDER_STATUS} from '../../utils/types';
import {Helpers} from '../../utils/helpers';

export class Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  status: ORDER_STATUS;
  constructor({id, orderId, trackingNumber, status}) {
    this.id = id;
    this.orderId = orderId;
    this.trackingNumber = trackingNumber;
    this.status = status;
  }

  getColorAndBackground() {
    return Helpers.orderStatusColor(this.status);
  }
}
