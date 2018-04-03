import React, { Component } from "react";
import { LightenDarkenColor } from "../util";
import styled from "styled-components";
import { BtnSubtle } from "../util/styledComponents.js";
import SearchBar from "./SearchBar";

const ListToolbar = styled.div`
  position: absolute;
  text-align: right;
  bottom: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  color: ${props => LightenDarkenColor(props.theme.toolbar, 15)};
  background: ${props => props.theme.toolbar};
`;
const SearchBarCt = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
`;
const IconBtn = BtnSubtle.extend`
  padding: 0 5px;
  border-radius: 0px;
  font-size: 1.5em;
  margin: 1px 10px;
  color: ${props => LightenDarkenColor(props.theme.second, 15)};
  border-bottom: 3px solid ${props => LightenDarkenColor(props.theme.second, 5)};
`;

class ListPageToolbar extends Component {
  render() {
    return (
      <ListToolbar>
        <SearchBarCt>
          <SearchBar
            handleSearch={this.props.handleSearch}
            queryVal={this.props.queryVal}
          />
        </SearchBarCt>
        <IconBtn>
          <span className="ion-arrow-up-c" />
        </IconBtn>
        <IconBtn>
          <span className="ion-arrow-down-c" />
        </IconBtn>
      </ListToolbar>
    );
  }
}

export default ListPageToolbar;
