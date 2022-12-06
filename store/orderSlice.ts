import { home_delivery_price } from "constants/saleConsts";
import sum from "lodash/sum";
import { CartSlice } from "types/cart";
import { CustomerSlice } from "types/customer";
import { OrderItemTypes, OrderSlice, OrderTypes } from "types/order";
import { StateCreator } from "zustand";
import { UISlice } from "../types/ui";

const initialState: OrderTypes = {
  items: [],
  subTotal: 0,
  shipping_option: { price: 2000, type: "home-delivery" },
  total: 0,
  payment: { method: "card" },
  //shipping_details state is to be handled by formik
};

export const orderSlice: StateCreator<
  CustomerSlice & OrderSlice & UISlice & CartSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  OrderSlice
> = (set, get) => ({
  order: initialState,
  orderProgress: { code: 0 },
  addOrderItems: (items) =>
    set((state) => {
      const old = state.order;
      const subTotal = sum(items.map((item) => item.price * item.quantity));
      const total = subTotal + old.shipping_option.price;
      return {
        order: {
          ...old,
          items,
          subTotal,
          total,
        },
      };
    }),
  setPaymentMethod: (method) =>
    set((state) => ({ order: { ...state.order, payment: { method } } })),
  setShippingOption: (shipping_type) =>
    set((state) => {
      const old = state.order;
      const shippingPrice =
        shipping_type === "home-delivery" ? home_delivery_price : 0;
      const total = old.subTotal + shippingPrice;
      return {
        order: {
          ...old,
          shipping_option: {
            price: shippingPrice,
            type: shipping_type,
          },
          total,
        },
      };
    }),
  addShippingDetails: (shipping_details) =>
    set((state) => ({ order: { ...state.order, shipping_details } })),
  resetOrder: () =>
    set(() => ({ order: initialState, orderProgress: { code: 0 } })),
});
