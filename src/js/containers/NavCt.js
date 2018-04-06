import React, { Component } from "react";
import { connect } from "react-redux";
import { setSidebarState } from "../actions";
import styled from "styled-components";
import { LightenDarkenColor } from "../util";
import { BtnSubtle } from "../util/styledComponents.js";

const TopNav = styled.div`
  text-align: left;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 50px;
  background: ${props => props.theme.bg};
  color: #fff;
  z-index: 3;
  font-size: 16px;
`;
const MenuCt = styled.div`
  float: right;
  margin: 10px;
  box-sizing: border-box;
  color: ${props => LightenDarkenColor(props.theme.bg, 40)};
`;
const Logo = styled.div`
  display: inline-block;
  color: ${props => props.theme.main};
  padding: 15px 20px;
`;
const BtnNav = BtnSubtle.extend`
  padding: 2px 15px;
  vertical-align: middle;
  color: ${props =>
    props.active
      ? LightenDarkenColor(props.theme.mainMiddle, 40)
      : props.theme.mainMiddle};
`;
const NavIconBook = BtnNav.extend`
  &::after {
    font-size: 21px;
    font-family: "Ionicons";
    content: "\f3e7";
  }
`;
const NavIconHelp = BtnNav.extend`
  &::after {
    font-size: 18px;
    font-family: "Ionicons";
    content: "\f143";
  }
`;
const NavIconSettings = BtnNav.extend`
  &::after {
    font-size: 18px;
    font-family: "Ionicons";
    content: "\f13d";
  }
`;
const BtnNavTheme = BtnNav.extend`
  color: transparent;
  padding: 0;
  margin: 3px 15px;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  transition: opacity 0.2s;
  ${"" /* opacity: ${props => (props.active ? 1 : 0.85)}; */}
  background: linear-gradient(
    90deg,
    ${props => props.theme.main},
    ${props => props.theme.second}
  );
`;

class NavCt extends Component {
  handleDictionaryOpen = () => {
    console.log("open sesame");
  };
  handleSideBarToggle = e => {
    const sideBar =
      this.props.sideBarState === e.target.name ? false : e.target.name;
    this.props.dispatch(setSidebarState(sideBar));
  };

  render() {
    const { sideBarState, userData, playState } = this.props;
    const menu = (
      <MenuCt>
        <NavIconSettings
          name="settings"
          active={sideBarState === "settings" ? true : false}
          onClick={this.handleSideBarToggle}
        />
        |
        <NavIconHelp
          name="help"
          active={sideBarState === "help" ? true : false}
          onClick={this.handleSideBarToggle}
        />
        |
        <NavIconBook
          name="lookup"
          active={sideBarState === "lookup" ? true : false}
          onClick={this.handleSideBarToggle}
        />
        |
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
      </MenuCt>
    );

    return (
      <TopNav>
        <Logo>Memory Maze</Logo>
        {!playState ? menu : <div />}
      </TopNav>
    );
  }
}

function mapStateToProps(store) {
  return {
    userData: store.user.userData,
    sideBarState: store.layout.sideBarState,
    playState: store.game.playState
  };
}

export default connect(mapStateToProps)(NavCt);
