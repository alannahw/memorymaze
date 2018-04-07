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
    theme: "themeIndia",
    graph: { start: 0, end: 30 },
    gameLevels: 4
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_USER_DATA: {
        draft.userData = action.userData;
        draft.currentListId = action.userData.folders[0].lists[0].id;
        draft.gameLevels = action.userData.settings.gameLevels;
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
      case types.SET_GAME_LEVELS: {
        draft.gameLevels = action.levels;
        return;
      }
      case types.SET_GRAPH_TIMEFRAME: {
        draft.graph = { start: action.start, end: action.end };
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
    activeSideState: "side1"
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_SIDEBAR_STATE: {
        draft.sideBarState = action.sideBarState;
        return;
      }
      case types.SET_REMOVEBTN_STATE: {
        draft.removeBtnState = action.removeBtnState;
        return;
      }
      case types.SET_ACTIVESIDE_STATE: {
        draft.activeSideState = action.activeSideState;
        return;
      }
    }
  });
  //return state;
}

function game(
  state = {
    playState: false,
    currItem: { id: "", side1: "", side2: "", level: "" },
    ansText: "",
    itemComplete: false,
    gameComplete: false
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_PLAY_STATE: {
        draft.playState = action.playState;
        return;
      }

      case types.SET_CURRENT_ITEM: {
        draft.currItem = action.currItem;
        return;
      }

      case types.UPDATE_ANSWER_INPUT_TEXT: {
        draft.ansText = action.text;
        return;
      }

      case types.SET_ITEM_COMPLETE_STATE: {
        draft.itemComplete = action.itemComplete;
        return;
      }

      case types.SET_GAME_COMPLETE_STATE: {
        draft.gameComplete = action.gameComplete;
        return;
      }
    }
  });
  //return state;
}

// Combine Reducers
var reducers = combineReducers({
  user,
  layout,
  game
});

export default reducers;
