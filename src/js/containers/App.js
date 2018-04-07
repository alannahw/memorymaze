import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { ThemeProvider } from "styled-components";
import "../../css/App.css";
import { connect } from "react-redux";
import { setUserData, setSidebarState } from "../actions";
import {
  BtnSubtle,
  SideBarStyle,
  BackPanelLeft,
  BackPanelRight,
  PanelContent,
  SideBarLarge
} from "../util/styledComponents.js";
import NavCt from "./NavCt";
import ListCt from "./ListCt";
import ListScoreCt from "./ListScoreCt";
import FlashGameCt from "./FlashGameCt";
import FlashCardsCt from "./FlashCardsCt";
import SidebarCt from "./SidebarCt";
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

class App extends Component {
  componentDidMount() {
    fetch("exampleUser.json")
      .then(response => response.json())
      .then(data => this.props.dispatch(setUserData(data.users[0])));
  }

  handleSidebarClose = () => {
    this.props.dispatch(setSidebarState(false));
  };

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
            <ListScoreCt />
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

    let sideBar = null;
    let bgPage = PageOne;

    if (this.props.sideBarState) {
      sideBar = (
        <div key="sbAll">
          <SidebarCt />
        </div>
      );
    }

    if (!this.props.playState) {
      bgPage = PageOne;
    } else {
      bgPage = PageTwo;
    }
    return (
      <div className="App">
        <ThemeProvider theme={this.props.theme}>
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
    theme: translateTheme(store.user.theme),
    sideBarState: store.layout.sideBarState,
    playState: store.game.playState
  };
}

export default connect(mapStateToProps)(App);
