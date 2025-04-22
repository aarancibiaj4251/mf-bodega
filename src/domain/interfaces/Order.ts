export interface Order {
  id: string;
  code: string;
  salePrice: number;
  dateRegister: string;
  saleDetail: Array<SaleDetail>
}

export interface SaleDetail {
  id: string;
  price: number;
  quantity: number;
  saleId: string;
  productId: string;
}
