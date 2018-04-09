import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTheme, updateList } from "../actions";
import { LightenDarkenColor } from "../util";
import { ALL_THEMES } from "../util/themes.js";

const ThemeBtn = styled.div``;

class SidebarLookupCt extends Component {
  handleSetTheme = id => {
    this.props.dispatch(setTheme(id));
    this.props.dispatch(updateList(this.props.currentListId, "theme", id));
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: "14px", opacity: "0.6" }}>
          Dictionary Lookup is not available on the demo version.
        </div>
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
