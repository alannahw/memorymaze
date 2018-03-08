import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTheme, setSidebarState, updateList } from "../actions";
import {} from "../util/styledComponents.js";
import { ALL_THEMES } from "../util";

class SidebarThemesCt extends Component {
  handleSetTheme = e => {
    this.props.dispatch(setTheme(e.target.id));
    this.props.dispatch(updateList(this.props.list, "theme", e.target.id));
  };

  handleSidebarClose = () => {
    this.props.dispatch(setSidebarState(false));
  };

  render() {
    const rightAlign = {
      textAlign: "right",
      padding: "15px 25px"
    };
    const ThemeBtnCt = styled.div`
      position: relative;
      width: 75%;
      margin: auto;
      text-align: right;
      height: 80px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    `;
    const ThemeBtn = styled.div`
      cursor: pointer;
      position: absolute;
      top: 0;
      width: 100%;
      padding: 45px 0 0;
    `;
    const ColorMainDiv = styled.div`
      display: inline-block;
      width: 40%;
      height: 40px;
      background-color: ${props => props.bgColor};
    `;
    const ColorSubDiv = ColorMainDiv.extend`
      width: 20%;
      background-color: ${props => props.bgColor};
    `;
    return (
      <div>
        <div style={rightAlign}>
          {/* <BtnSubtle onClick={this.handleSidebarClose}>
            <div className="ion-close-round" />
          </BtnSubtle> */}
          Themes
        </div>
        {ALL_THEMES.map(t => (
          <div key={t.id}>
            <ThemeBtnCt>
              <ColorMainDiv bgColor={t.main} />
              <ColorSubDiv bgColor={t.second} />
              <ColorSubDiv bgColor={t.third} />
              <ColorSubDiv bgColor={t.bg2} />
              <ThemeBtn id={t.id} onClick={this.handleSetTheme}>
                {t.name}
              </ThemeBtn>
            </ThemeBtnCt>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    list: store.user.list
  };
}

export default connect(mapStateToProps)(SidebarThemesCt);
