import React, { Component } from "react";
import { connect } from "react-redux";
import PlayBtn from "../components/PlayBtn";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop } from "../util/dragDropComponents.js";
import { reorder, reorderMap } from "../util";

class ListScoreCt extends Component {
  render() {
    return <PlayBtn />;
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(ListScoreCt);
