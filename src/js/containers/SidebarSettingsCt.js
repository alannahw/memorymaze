import React, { Component } from "react";
import { connect } from "react-redux";
import { setGameLevels } from "../actions";
import { BtnSubtle } from "../util/styledComponents.js";
import Collapsible from "react-collapsible";

class SidebarSettingsCt extends Component {
  handleSetGameLevels = e => {
    this.props.dispatch(setGameLevels(e.target.value));
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        Game Levels:{" "}
        <select
          onChange={this.handleSetGameLevels}
          defaultValue={this.props.gameLevels}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
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
