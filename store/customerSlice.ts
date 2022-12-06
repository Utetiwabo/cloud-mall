import { CartSlice } from "types/cart";
import { CustomerSlice } from "types/customer";
import { OrderSlice } from "types/order";
import { UISlice } from "types/ui";
import { StateCreator } from "zustand";

export const customerSlice: StateCreator<
  CustomerSlice & OrderSlice & UISlice & CartSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  CustomerSlice
> = (set, get) => ({
  guest: {},
  persistGuest: (uid) => {
    set((state) => {
      state.guest.uid = uid;
    });
  },
});
