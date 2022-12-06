import { CartSlice } from "types/cart";
import { CustomerSlice } from "types/customer";
import { OrderSlice } from "types/order";
import { StateCreator } from "zustand";
import { UISlice } from "../types/ui";

export const uiSlice: StateCreator<
  CustomerSlice & CartSlice & OrderSlice & UISlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  UISlice
> = (set, get) => ({
  auth: { modalOpen: false },
  openAuthModal: () => set(() => ({ auth: { modalOpen: true } })),
  onCloseAuthModal: () => set(() => ({ auth: { modalOpen: false } })),
  onToggleAuthModal: () =>
    set((state) => ({ auth: { modalOpen: !state.auth.modalOpen } })),
});
