import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlayState } from "../actions";
import { BtnMain } from "../util/styledComponents.js";

class PlayBtn extends Component {
  handlePlayState = () => {
    this.props.dispatch(setPlayState(!this.props.playState));
  };

  render() {
    return (
      <div>
        <BtnMain onClick={this.handlePlayState}>Play</BtnMain>
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
