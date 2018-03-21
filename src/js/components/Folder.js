import React, { PureComponent } from "react";
import Lists from "./Lists";
import Collapsibles from "../lib/Collapsibles";
import { AddBtn } from "../util/styledComponents.js";
import { Drag, Drop } from "../lib/dragDropComponents.js";

class Folder extends PureComponent {
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
export default Folder;
