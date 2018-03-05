import React, { Component } from "react";
import { connect } from "react-redux";
import { addFolder } from "../actions";
import { BtnSubtle, ListLink } from "../util/styledComponents.js";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import Folders from "../components/Folders";
import SearchBar from "../components/SearchBar";
import { ALL_THEMES } from "../util";

class SidebarProfileCt extends Component {
  click = () => {
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

    return (
      <div>
        <Collapsible classParentString="accordianMain" trigger="Profile">
          <p>Information relating to your profile can be find here.</p>
        </Collapsible>
        <Collapsible
          classParentString="accordianMain"
          trigger="Lists"
          open={true}
        >
          <div style={toolBar}>
            <div style={toolBtns}>
              <BtnSubtle onClick={this.click}>
                <span className="ion-plus-round" />
              </BtnSubtle>
              <BtnSubtle color="#888">
                <span className="ion-trash-a" />
              </BtnSubtle>
            </div>
          </div>
          <SearchBar />
          <Folders folders={this.props.folders} />
        </Collapsible>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    folders: store.user.folders
  };
}

export default connect(mapStateToProps)(SidebarProfileCt);
