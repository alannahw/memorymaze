import React, { Component } from "react";
import { connect } from "react-redux";
import { setSidebarState } from "../actions";
import { TopNav, BtnInverted } from "../util/styledComponents.js";

class NavCt extends Component {
  handleSideBarToggle = e => {
    const sideBar =
      this.props.sideBarState === e.target.name ? false : e.target.name;
    this.props.dispatch(setSidebarState(sideBar));
  };

  render() {
    return (
      <TopNav>
        <BtnInverted name="themes" onClick={this.handleSideBarToggle}>
          Theme
        </BtnInverted>
        <BtnInverted name="profile" onClick={this.handleSideBarToggle}>
          Profile
        </BtnInverted>
      </TopNav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sideBarState: store.layout.sideBarState
  };
}

export default connect(mapStateToProps)(NavCt);
