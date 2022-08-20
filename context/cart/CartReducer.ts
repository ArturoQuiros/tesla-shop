import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "Cart - LoadCart from cookie | storage"; payload: ICartProduct[] }
  | { type: "Cart - Add Product"; payload: ICartProduct };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookie | storage":
      return {
        ...state,
      };

    case "Cart - Add Product":
      return {
        ...state,
      };

    default:
      return state;
  }
};
