import React, { Component } from "react";
import { connect } from "react-redux";
import { setGameLevels } from "../actions";
import { BtnSubtle } from "../util/styledComponents.js";
import styled from "styled-components";
import Collapsible from "react-collapsible";
import { LightenDarkenColor } from "../util";

const PillBtn = BtnSubtle.extend`
  padding: 5px 11px;
  border-style: solid;
  border-color: ${props =>
    props.active ? props.theme.mainMiddle : "transparent"};
  border-width: 1px;
`;
const Category = styled.span`
  padding: 0px 10px;
  color: ${props => LightenDarkenColor(props.theme.bg, 100)};
`;

class SidebarSettingsCt extends Component {
  handleSetGameLevels = num => {
    this.props.dispatch(setGameLevels(num));
  };

  render() {
    let btns = [];
    for (let i = 3; i <= 5; i++) {
      btns.push(
        <PillBtn
          active={this.props.gameLevels === i}
          onClick={() => this.handleSetGameLevels(i)}
        >
          {i}
        </PillBtn>
      );
    }
    return (
      <div style={{ padding: "20px" }}>
        <Category>Game Levels:</Category> {btns}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    gameLevels: store.user.gameLevels
  };
}

export default connect(mapStateToProps)(SidebarSettingsCt);
