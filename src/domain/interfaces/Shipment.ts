import {ORDER_STATUS} from '../../utils/types';
import {Helpers} from '../../utils/helpers';
import {Constants} from '../../utils/constants';

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

  orderFinished(): boolean {
    const statusLabels = [Constants.ORDER_STATUS.SHIPPED.label, Constants.ORDER_STATUS.SHIPPED.label];
    return statusLabels.includes(this.status);
  }
}
