import { FilterAction, FilterType } from "types/types";

export const filterDefaultState: FilterType = {
  prices: [0, 100000],
};

export const filterReducer = (state: FilterType, action: FilterAction) => {
  switch (action.type) {
    case "prices": {
      return { ...state, prices: action.payload };
    }
    case "reset": {
      return filterDefaultState;
    }
    default:
      return state;
  }
};
