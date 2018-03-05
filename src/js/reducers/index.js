import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";

function user(state = { userData: [], folders: [] }, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return Object.assign({}, state, {
        userData: action.userData,
        folders: action.userData.folders
      });
    case types.SEARCH_FOLDERS: {
      const { searchValue } = action;
      let folders = [];
      if (searchValue) {
        state.userData.folders.forEach(f => {
          let listMatches = f.lists.filter(l => {
            let itemMatches = [];
            l.items.forEach(i => {
              if (
                i.side1.includes(searchValue) ||
                i.side2.includes(searchValue)
              ) {
                itemMatches.push([i]);
              }
            });
            return itemMatches[0] ? true : false;
          });
          if (listMatches[0]) {
            folders.push({ ...f, lists: listMatches });
          }
        });
      } else {
        folders = state.userData.folders.slice();
      }

      console.log(state.userData.folders);
      return { ...state, folders };
    }
    case types.ADD_FOLDER: {
      const folders = state.userData.folders.concat([
        {
          id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
          name: "New Folder",
          lists: []
        }
      ]);
      const userData = { ...state.userData, folders };
      return Object.assign({}, state, {
        userData: userData,
        folders: userData.folders
      });
    }
    case types.EDIT_FOLDER_NAME: {
      const folders = state.userData.folders.map(f => {
        if (f.id === action.folderId) {
          return {
            ...f,
            name: action.folderName
          };
        } else {
          return f;
        }
      });
      const userData = { ...state.userData, folders };
      return Object.assign({}, state, {
        userData: userData,
        folders: userData.folders
      });
    }
  }
  return state;
}

function layout(state = { sideBarState: false }, action) {
  switch (action.type) {
    case types.SET_SIDEBAR_STATE:
      console.log(action);
      return Object.assign({}, state, { sideBarState: action.sideBarState });
  }
  return state;
}

function list(state = { theme: "themeIndia", listTitle: "" }, action) {
  switch (action.type) {
    case types.SET_THEME:
      return Object.assign({}, state, { theme: action.theme });
    case types.SET_LIST_TITLE:
      return Object.assign({}, state, { listTitle: action.listTitle });
  }
  return state;
}

function game(state = { playState: false }, action) {
  switch (action.type) {
    case types.SET_PLAY_STATE:
      return Object.assign({}, state, { playState: action.playState });
  }
  return state;
}

// Combine Reducers
var reducers = combineReducers({
  user,
  layout,
  list,
  game
});

export default reducers;
