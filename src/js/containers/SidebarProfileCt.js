import React, { Component } from "react";
import { connect } from "react-redux";
import { addFolder, setRemoveBtnState } from "../actions";
import { BtnSubtle } from "../util/styledComponents.js";
import Collapsible from "react-collapsible";
import Folders from "../components/Folders";
import SearchBar from "../components/SearchBar";

class SidebarProfileCt extends Component {
  handleRemoveBtnClass = () => {
    this.props.dispatch(setRemoveBtnState(!this.props.removeBtnState));
  };
  handleAddFolder = () => {
    this.props.dispatch(addFolder());
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
      <div>
        <Collapsible classParentString="accordianMain" trigger="Profile">
          <p>Information relating to your profile can be found here.</p>
        </Collapsible>
        <Collapsible
          classParentString="accordianMain"
          trigger="Lists"
          open={true}
        >
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
          <SearchBar />
          <Folders
            folders={this.props.folders}
            removeBtns={this.props.removeBtnState}
          />
        </Collapsible>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    folders: store.user.folders,
    removeBtnState: store.layout.removeBtnState
  };
}

export default connect(mapStateToProps)(SidebarProfileCt);
