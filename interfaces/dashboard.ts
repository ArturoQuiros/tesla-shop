export interface IDashboardResponse {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number; //only clients
  numberOfProducts: number;
  noStockProducts: number;
  lowStockProducts: number;
}
