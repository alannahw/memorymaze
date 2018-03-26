import * as types from "./actionTypes";

// User
export function setUserData(userData) {
  return { type: types.SET_USER_DATA, userData };
}
export function setFolders(folders) {
  return { type: types.SET_FOLDERS, folders };
}
export function setFolderQuery(searchVal) {
  return { type: types.SET_FOLDER_QUERY, searchVal };
}
export function addFolder() {
  return { type: types.ADD_FOLDER };
}
export function editFolderName(folderId, folderName) {
  return { type: types.EDIT_FOLDER_NAME, folderId, folderName };
}
export function deleteFolder(folderId) {
  return { type: types.DELETE_FOLDER, folderId };
}
export function addList(folderId, property, value) {
  return { type: types.ADD_LIST, folderId, property, value };
}
export function deleteList(listId) {
  return { type: types.DELETE_LIST, listId };
}

// Layout
export function setSidebarState(sideBarState) {
  return {
    type: types.SET_SIDEBAR_STATE,
    sideBarState
  };
}
export function setRemoveBtnState(removeBtnState) {
  return {
    type: types.SET_REMOVEBTN_STATE,
    removeBtnState
  };
}

// List
export function setList(listId) {
  return { type: types.SET_LIST, listId };
}
export function updateList(listId, property, value) {
  return { type: types.UPDATE_LIST, listId, property, value };
}
export function setTheme(theme) {
  return { type: types.SET_THEME, theme };
}
export function addItem() {
  return { type: types.ADD_ITEM };
}
export function setListItemQuery(searchVal) {
  return { type: types.SET_LIST_ITEM_QUERY, searchVal };
}
export function setGraphTimeframe(start, end) {
  return { type: types.SET_GRAPH_TIMEFRAME, start, end };
}

// Game
export function setPlayState(playState) {
  return {
    type: types.SET_PLAY_STATE,
    playState
  };
}
