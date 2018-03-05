import React, { Component } from "react";
import { connect } from "react-redux";
import { setTheme, setSidebarState } from "../actions";
import { BtnTheme, BtnSubtle } from "../util/styledComponents.js";
import { ALL_THEMES } from "../util";

class SidebarThemesCt extends Component {
  handleSetTheme = e => {
    this.props.dispatch(setTheme(e.target.id));
  };

  handleSidebarClose = () => {
    this.props.dispatch(setSidebarState(false));
  };

  render() {
    const rightAlign = {
      textAlign: "right"
    };
    return (
      <div>
        <div style={rightAlign}>
          <BtnSubtle onClick={this.handleSidebarClose}>
            <div className="ion-close-round" />
          </BtnSubtle>
        </div>
        Themes <br />
        {ALL_THEMES.map(t => (
          <div key={t.id}>
            <BtnTheme id={t.id} color={t.main} onClick={this.handleSetTheme}>
              {t.name}
            </BtnTheme>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    listTitle: store.list.setTheme
  };
}

export default connect(mapStateToProps)(SidebarThemesCt);
