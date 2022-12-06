import { ShippingOption, ShippingDetails } from "./types";

export interface OrderItemTypes {
  _id: string;
  title: string;
  description: string;
  shortDescription: String;
  price: number;
  // rating: number;
  brand: string;
  thumbnail: string;
  vendor: string;
  quantity: number;
  discountPercentage: number;
}

export interface OrderTypes {
  items: OrderItemTypes[];
  shipping_option: ShippingOption;
  shipping_details?: ShippingDetails;
  subTotal: number;
  total: number;
  payment: { method: string };
}

export interface OrderSlice {
  order: OrderTypes;
  orderProgress: {
    code: number;
  };
  addOrderItems: (items: OrderItemTypes[]) => void;
  setPaymentMethod: (method: string) => void;
  setShippingOption: (shipping_type: "home-delivery" | "pickup") => void;
  addShippingDetails: (shipping_details: ShippingDetails) => void;
  // updateOrderStatus: () => void;
  resetOrder: () => void;
}

export interface OrderCompletedType extends OrderTypes {
  orderId: string;
  status: string;
  dateTime: Date;
}
