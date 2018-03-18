import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import produce from "immer";
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
    case types.SET_USER_DATA: {
      return produce(state, draft => {
        draft.userData = action.userData;
        draft.folders = action.userData.folders;
        draft.list = action.userData.folders[0].lists[0];
      });
    }
    case types.SET_FOLDERS: {
      return produce(state, draft => {
        draft.userData.folders = action.folders;
        draft.folders = action.folders;
      });
    }
    case types.SEARCH_FOLDERS: {
      return produce(state, draft => {
        if (action.searchVal) {
          draft.folders = filterLists(action.searchVal, draft.userData.folders);
        }
        draft.folderQuery = action.searchVal;
      });
    }
    case types.ADD_FOLDER: {
      return produce(state, draft => {
        const folders = draft.userData.folders.concat([getDefaultFolder()]);
        draft.userData.folders = folders;
        draft.folders = folders;
      });
    }
    case types.EDIT_FOLDER_NAME: {
      return produce(state, draft => {
        const { folderId, folderName } = action;
        const folders = editItemPropertyInArray(
          draft.userData.folders,
          folderId,
          "name",
          folderName
        );
        draft.userData.folders = folders;
        draft.folders = folders;
      });
    }
    case types.DELETE_FOLDER: {
      return produce(state, draft => {
        const folders = deleteItemFromArray(
          state.userData.folders,
          action.folderId
        );
        const list = findListInFolder(folders, state.list.id);
        draft.userData.folders = folders;
        draft.folders = folders;
        draft.list = list ? list : {};
      });
    }
    case types.ADD_LIST: {
      return produce(state, draft => {
        const { folderId } = action;
        const newList = { ...getDefaultList(), theme: draft.theme };
        draft.userData.folders.forEach(f => {
          if (f.id === folderId) {
            f.lists.push(newList);
          }
        });
        draft.folders = draft.userData.folders;
        draft.list = newList;
      });
    }
    case types.DELETE_LIST: {
      return produce(state, draft => {
        let folders = [];
        draft.userData.folders.forEach(f => {
          folders.push({
            ...f,
            lists: deleteItemFromArray(f.lists, action.listId)
          });
        });
        const list = findListInFolder(folders, state.list.id);
        draft.userData.folders = folders;
        draft.folders = folders;
        draft.list = list ? list : {};
      });
    }
    case types.SET_LIST: {
      return produce(state, draft => {
        draft.list = action.list;
      });
    }
    case types.UPDATE_LIST: {
      return produce(state, draft => {
        const folders = editListInFolder(
          draft.userData.folders,
          action.list.id,
          action.property,
          action.value
        );
        const list = findListInFolder(folders, state.list.id);
        draft.userData.folders = folders;
        draft.folders = folders;
        draft.list = list ? list : {};
      });
    }
    case types.SET_THEME: {
      return produce(state, draft => {
        draft.theme = action.theme;
      });
    }
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
