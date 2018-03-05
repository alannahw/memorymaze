import React, { Component } from "react";
import { connect } from "react-redux";
import { setListTitle } from "../actions";
import { ListTitle } from "../util/styledComponents.js";

class ListCt extends Component {
  render() {
    console.log(new Date().getTime());
    return (
      <div>
        <ListTitle>{this.props.listTitle}</ListTitle>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    listTitle: store.list.listTitle
  };
}

export default connect(mapStateToProps)(ListCt);
