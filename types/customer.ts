export interface CustomerSlice {
  guest: { uid?: string };
  persistGuest: (uid: string) => void;
}

export interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferences: {
    newsLetters: boolean;
  };
  shippingDetails: {
    address: string;
    phone: string;
    email: string;
    location: string;
    state: string;
    tag: string;
  }[];
}
