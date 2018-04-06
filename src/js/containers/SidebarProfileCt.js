import React, { Component } from "react";
import { connect } from "react-redux";
import { addFolder, setRemoveBtnState, setFolderQuery } from "../actions";
import { BtnSubtle } from "../util/styledComponents.js";
import Collapsible from "react-collapsible";
import FoldersCt from "./FoldersCt";
import SearchBar from "../components/SearchBar";

class SidebarProfileCt extends Component {
  handleRemoveBtnClass = () => {
    this.props.dispatch(setRemoveBtnState(!this.props.removeBtnState));
  };
  handleAddFolder = () => {
    this.props.dispatch(addFolder());
    this.props.dispatch(setFolderQuery(""));
  };
  handleSearchFolders = val => {
    this.props.dispatch(setFolderQuery(val));
  };
  render() {
    const toolBar = {
      position: "relative"
    };

    const toolBtns = {
      position: "absolute",
      top: "0",
      right: "0"
    };
    const trashBtnColor = this.props.removeBtnState ? "#ccc" : "#888";

    return (
      <div style={{ padding: "20px" }}>
        <div style={toolBar}>
          <div style={toolBtns}>
            <BtnSubtle onClick={this.handleAddFolder}>
              <span className="ion-plus-round" />
            </BtnSubtle>
            <BtnSubtle
              color={trashBtnColor}
              onClick={this.handleRemoveBtnClass}
            >
              <span className="ion-trash-a" />
            </BtnSubtle>
          </div>
        </div>
        <SearchBar
          handleSearch={this.handleSearchFolders}
          queryVal={this.props.folderQuery}
          color="bg"
        />
        <FoldersCt removeBtns={this.props.removeBtnState} />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    folderQuery: store.user.folderQuery,
    removeBtnState: store.layout.removeBtnState
  };
}

export default connect(mapStateToProps)(SidebarProfileCt);
