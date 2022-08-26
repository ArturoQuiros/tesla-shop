import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { ICartProduct, IShippingInfo } from "../../interfaces";
import { CartContext, CartReducer } from "./";

import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  isLoaded: boolean;
  shippingInfo?: IShippingInfo;
}

const initalState: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: 0,
  total: 0,
  isLoaded: false,
  shippingInfo: undefined,
};

export const CartProvider: FC<PropsWithChildren<CartState>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CartReducer, initalState);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "Cart - LoadCart from Cookies",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "Cart - LoadCart from Cookies",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingInfo: IShippingInfo = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        phone: Cookie.get("phone") || "",
        country: Cookie.get("country") || "",
        address: Cookie.get("address") || "",
        zip: Cookie.get("zip") || "",
      };

      dispatch({
        type: "Cart - LoadShipping from Cookies",
        payload: shippingInfo,
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length !== 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const quantity = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems: quantity,
      subTotal: subTotal,
      taxRate: subTotal * taxRate,
      total: subTotal + subTotal * taxRate,
    };

    dispatch({ type: "Cart - Update Order Summary", payload: orderSummary });
  }, [state.cart]);

  const updateShipping = (info: IShippingInfo) => {
    dispatch({
      type: "Cart - update Shipping Info",
      payload: info,
    });
  };

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "Cart - Change Cart Quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "Cart - Remove Cart Product", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //props

        //methods
        updateShipping,
        removeCartProduct,
        updateCartQuantity,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
