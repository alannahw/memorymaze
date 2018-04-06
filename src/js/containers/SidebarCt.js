import React, { Component } from "react";
import { connect } from "react-redux";
import { setSidebarState } from "../actions";
import { CSSTransitionGroup } from "react-transition-group";
import {
  BtnSubtle,
  SideBarStyle,
  PanelContent
} from "../util/styledComponents.js";
import SidebarThemesCt from "./SidebarThemesCt";
import SidebarProfileCt from "./SidebarProfileCt";
import SidebarLookupCt from "./SidebarLookupCt";
import SidebarHelpCt from "./SidebarHelpCt";
import SidebarSettingsCt from "./SidebarSettingsCt";
import { translateTheme } from "../util/themes";
import styled from "styled-components";
import { LightenDarkenColor } from "../util";

const SidebarHeaderCt = styled.div`
  width: 100%;
  background: ${props => LightenDarkenColor(props.theme.bg, 20)};
  text-align: left;
  font-size: 16px;
  padding: 15px;
  box-sizing: border-box;
  color: ${props => LightenDarkenColor(props.theme.main, 15)};
`;

class SidebarCt extends Component {
  handleSidebarClose = () => {
    this.props.dispatch(setSidebarState(false));
  };
  // handleClickOutside = e => {
  //   if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
  //     this.handleSidebarClose();
  //   }
  // };
  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClickOutside);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClickOutside);
  // }

  render() {
    const SideBarHeader = props => {
      return (
        <SidebarHeaderCt>
          <BtnSubtle
            style={{ float: "right", padding: "0px" }}
            onClick={this.handleSidebarClose}
            color={LightenDarkenColor(this.props.theme.bg, 100)}
          >
            <span className="ion-close-round" />
          </BtnSubtle>
          {props.header}
        </SidebarHeaderCt>
      );
    };

    const ThemeSideBar = (
      <div key="sbThemes">
        <SideBarHeader header="Themes" />
        <SidebarThemesCt handleSidebarClose={this.handleSidebarClose} />
      </div>
    );

    const ProfileSideBar = (
      <div key="sbProfile">
        <SideBarHeader header="My Lists" />
        <SidebarProfileCt handleSidebarClose={this.handleSidebarClose} />
      </div>
    );

    const LookupSideBar = (
      <div key="sbLookup">
        <SideBarHeader header="Dictionary Lookup" />
        <SidebarLookupCt handleSidebarClose={this.handleSidebarClose} />
      </div>
    );
    const HelpSideBar = (
      <div key="sbHelp">
        <SideBarHeader header="How it Works" />
        <SidebarHelpCt handleSidebarClose={this.handleSidebarClose} />
      </div>
    );
    const SettingsSideBar = (
      <div key="sbSettings">
        <SideBarHeader header="Settings" />
        <SidebarSettingsCt handleSidebarClose={this.handleSidebarClose} />
      </div>
    );

    let sideBar = null;

    if (this.props.sideBarState === "themes") {
      sideBar = ThemeSideBar;
    } else if (this.props.sideBarState === "profile") {
      sideBar = ProfileSideBar;
    } else if (this.props.sideBarState === "lookup") {
      sideBar = LookupSideBar;
    } else if (this.props.sideBarState === "help") {
      sideBar = HelpSideBar;
    } else if (this.props.sideBarState === "settings") {
      sideBar = SettingsSideBar;
    }

    return (
      <SideBarStyle
        innerRef={el => {
          this.wrapperRef = el;
        }}
        className="tFromRight"
      >
        <PanelContent>{sideBar}</PanelContent>
      </SideBarStyle>
    );
  }
}

function mapStateToProps(store) {
  return {
    theme: translateTheme(store.user.theme),
    sideBarState: store.layout.sideBarState
  };
}

export default connect(mapStateToProps)(SidebarCt);
