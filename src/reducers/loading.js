const loadingReducerDefaultState = {
  loading: true
};

export default (state = loadingReducerDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        loading: !state.loading
      };
    default:
      return state;
  }
};
