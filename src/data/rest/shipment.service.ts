import {apiClient} from '../../config/axios/axios.config';
import {Shipment} from '../../domain/interfaces/Shipment';

const SHIPMENT_URL = `shipment`;

export const updateOrderStatus = (orderId: string, status: string, trackingNumber: string): Promise<Shipment> => {
    return new Promise(((resolve, reject) => {
        apiClient.put(SHIPMENT_URL + `/update-status`, {
            orderId, status, trackingNumber,
        })
          .then(((results) => results.data))
          .then((value) => resolve(value))
          .catch(e => reject(e))
    }));
}
