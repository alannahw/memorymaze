import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTheme, updateList } from "../actions";
import { LightenDarkenColor } from "../util";
import { ALL_THEMES } from "../util/themes.js";

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

class SidebarThemesCt extends Component {
  handleSetTheme = id => {
    this.props.dispatch(setTheme(id));
    this.props.dispatch(updateList(this.props.currentListId, "theme", id));
  };

  render() {
    return (
      <div>
        <div style={rightAlign}>Themes</div>
        {ALL_THEMES.map(t => (
          <div key={t.id}>
            <ThemeBtnCt>
              <ColorMainDiv bgColor={t.main} />
              <ColorSubDiv bgColor={t.second} />
              <ColorSubDiv bgColor={t.third} />
              <ColorSubDiv bgColor={LightenDarkenColor(t.bg, 15)} />
              <ThemeBtn onClick={() => this.handleSetTheme(t.id)}>
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
    currentListId: store.user.currentListId
  };
}

export default connect(mapStateToProps)(SidebarThemesCt);
