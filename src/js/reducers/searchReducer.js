import * as types from "../actions/actionTypes";

const initialState = {
  searchType: "",
  title: ""
};

const searchReducer = function(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SEARCH_LAYOUT:
      return Object.assign({}, state, {
        searchType: action.searchType,
        title: action.title
      });
  }

  return state;
};

export default searchReducer;
