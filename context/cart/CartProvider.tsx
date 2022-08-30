import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { ICartProduct, IOrder, IShippingInfo } from "../../interfaces";
import { CartContext, CartReducer } from "./";

import Cookie from "js-cookie";
import { tesloAPI } from "../../api";
import axios from "axios";

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
    Cookie.set("firstName", info.firstName);
    Cookie.set("lastName", info.lastName);
    Cookie.set("phone", info.phone);
    Cookie.set("country", info.country);
    Cookie.set("address", info.address);
    Cookie.set("zip", info.zip);

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

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingInfo) {
      throw new Error("No shipping info");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingInfo: state.shippingInfo,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      taxRate: state.taxRate,
      total: state.total,
      isPaid: false,
    };

    try {
      //* post the order and clean the cart
      const { data } = await tesloAPI.post("/orders", body);

      dispatch({
        type: "Cart - Set order complete",
      });

      //*clean the cookie
      Cookie.set("cart", "[]");

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };
        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: false,
        message: "",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //props

        //methods
        createOrder,
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
