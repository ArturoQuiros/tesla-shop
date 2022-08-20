import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "Cart - LoadCart from Cookies";
      payload: ICartProduct[];
    }
  | { type: "Cart - Update Products in Cart"; payload: ICartProduct[] };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from Cookies":
      return {
        ...state,
        cart: action.payload,
      };

    case "Cart - Update Products in Cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
};
