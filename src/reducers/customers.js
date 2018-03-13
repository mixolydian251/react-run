export const customerReducerDefaultState = [];

// state for this reducer returns a single array, independent from 'filters reducer'

export default (state = customerReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return [...state, action.customer];
    case 'REMOVE_CUSTOMER':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_CUSTOMER':
      return state.map(element => {
        if (element.id === action.id) {
          return {
            ...element,
            ...action.updates
          };
        }
        return element;
      });
    case 'SET_CUSTOMERS':
      return action.customers;
    default:
      return state;
  }
};
