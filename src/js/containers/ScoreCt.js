import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../actions";
import PlayBtn from "../components/PlayBtn";

class ScoreCt extends Component {
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

export default connect(mapStateToProps)(ScoreCt);
