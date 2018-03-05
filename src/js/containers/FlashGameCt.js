import React, { Component } from "react";
import { connect } from "react-redux";
import { setListTitle } from "../actions";

class FlashGameCt extends Component {
  render() {
    return (
      <div>
        Game
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(FlashGameCt);
