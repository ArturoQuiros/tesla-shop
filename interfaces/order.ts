import { ISize } from "./products";
import { IShippingInfo } from "./shippingInfo";
import { IUser } from "./user";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingInfo: IShippingInfo;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id?: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}
