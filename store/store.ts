import { CartSlice } from "types/cart";
import { OrderSlice } from "types/order";
import create from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { cartSlice } from "./cartSlice";
import { orderSlice } from "./orderSlice";
import { UISlice } from "../types/ui";
import { uiSlice } from "./uiSlice";
import { CustomerSlice } from "types/customer";
import { customerSlice } from "./customerSlice";
import localforage from "localforage";

// const storage = localforage.createInstance({
//   name: "the-mall",
//   storeName: "cart",
//   driver: localforage.INDEXEDDB,
// });

export const useStore = create<
  UISlice & CustomerSlice & CartSlice & OrderSlice
>()(
  immer(
    devtools(
      persist(
        (...args) => ({
          ...uiSlice(...args),
          ...customerSlice(...args),
          ...cartSlice(...args),
          ...orderSlice(...args),
        }),
        {
          name: "the-mall-cart",
          partialize: (state) => ({ cart: state.cart }),
          // getStorage: () => storage as StateStorage,
        }
      ),
      { name: "the-mall" }
    )
  )
);
