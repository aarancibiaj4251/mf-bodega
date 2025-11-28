import axios from "axios";
import {Constants} from "../../utils/constants";
import {CartItem} from "../../domain/interfaces/CartItem";
import {Sale, SaleDetail} from "../../domain/interfaces/Sale";
import {v4 as uuidV4} from 'uuid';
import {ReportSale} from '../../domain/interfaces/ReportSale';
import {User} from '../../domain/interfaces/user/User';
import {Order} from '../../domain/interfaces/Order';

const SALE_URL = Constants.URL_MS_1 + `sale`;

export const saveSale = (cartItems: Array<CartItem>, salePrice: number, user: User) => {
    const saleDetail: Array<SaleDetail> = cartItems.map(x => ({
        id: uuidV4(),
        price: x.product.unitPrice,
        quantity: x.count,
        productId: x.product.id,
    }));
    const sale: Sale = {
        id: uuidV4(),
        saleDetail,
        dateRegister: new Date().toISOString(),
        salePrice,
        userId: user.id,
        code: String(new Date().getTime()),
    };
    return new Promise(((resolve, reject) => {
        axios.post(SALE_URL, sale)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const saleReportAnnual = () => {
    return new Promise(((resolve, reject) => {
        axios.post(SALE_URL + `/reporte`)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const generatePDFSale = (reportSale: ReportSale) => {
    return new Promise(((resolve, reject) => {
        axios.post(SALE_URL + `/reporteFile`, reportSale, {
          headers: {}, responseType: 'blob',
            params: {contentType: 'pdf'}
        })
          .then(((results) => results.data))
          .then((value) => {
              resolve(value);
          })
          .catch(e => reject(e))
    }));
}

export const getSalesByUser = (id: string): Promise<Array<Order>> => {
    return new Promise(((resolve, reject) => {
        axios.get(SALE_URL + `/user/${id}`, )
          .then(((results) => results.data))
          .then((value) => resolve(value))
          .catch(e => reject(e))
    }));
}
