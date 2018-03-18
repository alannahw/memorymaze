import React, { Component } from "react";
import { LightenDarkenColor } from "../util";
import styled from "styled-components";

// SearchBarInput outside class component because otherwise input loses
// focus after every key press
const SearchBarInput = styled.input`
  position: relative;
  width: 150px;
  font-size: 0.9em;
  width: 150px;
  background-color: ${props =>
    props.color === "bg"
      ? LightenDarkenColor(props.theme.bg, 15)
      : LightenDarkenColor(props.theme.third, 30)};
  border: none;
  border-radius: 15px;
  padding: 5px 10px 5px 30px;
  margin-bottom: 10px;
  color: ${props =>
    props.color === "bg"
      ? LightenDarkenColor(props.theme.bg, 100)
      : LightenDarkenColor(props.theme.third, -50)};
  &::placeholder {
    color: ${props =>
      props.color === "bg"
        ? LightenDarkenColor(props.theme.bg, 60)
        : LightenDarkenColor(props.theme.third, -15)};
  }
`;
const SearchIcon = styled.div`
  &::before {
    position: absolute;
    top: 3px;
    left: 10px;
    font-size: 1.2em;
    color: ${props =>
      props.color === "bg"
        ? props.theme.bg
        : LightenDarkenColor(props.theme.third, -15)};
    font-family: "Ionicons";
    content: "\f2f5";
  }
`;
const SearchCt = styled.div`
  position: relative;
  width: 150px;
`;
class SearchBar extends Component {
  search = e => {
    this.props.handleSearch(e.target.value);
  };

  render() {
    return (
      <SearchCt>
        <SearchBarInput
          placeholder="Search..."
          onChange={this.search}
          value={this.props.queryVal}
          color={this.props.color}
        />
        <SearchIcon color={this.props.color} />
      </SearchCt>
    );
  }
}

export default SearchBar;
