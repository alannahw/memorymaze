import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import {
  filterLists,
  editItemPropertyInArray,
  findListInFolder,
  editListInFolder,
  deleteItemFromArray,
  getDefaultFolder,
  getDefaultList,
  getDefaultItem
} from "../util";

function user(
  state = {
    userData: [],
    folders: [getDefaultFolder()],
    list: {},
    folderQuery: "",
    theme: "themeIndia"
  },
  action
) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
        folders: action.userData.folders,
        list: action.userData.folders[0].lists[0]
      };
    case types.SET_FOLDERS: {
      const { folders } = action;
      const userData = { ...state.userData, folders };
      return {
        ...state,
        userData: userData,
        folders: folders
      };
    }
    case types.SEARCH_FOLDERS: {
      let folders = state.userData.folders.slice();
      if (action.searchVal) {
        folders = filterLists(action.searchVal, folders);
      }
      return { ...state, folders, folderQuery: action.searchVal };
    }
    case types.ADD_FOLDER: {
      const folders = state.userData.folders.concat([getDefaultFolder()]);
      const userData = { ...state.userData, folders };
      return {
        ...state,
        userData: userData,
        folders: userData.folders
      };
    }
    case types.EDIT_FOLDER_NAME: {
      const { folderId, folderName } = action;
      const folders = editItemPropertyInArray(
        state.userData.folders,
        folderId,
        "name",
        folderName
      );
      const userData = { ...state.userData, folders };
      return {
        ...state,
        userData: userData,
        folders: userData.folders
      };
    }
    case types.DELETE_FOLDER: {
      const folders = deleteItemFromArray(
        state.userData.folders,
        action.folderId
      );
      const userData = { ...state.userData, folders };
      const list = findListInFolder(folders, state.list.id);
      return {
        ...state,
        userData: userData,
        folders: userData.folders,
        list: list ? list : {}
      };
    }
    case types.ADD_LIST: {
      const { folderId, property, value } = action;
      const folders = state.userData.folders.slice();
      const newList = {
        ...getDefaultList(),
        theme: state.theme,
        [property]: value
      };
      folders.forEach(f => {
        if (f.id === folderId) {
          f.lists.push(newList);
        }
      });
      const userData = { ...state.userData, folders };
      return {
        ...state,
        userData: userData,
        folders: userData.folders,
        list: newList
      };
    }
    case types.DELETE_LIST: {
      let folders = [];
      state.userData.folders.forEach(f => {
        folders.push({
          ...f,
          lists: deleteItemFromArray(f.lists, action.listId)
        });
      });
      const userData = { ...state.userData, folders };
      const list = findListInFolder(folders, state.list.id);
      return {
        ...state,
        userData: userData,
        folders: userData.folders,
        list: list ? list : {}
      };
    }
    case types.SET_LIST: {
      return { ...state, list: action.list };
    }
    case types.UPDATE_LIST: {
      const folders = editListInFolder(
        state.userData.folders.slice(),
        action.list.id,
        action.property,
        action.value
      );

      const userData = { ...state.userData, folders };
      const list = findListInFolder(folders, action.list.id);
      return {
        ...state,
        userData: userData,
        folders: userData.folders,
        list: list
      };
    }
    case types.SET_THEME:
      return { ...state, theme: action.theme };
  }
  return state;
}

function layout(
  state = {
    sideBarState: false,
    removeBtnState: false,
    activeSideState: "side2"
  },
  action
) {
  switch (action.type) {
    case types.SET_SIDEBAR_STATE:
      return { ...state, sideBarState: action.sideBarState };

    case types.SET_REMOVEBTN_STATE:
      return { ...state, removeBtnState: action.removeBtnState };
  }
  return state;
}

function game(state = { playState: false }, action) {
  switch (action.type) {
    case types.SET_PLAY_STATE:
      return { ...state, playState: action.playState };
  }
  return state;
}

// Combine Reducers
var reducers = combineReducers({
  user,
  layout,
  game
});

export default reducers;
