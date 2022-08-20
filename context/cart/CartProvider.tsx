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

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "Cart - Update Products in Cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "Cart - Update Products in Cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "Cart - Update Products in Cart",
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //props

        //methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
