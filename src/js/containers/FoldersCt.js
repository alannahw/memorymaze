import React, { PureComponent } from "react";
import Folder from "../components/Folder";
import {
  setFolders,
  editFolderName,
  deleteFolder,
  deleteList,
  addList,
  setList,
  setTheme,
  setGraphTimeframe
} from "../actions";
import { connect } from "react-redux";
import {
  findListInFolders,
  reorder,
  reorderMap,
  filterLists,
  getScoreStats
} from "../util";
import { DragDropContext } from "react-beautiful-dnd";
import { Drop } from "../lib/dragDropComponents.js";

class FoldersCt extends PureComponent {
  handleSetGraphXAxis = list => {
    const stats = getScoreStats(list);
    const end = Math.ceil(stats.totalDays / 30.0) * 30;
    const start = Math.floor(stats.totalDays / 30.0) * 30;
    this.props.dispatch(setGraphTimeframe(start, end));
  };
  handleFolderNameChange = (id, value) => {
    this.props.dispatch(editFolderName(id, value));
  };
  handleAddList = folderId => {
    this.props.dispatch(addList(folderId));
  };
  handleSetList = id => {
    const list = findListInFolders(this.props.folders, id);
    if (list) {
      this.props.dispatch(setList(id));
      this.props.dispatch(setTheme(list.theme));
      if (list.scores) {
        this.handleSetGraphXAxis(list);
      }
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
    const { filteredFolders, currentListId } = this.props;
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
                  currentListId={currentListId}
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
    currentListId: store.user.currentListId,
    folders: store.user.userData.folders,
    folderQuery: store.user.folderQuery,
    filteredFolders: filterLists(
      store.user.folderQuery,
      store.user.userData.folders
    )
  };
}

export default connect(mapStateToProps)(FoldersCt);
