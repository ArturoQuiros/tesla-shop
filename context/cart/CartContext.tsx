import { createContext } from "react";
import { ICartProduct, IShippingInfo } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  isLoaded: boolean;
  shippingInfo?: IShippingInfo;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateShipping: (info: IShippingInfo) => void;

  createOrder: () => void;
}

export const CartContext = createContext({} as ContextProps);
