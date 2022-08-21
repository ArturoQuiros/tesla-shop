import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "Cart - LoadCart from Cookies";
      payload: ICartProduct[];
    }
  | { type: "Cart - Update Products in Cart"; payload: ICartProduct[] }
  | { type: "Cart - Change Cart Quantity"; payload: ICartProduct }
  | { type: "Cart - Remove Cart Product"; payload: ICartProduct };

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

    case "Cart - Change Cart Quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case "Cart - Remove Cart Product":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    default:
      return state;
  }
};
