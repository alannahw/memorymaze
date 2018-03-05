import React, { Component } from "react";
import { connect } from "react-redux";
import { setListTitle } from "../actions";
import PlayBtn from "../components/PlayBtn";

class FlashCardsCt extends Component {
  render() {
    return (
      <div>
        <PlayBtn />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(FlashCardsCt);
