// redux/reducers.js
import { combineReducers } from 'redux';

// Reducer בסיסי לדוגמה
const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
