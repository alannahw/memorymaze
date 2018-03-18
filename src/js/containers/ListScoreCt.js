import React, { Component } from "react";
import { connect } from "react-redux";
import PlayBtn from "../components/PlayBtn";

class ListScoreCt extends Component {
  render() {
    return <PlayBtn />;
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(ListScoreCt);
