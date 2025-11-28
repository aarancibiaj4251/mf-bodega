export interface ReportSale {
  year: string;
  months: Array<ReportMonthSales>;
}

export interface ReportMonthSales {
  month: number;
  venta: number;
}
