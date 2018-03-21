import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import produce from "immer";
import {
  editItemPropertyInArray,
  editListInFolder,
  deleteItemFromArray,
  getDefaultUser,
  getDefaultFolder,
  getDefaultList
} from "../util";

function user(
  state = {
    userData: [getDefaultUser()],
    currentListId: "",
    folderQuery: "",
    listItemQuery: "",
    theme: "themeIndia"
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_USER_DATA: {
        draft.userData = action.userData;
        draft.currentListId = action.userData.folders[0].lists[0].id;
        return;
      }
      case types.SET_FOLDERS: {
        draft.userData.folders = action.folders;
        return;
      }
      case types.SET_FOLDER_QUERY: {
        draft.folderQuery = action.searchVal;
        return;
      }
      case types.ADD_FOLDER: {
        const folders = draft.userData.folders.concat([
          { ...getDefaultFolder(), lists: [] }
        ]);
        draft.userData.folders = folders;
        return;
      }
      case types.EDIT_FOLDER_NAME: {
        const { folderId, folderName } = action;
        const folders = editItemPropertyInArray(
          draft.userData.folders,
          folderId,
          "name",
          folderName
        );
        draft.userData.folders = folders;
        return;
      }
      case types.DELETE_FOLDER: {
        const folders = deleteItemFromArray(
          draft.userData.folders,
          action.folderId
        );
        draft.userData.folders = folders;
        return;
      }
      case types.ADD_LIST: {
        const { folderId } = action;
        const newList = { ...getDefaultList(), theme: draft.theme };
        draft.userData.folders.forEach(f => {
          if (f.id === folderId) {
            f.lists.push(newList);
          }
        });
        draft.currentListId = newList.id;
        return;
      }
      case types.DELETE_LIST: {
        let folders = [];
        draft.userData.folders.forEach(f => {
          folders.push({
            ...f,
            lists: deleteItemFromArray(f.lists, action.listId)
          });
        });
        draft.userData.folders = folders;
        return;
      }
      case types.SET_LIST: {
        draft.currentListId = action.listId;
        return;
      }
      case types.UPDATE_LIST: {
        const folders = editListInFolder(
          draft.userData.folders,
          action.listId,
          action.property,
          action.value
        );
        draft.userData.folders = folders;
        return;
      }
      case types.SET_THEME: {
        draft.theme = action.theme;
        return;
      }
      case types.SET_LIST_ITEM_QUERY: {
        draft.listItemQuery = action.searchVal;
        return;
      }
    }
  });
  // return state;
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
