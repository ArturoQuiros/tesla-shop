import { ICartProduct, IShippingInfo } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "Cart - LoadCart from Cookies";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - LoadShipping from Cookies";
      payload: IShippingInfo;
    }
  | {
      type: "Cart - update Shipping Info";
      payload: IShippingInfo;
    }
  | { type: "Cart - Update Products in Cart"; payload: ICartProduct[] }
  | { type: "Cart - Change Cart Quantity"; payload: ICartProduct }
  | { type: "Cart - Remove Cart Product"; payload: ICartProduct }
  | { type: "Cart - Set order complete" }
  | {
      type: "Cart - Update Order Summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        taxRate: number;
        total: number;
      };
    };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from Cookies":
      return {
        ...state,
        isLoaded: true,
        cart: action.payload,
      };

    case "Cart - update Shipping Info":

    case "Cart - LoadShipping from Cookies":
      return {
        ...state,
        shippingInfo: action.payload,
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

    case "Cart - Update Order Summary":
      return {
        ...state,
        ...action.payload,
      };

    case "Cart - Set order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        taxRate: 0,
        total: 0,
      };

    default:
      return state;
  }
};
