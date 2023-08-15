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
    let maxPrice = action.payload.products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      // spread operator: different place in the memory [...action.payload.products]
      allProducts: [...action.payload.products],
      filteredProducts: [...action.payload.products],
      filters: { ...state.filters, maxPrice, price: maxPrice },
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

  if (action.type === SORT_PRODUCTS) {
    //copy the values from the state
    let newFilteredProducts = [...state.filteredProducts];

    if (state.sort === 'price-lowest') {
      newFilteredProducts = newFilteredProducts.sort(
        (a, b) => a.price - b.price
      );
    }
    if (state.sort === 'price-highest') {
      newFilteredProducts = newFilteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }
    if (state.sort === 'name-a') {
      newFilteredProducts = newFilteredProducts.sort((a, b) =>
        // a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        a.name.localeCompare(b.name)
      );
    }
    if (state.sort === 'name-z') {
      newFilteredProducts = newFilteredProducts.sort((a, b) =>
        // b.name < a.name ? -1 : b.name > a.name ? 1 : 0
        b.name.localeCompare(a.name)
      );
    }

    return { ...state, filteredProducts: newFilteredProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log('filter products');
    return { ...state };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
