import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      // spread operator: different place in the memory [...action.payload.products]
      allProducts: [...action.payload.products],
      filteredProducts: [...action.payload.products],
    };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload.value };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
