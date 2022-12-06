import { OrderItemTypes } from "./order";

export interface CartSlice {
  cart: OrderItemTypes[];
  addItemToCart: (item: OrderItemTypes) => void;
  removeItemFromCart: (itemId: string) => void;
  removeItemsFromCart: (itemsId: string[]) => void;
  removeAll: () => void;
  incrementCartQ: (itemId: string) => void;
  decrementCartQ: (itemId: string) => void;
  updateItemsData: () => void;
}
