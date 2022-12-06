import { CartSlice } from "types/cart";
import { CustomerSlice } from "types/customer";
import { OrderItemTypes, OrderSlice } from "types/order";
import { StateCreator } from "zustand";
import { UISlice } from "../types/ui";

export const cartSlice: StateCreator<
  CustomerSlice & CartSlice & UISlice & OrderSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  CartSlice
> = (set, get) => ({
  cart: [],
  addItemToCart: (item) =>
    set((state) => {
      const itemInCart = state.cart.find((oldItem) => oldItem._id === item._id);
      if (!itemInCart) return { cart: [...state.cart, item] };
      return {
        cart: [
          ...state.cart.filter((oldItem) => oldItem._id !== item._id),
          { ...itemInCart, quantity: itemInCart.quantity + 1 },
        ],
      };
    }),
  removeItemFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => itemId !== item._id),
    })),
  removeItemsFromCart: (itemsId) =>
    set((state) => ({
      cart: state.cart.filter((oldItem) =>
        itemsId.some((itemId) => itemId === oldItem._id)
      ),
    })),
  removeAll: () => set(() => ({ cart: [] })),
  incrementCartQ: (itemId) =>
    set((state) => {
      const item = state.cart.find((oldItem) => oldItem._id === itemId);
      if (item) item.quantity += 1;
    }),
  decrementCartQ: (itemId) =>
    set((state) => {
      const item = state.cart.find((oldItem) => oldItem._id === itemId);
      if (item) item.quantity -= 1;
    }),
  updateItemsData: () => {},
});
