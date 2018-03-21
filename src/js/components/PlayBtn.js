import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlayState } from "../actions";
import { BtnMain } from "../util/styledComponents.js";
import styled from "styled-components";

const PlayBtnStyle = BtnMain.extend`
  padding: 10px 50px;
  font-size: 21px;
  background-color: ${props => props.theme.mainMiddle};
  border-color: ${props => props.theme.mainMiddle};
`;
class PlayBtn extends Component {
  handlePlayState = () => {
    this.props.dispatch(setPlayState(!this.props.playState));
  };

  render() {
    return (
      <div>
        <PlayBtnStyle onClick={this.handlePlayState}>Play</PlayBtnStyle>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    playState: store.game.playState
  };
}

export default connect(mapStateToProps)(PlayBtn);
