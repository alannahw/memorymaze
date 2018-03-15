import React, { PureComponent, Component } from "react";
import Lists from "./Lists";
import Collapsibles from "./Collapsibles";
import {
  setFolders,
  editFolderName,
  deleteFolder,
  deleteList,
  addList,
  setList,
  setTheme
} from "../actions";
import { BtnSubtle, AddBtn } from "../util/styledComponents.js";
import { connect } from "react-redux";
import { findListInFolder, reorder, reorderMap } from "../util";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop } from "../util/dragDropComponents.js";

class Folder extends Component {
  delEvent = () => {
    this.props.handleRemoveBtnClick(this.props.folderId, this.props.folderName);
  };
  folderNameChangeEvent = e => {
    this.props.handleFolderNameChange(this.props.folderId, e.target.value);
  };
  addListEvent = () => {
    this.props.handleAddList(this.props.folderId);
  };
  render() {
    const removeBtnClass = this.props.removeBtns ? "removeBtnClass" : "";
    const folderClass = `${removeBtnClass} accordianSub`;
    const {
      folderName,
      folderId,
      handleFolderNameChange,
      handleRemoveBtnClick,
      lists,
      handleAddList,
      index
    } = this.props;
    const addBtnStyle = {
      fontFamily: "Ionicons",
      content: "\f2f5"
    };

    return (
      <Drag dragId={folderId} index={index}>
        <Drop dropId={folderId} type="INNER">
          <Collapsibles
            classParentString={folderClass}
            trigger={folderName}
            open={true}
            id={folderId}
            folderNameChangeEvent={this.folderNameChangeEvent}
            delEvent={this.delEvent}
          >
            <Lists
              lists={lists}
              handleRemoveBtnClick={handleRemoveBtnClick}
              handleSetList={this.props.handleSetList}
            />
            <AddBtn onClick={this.addListEvent} />
          </Collapsibles>
        </Drop>
      </Drag>
    );
  }
}

class Folders extends PureComponent {
  handleFolderNameChange = (id, value) => {
    this.props.dispatch(editFolderName(id, value));
  };
  handleAddList = folderId => {
    this.props.dispatch(addList(folderId));
  };
  handleSetList = id => {
    const folders = this.props.folders.slice(); //necessary?
    const list = findListInFolder(folders, id);
    if (list) {
      this.props.dispatch(setList(list));
      this.props.dispatch(setTheme(list.theme));
    }
  };
  handleRemoveBtnClick = (id, name) => {
    const type = id.includes("f_") ? "folder" : "list";
    const msg =
      "Do you really want to delete the " +
      type +
      " '" +
      name +
      "''? You will lose all the contents permanently.";

    if (window.confirm(msg)) {
      if (type === "folder") {
        this.props.dispatch(deleteFolder(id));
      } else {
        this.props.dispatch(deleteList(id));
      }
    }
  };
  onDragEnd = result => {
    // dropped outside the list
    const { source, destination } = result;
    if (!destination || !source) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (result.type === "OUTER") {
      const folders = reorder(
        this.props.folders,
        result.source.index,
        result.destination.index
      );
      this.props.dispatch(setFolders(folders));
      return;
    } else {
      const folders = reorderMap(this.props.folders, source, destination);
      this.props.dispatch(setFolders(folders));
    }
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <Drop dropId="dropFolders" type="OUTER">
            {this.props.folders.map((f, index) => {
              return (
                <Folder
                  index={index}
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
          </Drop>
        </div>
      </DragDropContext>
    );
  }
}

function mapStateToProps(store) {
  return {
    folders: store.user.folders
  };
}

export default connect(mapStateToProps)(Folders);
