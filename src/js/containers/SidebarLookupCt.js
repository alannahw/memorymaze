import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTheme, updateList } from "../actions";
import { LightenDarkenColor } from "../util";
import { ALL_THEMES } from "../util/themes.js";

const ThemeBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 45px 0 0;
`;
class SidebarLookupCt extends Component {
  handleSetTheme = id => {
    this.props.dispatch(setTheme(id));
    this.props.dispatch(updateList(this.props.currentListId, "theme", id));
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <div>Dictionary Lookup is not available on the demo version.</div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    currentListId: store.user.currentListId
  };
}

export default connect(mapStateToProps)(SidebarLookupCt);
