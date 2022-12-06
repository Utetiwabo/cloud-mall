export interface ItemTypes {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  subCategory: string;
  thumbnail: string;
  images: string[];
  deal: boolean;
  vendor: string;
  tags: string[];
  shortDescription: string;
  discountPercentage: number;
}

export interface CategoryTypes {
  _id: string;
  category: string;
  brands?: string[];
}

export interface StoreType {
  _id: string;
  name: string;
  description: string;
  about: string;
  uniqueName: string;
  merchant: { name: string };
  dateCreated: Date;
  orders: { productName: string; quantity: number }[];
  verified: boolean;
  categories: {
    category: string;
    subCategories: { category: string; imageUrl: string }[];
  }[];
  blogs?: {
    name: string;
  };
}

export interface PageImage {
  id: string | number;
  text: string;
  url: string;
}

export interface PageMedia {
  id: string | number;
  text: string;
  url: string;
  type: "text" | "image" | "video";
}

export interface ArticleTypes {
  id: string;
  title: string;
  heading: string;
  body1: string;
  body2: string;
}

export interface PagePaintType {
  _id: string;
  host: string;
  name: string;
  role: string;
  images: PageImage[];
  medias: PageMedia[];
  // categories: { name: string; tag: string }[];
  brands: string[];
}

export interface BlogTypes extends PagePaintType {
  article: ArticleTypes;
}

export interface ItemsQueryTypes {
  pagn: number;
  group: string;
  limit: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  //TODO phone number
  phone: string;
  email: string;
  location: string;
  state: string;
  address: string;
  notes?: string;
}

export interface ShippingOption {
  type: "home-delivery" | "pickup";
  price: number;
}

export type FilterAction =
  | {
      type: "prices";
      payload?: (number | string)[];
    }
  | { type: "reset" }
  | { type: "jj"; payload: string };

export interface FilterType {
  // categories: string;
  // brand: string;
  prices: number[];
  // rating: number;
  // freeShipping: string;
  color?: string;
}

export type Envr = "store" | "main";

// export interface BlogType{
//   _id:string;

// }

// export interface ZOrderSlice {
//   orderItems: OrderSlice;
// }
