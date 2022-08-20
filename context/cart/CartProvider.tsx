import { FC, PropsWithChildren, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, CartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const initalState: CartState = {
  cart: [],
};

export const CartProvider: FC<PropsWithChildren<CartState>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CartReducer, initalState);

  return (
    <CartContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
