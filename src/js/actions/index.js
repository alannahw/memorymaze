import * as types from "./actionTypes";

export function setUserData(userData) {
  return {
    type: types.SET_USER_DATA,
    userData
  };
}

export function setSidebarState(sideBarState) {
  return {
    type: types.SET_SIDEBAR_STATE,
    sideBarState
  };
}

export function setPlayState(playState) {
  return {
    type: types.SET_PLAY_STATE,
    playState
  };
}

export function searchFolders(searchValue) {
  return { type: types.SEARCH_FOLDERS, searchValue };
}
export function addFolder() {
  return { type: types.ADD_FOLDER };
}
export function editFolderName(folderId, folderName) {
  return { type: types.EDIT_FOLDER_NAME, folderId, folderName };
}
export function setListTitle(listTitle) {
  return {
    type: types.SET_LIST_TITLE,
    listTitle
  };
}
export function setTheme(theme) {
  return {
    type: types.SET_THEME,
    theme
  };
}
