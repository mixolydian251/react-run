const preferencesReducerDefaultState = {
  maj: true,
  min: true,
  dim: false,
  maj7: false,
  '7': false,
  min7: false,
  m7b5: false,
  mode: 'chord'
};

export default (state = preferencesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PREFERENCES':
      return {
        ...state,
        ...action.preferences
      };
    default:
      return state;
  }
};