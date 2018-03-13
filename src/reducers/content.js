export const contentReducerDefaultState = [];

// state for this reducer returns a single array

export default (state = contentReducerDefaultState, action) => {
  switch (action.type) {
    case 'CREATE_CONTENT':
      return [...state, action.content];
    case 'REMOVE_CONTENT':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_CONTENT':
      return state.map(element => {
        if (element.id === action.id) {
          return {
            ...element,
            ...action.updates
          };
        }
        return element;
      });
    case 'SET_CONTENT':
      return action.content;
    default:
      return state;
  }
};
