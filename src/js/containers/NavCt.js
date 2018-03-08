import React, { Component } from "react";
import { connect } from "react-redux";
import { setSidebarState } from "../actions";
import { TopNav, BtnNav, BtnNavTheme, Logo } from "../util/styledComponents.js";

class NavCt extends Component {
  handleSideBarToggle = e => {
    const sideBar =
      this.props.sideBarState === e.target.name ? false : e.target.name;
    this.props.dispatch(setSidebarState(sideBar));
  };

  render() {
    const { sideBarState, userData } = this.props;
    const style = {
      padding: "10px",
      float: "right",
      color: "rgba(255,255,255,0.5)"
    };
    return (
      <TopNav>
        <Logo>Memory Maze</Logo>
        <div style={style}>
          <BtnNavTheme
            name="themes"
            active={sideBarState === "themes" ? true : false}
            onClick={this.handleSideBarToggle}
          >
            .
          </BtnNavTheme>
          |
          <BtnNav
            name="profile"
            active={sideBarState === "profile" ? true : false}
            onClick={this.handleSideBarToggle}
          >
            {userData.name}
          </BtnNav>
        </div>
      </TopNav>
    );
  }
}

function mapStateToProps(store) {
  return {
    userData: store.user.userData,
    sideBarState: store.layout.sideBarState
  };
}

export default connect(mapStateToProps)(NavCt);
