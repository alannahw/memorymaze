import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled, { ThemeProvider } from "styled-components";
import "../../css/App.css";
import { connect } from "react-redux";
import { setListTitle, setUserData, setFolders } from "../actions";
import {
  BackPanel,
  SideBarStyle,
  BackPanelLeft,
  BackPanelRight,
  BtnMain,
  BtnTheme,
  BtnInverted,
  PanelContent
} from "../util/styledComponents.js";
import NavCt from "./NavCt";
import ListCt from "./ListCt";
import ScoreCt from "./ScoreCt";
import FlashGameCt from "./FlashGameCt";
import FlashCardsCt from "./FlashCardsCt";
import SidebarThemesCt from "./SidebarThemesCt";
import SidebarProfileCt from "./SidebarProfileCt";
import { translateTheme } from "../util";

class App extends Component {
  componentDidMount() {
    fetch("/exampleUser.json")
      .then(response => response.json())
      .then(data => this.props.dispatch(setUserData(data.users[0])));
  }

  render() {
    const PageOne = (
      <div key="bgPageOne">
        <BackPanelLeft className="tFromTop">
          <PanelContent>
            <ListCt />
          </PanelContent>
        </BackPanelLeft>
        <BackPanelRight className="tFromBottom">
          <PanelContent>
            <ScoreCt />
          </PanelContent>
        </BackPanelRight>
      </div>
    );
    const PageTwo = (
      <div key="bgPageTwo">
        <BackPanelLeft className="tFromBottom">
          <PanelContent>
            <FlashCardsCt />
          </PanelContent>
        </BackPanelLeft>
        <BackPanelRight className="tFromTop">
          <PanelContent>
            <FlashGameCt />
          </PanelContent>
        </BackPanelRight>
      </div>
    );

    const ThemeSideBar = (
      <div key="sbThemes">
        <SideBarStyle className="tFromRight">
          <PanelContent>
            <SidebarThemesCt />
          </PanelContent>
        </SideBarStyle>
      </div>
    );
    const ProfileSideBar = (
      <div key="sbProfile">
        <SideBarStyle className="tFromRight">
          <PanelContent>
            <SidebarProfileCt />
          </PanelContent>
        </SideBarStyle>
      </div>
    );

    let sideBar = null;
    let bgPage = PageOne;

    if (this.props.sideBarState === "themes") {
      sideBar = ThemeSideBar;
    } else if (this.props.sideBarState === "profile") {
      sideBar = ProfileSideBar;
    }

    if (!this.props.playState) {
      bgPage = PageOne;
    } else {
      bgPage = PageTwo;
    }

    return (
      <div className="App">
        <ThemeProvider theme={translateTheme(this.props.theme)}>
          <div>
            <NavCt />

            <div>
              <CSSTransitionGroup
                transitionName="slideInFromRight"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {sideBar}
              </CSSTransitionGroup>
            </div>
            <div>
              <CSSTransitionGroup
                transitionName="slideUpDown"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {bgPage}
              </CSSTransitionGroup>
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userData: store.user.userData,
    theme: store.list.theme,
    sideBarState: store.layout.sideBarState,
    playState: store.game.playState
  };
}

export default connect(mapStateToProps)(App);
