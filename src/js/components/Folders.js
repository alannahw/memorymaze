import React, { PureComponent, Component } from "react";
import Lists from "./Lists";
import Collapsibles from "../lib/Collapsibles";
import {
  setFolders,
  editFolderName,
  deleteFolder,
  deleteList,
  addList,
  setList,
  setTheme
} from "../actions";
import { AddBtn } from "../util/styledComponents.js";
import { connect } from "react-redux";
import { findListInFolder, reorder, reorderMap, filterLists } from "../util";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop } from "../lib/dragDropComponents.js";

class Folder extends Component {
  delEvent = () => {
    this.props.handleFolderDelete(this.props.folderId, this.props.folderName);
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
    const { folderName, folderId, lists, index } = this.props;

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
              handleSetList={this.props.handleSetList}
              handleListDelete={this.props.handleListDelete}
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
    const list = findListInFolder(this.props.folders, id);
    if (list) {
      this.props.dispatch(setList(id));
      this.props.dispatch(setTheme(list.theme));
    }
  };
  handleFolderDelete = (id, name) => {
    const msg =
      "Do you really want to delete the folder '" +
      name +
      "'? You will lose all the contents permanently.";

    if (window.confirm(msg)) {
      this.props.dispatch(deleteFolder(id));
    }
  };
  handleListDelete = (id, name) => {
    const msg =
      "Do you really want to delete the list '" +
      name +
      "'? You will lose all the contents permanently.";

    if (window.confirm(msg)) {
      this.props.dispatch(deleteList(id));
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
    const { filteredFolders } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <Drop dropId="dropFolders" type="OUTER">
            {filteredFolders.map((f, index) => {
              return (
                <Folder
                  index={index}
                  key={f.id}
                  folderId={f.id}
                  folderName={f.name}
                  lists={f.lists}
                  handleFolderNameChange={this.handleFolderNameChange}
                  handleFolderDelete={this.handleFolderDelete}
                  handleListDelete={this.handleListDelete}
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
    folders: store.user.userData.folders,
    folderQuery: store.user.folderQuery,
    filteredFolders: filterLists(
      store.user.folderQuery,
      store.user.userData.folders
    )
  };
}

export default connect(mapStateToProps)(Folders);
