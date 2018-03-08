import React, { Component } from "react";
import Lists from "./Lists";
import Collapsibles from "./Collapsibles";
import {
  editFolderName,
  deleteFolder,
  deleteList,
  addList,
  setList,
  setTheme
} from "../actions";
import { BtnSubtle } from "../util/styledComponents.js";
import { connect } from "react-redux";
import { findListInFolder } from "../util";
//import Collapsible from "react-collapsible";

class Folder extends Component {
  render() {
    const removeBtnClass = this.props.removeBtns ? "removeBtnClass" : "";
    const folderClass = `${removeBtnClass} accordianSub`;
    const {
      folderName,
      folderId,
      handleFolderNameChange,
      handleRemoveBtnClick,
      lists,
      handleAddList
    } = this.props;
    const addBtnId = `addBtn_${folderId}`;
    const AddBtn = BtnSubtle.extend`
      &::after {
        height: 1em;
        width: 1em;
        font-family: "Ionicons";
        content: "\f217";
      }
    `;
    return (
      <div>
        <Collapsibles
          classParentString={folderClass}
          trigger={folderName}
          open={true}
          id={folderId}
          handleInputChange={handleFolderNameChange}
          handleRemoveBtnClick={handleRemoveBtnClick}
        >
          <Lists
            lists={lists}
            handleRemoveBtnClick={handleRemoveBtnClick}
            handleSetList={this.props.handleSetList}
          />
          <AddBtn id={addBtnId} onClick={handleAddList} />
        </Collapsibles>
      </div>
    );
  }
}

class Folders extends Component {
  handleFolderNameChange = e => {
    this.props.dispatch(editFolderName(e.target.id, e.target.value));
  };
  handleAddList = e => {
    this.props.dispatch(addList(e.target.id.split("addBtn_")[1]));
  };
  handleSetList = e => {
    const folders = this.props.folders.slice(); //necessary?
    const list = findListInFolder(folders, e.target.id);
    if (list) {
      this.props.dispatch(setList(list));
      this.props.dispatch(setTheme(list.theme));
    }
  };
  handleRemoveBtnClick = e => {
    const name = e.target.name;
    const type = e.target.id.includes("f_") ? "folder" : "list";
    const msg =
      "Do you really want to delete the " +
      type +
      " '" +
      name +
      "''? You will lose all the contents permanently.";

    if (window.confirm(msg)) {
      if (type === "folder") {
        this.props.dispatch(deleteFolder(e.target.id.split("removeBtn_")[1]));
      } else {
        this.props.dispatch(deleteList(e.target.id.split("removeBtn_")[1]));
      }
    }
  };
  render() {
    return (
      <div>
        {this.props.folders.map(f => {
          return (
            <Folder
              key={f.id}
              folderId={f.id}
              folderName={f.name}
              lists={f.lists}
              handleFolderNameChange={this.handleFolderNameChange}
              handleRemoveBtnClick={this.handleRemoveBtnClick}
              removeBtns={this.props.removeBtns}
              handleAddList={this.handleAddList}
              handleSetList={this.handleSetList}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    folders: store.user.folders
  };
}

export default connect(mapStateToProps)(Folders);
