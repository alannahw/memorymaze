import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTheme, updateList } from "../actions";
import { LightenDarkenColor } from "../util";
import { ALL_THEMES } from "../util/themes.js";

const ThemeBtnCt = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  font-size: 14px;
  box-sizing: border-box;
`;
const ThemeBtn = styled.div`
  transition: color 0.3s;
  color: ${props => LightenDarkenColor(props.theme.bg, 100)};
  cursor: pointer;
  text-align: left;
  display: inline-block;
  width: 40%;
  padding: 10px 0;
  box-sizing: border-box;
  &:hover {
    color: ${props => LightenDarkenColor(props.theme.bg, 160)};
  }
`;
const ColorMainDiv = styled.div`
  display: inline-block;
  width: 30%;
  height: 20px;
  background-color: ${props => props.bgColor};
`;
const ColorSubDiv = ColorMainDiv.extend`
  width: 10%;
  background-color: ${props => props.bgColor};
`;

class SidebarThemesCt extends Component {
  handleSetTheme = id => {
    this.props.dispatch(setTheme(id));
    this.props.dispatch(updateList(this.props.currentListId, "theme", id));
  };

  render() {
    return (
      <div style={{ paddingTop: "20px" }}>
        {ALL_THEMES.map(t => (
          <div key={t.id}>
            <ThemeBtnCt>
              <ThemeBtn onClick={() => this.handleSetTheme(t.id)}>
                {t.name}
              </ThemeBtn>
              <ColorMainDiv bgColor={t.main} />
              <ColorSubDiv bgColor={t.second} />
              <ColorSubDiv bgColor={t.third} />
              <ColorSubDiv bgColor={LightenDarkenColor(t.bg, 15)} />
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
