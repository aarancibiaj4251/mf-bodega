
export interface Sale {
    id: string;
    code: string;
    salePrice: number;
    dateRegister: string;
    saleDetail: Array<SaleDetail>;
    userId?: string;
}

export interface SaleDetail {
    id: string;
    price: number;
    quantity: number;
    productId: string;
}
