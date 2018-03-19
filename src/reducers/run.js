export const runReducerDefaultState = [];

// state for this reducer returns a single array, independent from 'filters reducer'

export default (state = runReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RUNS':
      return [...state, action.runs];
    case 'REMOVE_RUN':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_RUNS':
      return action.runs;
    default:
      return state;
  }
};
