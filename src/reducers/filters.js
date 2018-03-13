const filtersReducerDefaultState = {
  text: '',
  showCurrentlyShopping: false
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'SHOW_CURRENTLY_SHOPPING':
      return {
        ...state,
        showCurrentlyShopping: true
      };
    case 'HIDE_CURRENTLY_SHOPPING':
      return {
        ...state,
        showCurrentlyShopping: false
      };
    default:
      return state;
  }
};
